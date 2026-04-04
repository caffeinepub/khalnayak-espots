import { useUnifiedAuth } from "@/context/UnifiedAuthContext";
import { getFirebaseDb } from "@/lib/firebase";
import {
  type KLNotification,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/firestore";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export function useNotifications() {
  const { userId } = useUnifiedAuth();
  const [notifications, setNotifications] = useState<KLNotification[]>([]);

  // Main listener for user notifications
  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      return;
    }
    const db = getFirebaseDb();
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setNotifications(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as KLNotification),
        );
      },
      () => {},
    );
    return () => unsub();
  }, [userId]);

  // Poll tournament broadcast notifications (for free tournament users)
  useEffect(() => {
    if (!userId) return;

    const checkBroadcasts = async () => {
      try {
        const db = getFirebaseDb();
        const lastCheck = Number(
          localStorage.getItem("kl_notif_last_check") || "0",
        );
        const freeMatches = JSON.parse(
          localStorage.getItem("ke_free_my_matches") || "[]",
        ) as Array<{ tournamentId: string }>;
        if (freeMatches.length === 0) return;
        const tIds = freeMatches.map((m) => m.tournamentId);
        const {
          getDocs,
          query: fsQuery,
          where: fsWhere,
          collection: fsCollection,
          addDoc,
        } = await import("firebase/firestore");
        for (const tId of tIds) {
          const q = fsQuery(
            fsCollection(db, "tournamentNotifications"),
            fsWhere("tournamentId", "==", tId),
            fsWhere("createdAt", ">", lastCheck),
          );
          const snap = await getDocs(q);
          for (const d of snap.docs) {
            const data = d.data();
            await addDoc(fsCollection(db, "notifications"), {
              userId,
              tournamentId: data.tournamentId,
              tournamentName: data.tournamentName,
              type: data.type,
              title: data.title,
              message: data.message,
              read: false,
              createdAt: data.createdAt,
            });
          }
        }
        localStorage.setItem("kl_notif_last_check", String(Date.now()));
      } catch {
        /* ignore */
      }
    };

    void checkBroadcasts();
    const interval = setInterval(() => void checkBroadcasts(), 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = useCallback((id: string) => {
    markNotificationRead(id);
  }, []);

  const markAllRead = useCallback(() => {
    if (userId) markAllNotificationsRead(userId);
  }, [userId]);

  return { notifications, unreadCount, markRead, markAllRead };
}
