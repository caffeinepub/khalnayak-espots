/**
 * useVpnDetection — detects VPN/proxy usage
 *
 * Strategy:
 * 1. Calls ipapi.co/json/ to check proxy/hosting fields
 * 2. Re-checks every 60 seconds when isMatchActive=true
 * 3. Caches result for 5 minutes to avoid excessive API calls
 * 4. Fails OPEN (no block) on network error / timeout to avoid false positives
 */

import { useCallback, useEffect, useRef, useState } from "react";

const CACHE_KEY = "kn_vpn_cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const CHECK_INTERVAL_MS = 60 * 1000; // 60 seconds
const FETCH_TIMEOUT_MS = 5000; // 5 seconds

interface VpnCacheEntry {
  isVpn: boolean;
  timestamp: number;
}

function loadCache(): VpnCacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as VpnCacheEntry;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
    return entry;
  } catch {
    return null;
  }
}

function saveCache(isVpn: boolean) {
  try {
    const entry: VpnCacheEntry = { isVpn, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // ignore
  }
}

async function checkVpnWithTimeout(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return false; // fail open

    const data = await response.json();
    // ipapi.co returns proxy=true and/or org containing "AS" with datacenter names
    const isProxy = data.proxy === true;
    const isHosting = data.hosting === true;

    return isProxy || isHosting;
  } catch {
    clearTimeout(timeoutId);
    return false; // fail open — don't block legitimate users
  }
}

export interface UseVpnDetectionOptions {
  isMatchActive?: boolean;
}

export interface UseVpnDetectionResult {
  isVpnDetected: boolean;
  isChecking: boolean;
  recheck: () => void;
}

export function useVpnDetection(
  options: UseVpnDetectionOptions = {},
): UseVpnDetectionResult {
  const { isMatchActive = false } = options;

  const [isVpnDetected, setIsVpnDetected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasMountedRef = useRef(false);

  const performCheck = useCallback(async (force = false) => {
    // Check cache first (unless forced)
    if (!force) {
      const cached = loadCache();
      if (cached !== null) {
        setIsVpnDetected(cached.isVpn);
        return;
      }
    }

    setIsChecking(true);
    try {
      const result = await checkVpnWithTimeout();
      saveCache(result);
      setIsVpnDetected(result);
    } finally {
      setIsChecking(false);
    }
  }, []);

  // Initial check on mount
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      performCheck();
    }
  }, [performCheck]);

  // Periodic re-check when match is active
  useEffect(() => {
    if (isMatchActive) {
      intervalRef.current = setInterval(() => {
        performCheck(true); // force re-check during match
      }, CHECK_INTERVAL_MS);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isMatchActive, performCheck]);

  const recheck = useCallback(() => {
    performCheck(true);
  }, [performCheck]);

  return { isVpnDetected, isChecking, recheck };
}
