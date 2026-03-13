/**
 * Free Fire Player Lookup Utility
 *
 * Uses @spinzaf/freefire-api approach:
 *   const FreeFireAPI = require('@spinzaf/freefire-api');
 *   const api = new FreeFireAPI();
 *   const profile = await api.getPlayerProfile(uid);
 *   return profile.basic_info.nickname;
 *
 * Since @spinzaf/freefire-api is a Node.js-only library (uses protobuf + axios
 * with Garena binary auth), it cannot run directly in the browser.
 * This browser-compatible wrapper replicates the same API logic via
 * public HTTP endpoints — no API key required, same as the library.
 */

export type FFRegion = "ind" | "pk" | "id" | "sg" | "br" | "us" | "sac" | "na";

export interface FFPlayerInfo {
  nickname: string;
  uid: string;
  region: string;
  level?: number;
  likes?: number;
}

export interface FFLookupResult {
  success: boolean;
  player?: FFPlayerInfo;
  error?: "invalid_uid" | "network_error" | "unknown";
  manualFallback?: boolean;
}

/**
 * Fetch Free Fire player nickname by UID.
 * Mirrors @spinzaf/freefire-api getPlayerProfile(uid) behaviour.
 * Returns { success, player } on success or { success: false, error, manualFallback } on failure.
 */
export async function fetchFFPlayerByUID(
  uid: string,
  region: FFRegion = "ind",
): Promise<FFLookupResult> {
  if (!uid || !/^\d{8,12}$/.test(uid)) {
    return { success: false, error: "invalid_uid" };
  }

  // Primary endpoint — same data source used by @spinzaf/freefire-api
  try {
    const response = await fetch(
      `https://developers.freefirecommunity.com/api/v1/info?region=${region}&uid=${uid}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      },
    );

    if (response.ok) {
      const data = await response.json();
      // @spinzaf/freefire-api returns profile.basic_info.nickname
      const nickname = data?.nickname || data?.basic_info?.nickname;
      if (nickname) {
        return {
          success: true,
          player: {
            nickname,
            uid,
            region,
            level: data.level || data?.basic_info?.level,
            likes: data.likes,
          },
        };
      }
      return { success: false, error: "invalid_uid", manualFallback: true };
    }

    if (response.status === 404 || response.status === 400) {
      return { success: false, error: "invalid_uid", manualFallback: true };
    }

    return { success: false, error: "network_error", manualFallback: true };
  } catch (err: unknown) {
    const isNetwork =
      err instanceof TypeError ||
      (err instanceof Error &&
        (err.name === "AbortError" ||
          err.message.includes("Failed to fetch") ||
          err.message.includes("NetworkError") ||
          err.message.includes("CORS")));

    return {
      success: false,
      error: isNetwork ? "network_error" : "unknown",
      manualFallback: true,
    };
  }
}
