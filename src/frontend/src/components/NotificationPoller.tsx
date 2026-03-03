import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetCallerNotifications,
  useMarkNotificationAsRead,
} from "@/hooks/useQueries";
import { useEffect } from "react";
import { toast } from "sonner";

export function NotificationPoller() {
  const { identity } = useInternetIdentity();
  const { data: notifications } = useGetCallerNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();

  useEffect(() => {
    if (!identity || !notifications) return;

    // Show toast for unread notifications
    const unreadNotifications = notifications.filter((n) => !n.read);

    for (const notification of unreadNotifications) {
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

      // Mark as read — errors are silently swallowed in the mutation itself
      markAsReadMutation.mutate(notification.id);
    }
  }, [notifications, identity, markAsReadMutation]);

  return null;
}
