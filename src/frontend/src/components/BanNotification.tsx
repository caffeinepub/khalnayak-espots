import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOtpAuth } from "@/hooks/useOtpAuth";
import { useGetCallerUserProfile } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, Mail, ShieldX } from "lucide-react";

export function BanNotification() {
  const { identity } = useOtpAuth();
  const { data: profile } = useGetCallerUserProfile();

  // Only show ban notification if user is logged in and their profile shows they're banned
  if (!identity || !profile || !profile.banned) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-destructive/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <ShieldX
                className="h-24 w-24 text-destructive"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 h-24 w-24 text-destructive animate-ping opacity-20">
                <ShieldX className="h-24 w-24" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-display text-destructive">
            Account Suspended
          </CardTitle>
          <CardDescription className="text-base">
            Your account has been restricted from accessing Khalnayak Espots
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-destructive">
                  Your account has been banned
                </p>
                <p className="text-sm text-muted-foreground">
                  If you believe this is a mistake, please contact our support
                  team.
                </p>
              </div>
            </div>
          </div>

          {/* Fair Play Policy */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <p className="font-semibold text-sm flex items-center gap-2">
              <ShieldX className="h-4 w-4" />
              Fair Play Policy
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>
                • Use of any hacks, mods, or cheating tools is strictly
                prohibited
              </li>
              <li>
                • All tournament participants must follow fair play guidelines
              </li>
              <li>
                • Violations result in immediate disqualification and account
                suspension
              </li>
              <li>
                • Repeated offenses lead to permanent bans with no refunds
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full" variant="outline">
              <Link to="/support">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
