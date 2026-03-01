import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldX, AlertTriangle, Mail } from "lucide-react";
import { getUserBan, type Ban } from "@/data/mockAntiCheat";
import { formatDateTime } from "@/utils/format";
import { Link } from "@tanstack/react-router";

export function BanNotification() {
  const [ban, setBan] = useState<Ban | null>(null);

  useEffect(() => {
    // Only show ban notification for actually banned users
    // Since backend is not yet live, we don't show any mock bans
    setBan(null);
  }, []);

  if (!ban) return null;

  const isPermaBan = ban.duration === "permanent";
  const expiryText = ban.expiryDate
    ? new Date(ban.expiryDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-destructive/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <ShieldX className="h-24 w-24 text-destructive" strokeWidth={1.5} />
              <div className="absolute inset-0 h-24 w-24 text-destructive animate-ping opacity-20">
                <ShieldX className="h-24 w-24" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-display text-destructive">Account Suspended</CardTitle>
          <CardDescription className="text-base">
            Your account has been temporarily restricted from accessing Khalnayak Espots
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Ban Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-destructive">Reason for Ban:</p>
                <p className="text-sm">{ban.reason}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Ban Duration</p>
                <Badge variant="destructive" className="font-semibold">
                  {isPermaBan ? "PERMANENT" : ban.duration === "7days" ? "7 Days" : "1 Day"}
                </Badge>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Ban Date</p>
                <p className="text-sm font-semibold">{formatDateTime(BigInt(ban.banDate))}</p>
              </div>

              {expiryText && !isPermaBan && (
                <div className="p-3 bg-muted rounded-lg sm:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Ban Expires On</p>
                  <p className="text-sm font-semibold text-success">{expiryText}</p>
                </div>
              )}
            </div>
          </div>

          {/* Fair Play Policy */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <p className="font-semibold text-sm flex items-center gap-2">
              <ShieldX className="h-4 w-4" />
              Fair Play Policy
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use of any hacks, mods, or cheating tools is strictly prohibited</li>
              <li>• All tournament participants must follow fair play guidelines</li>
              <li>• Violations result in immediate disqualification and account suspension</li>
              <li>• Repeated offenses lead to permanent bans with no refunds</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isPermaBan ? (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-center">
                <p className="text-sm text-destructive font-semibold">This is a permanent ban.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  If you believe this is a mistake, please contact support immediately.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-success/10 border border-success/30 rounded-lg text-center">
                <p className="text-sm text-success font-semibold">This ban is temporary.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You will regain access after the ban period expires.
                </p>
              </div>
            )}

            <Button asChild className="w-full" variant="outline">
              <Link to="/support">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Banned by: {ban.bannedBy} • All prizes and wallet funds remain accessible after ban expiry
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
