import { useEffect } from "react";
import { useGetCallerNotifications, useMarkNotificationAsRead } from "@/hooks/useQueries";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { toast } from "sonner";

export function NotificationPoller() {
  const { identity } = useInternetIdentity();
  const { data: notifications } = useGetCallerNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();

  useEffect(() => {
    if (!identity || !notifications) return;

    // Show toast for unread notifications
    const unreadNotifications = notifications.filter((n) => !n.read);
    
    if (unreadNotifications.length > 0) {
      unreadNotifications.forEach((notification) => {
        // Show toast based on notification type
        switch (notification.notificationType) {
          case "registrationConfirmed":
            toast.success("Registration Confirmed", {
              description: notification.message,
            });
            break;
          case "tournamentStarting":
            toast.info("Tournament Starting Soon", {
              description: notification.message,
            });
            break;
          case "scoresUpdated":
            toast.info("Scores Updated", {
              description: notification.message,
            });
            break;
          case "prizeCredited":
            toast.success("Prize Credited!", {
              description: notification.message,
            });
            break;
          default:
            toast(notification.message);
        }

        // Mark as read
        markAsReadMutation.mutate(notification.id);
      });
    }
  }, [notifications, identity, markAsReadMutation]);

  return null;
}
