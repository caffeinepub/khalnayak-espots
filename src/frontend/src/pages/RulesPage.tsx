import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  DollarSign,
  Shield,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { useState } from "react";

const COMMISSION_PCT = 30;
const PRIZE_POOL_PCT = 70;

const BATTLE_GROUND_PRIZES = [
  { label: "🥇 1st Place", pct: 45, color: "text-yellow-400" },
  { label: "🥈 2nd Place", pct: 35, color: "text-slate-300" },
  { label: "🥉 3rd Place", pct: 15, color: "text-amber-600" },
  { label: "⭐ Best Performer (6+ kills)", pct: 5, color: "text-cyan-400" },
];

export function RulesPage() {
  const [entryFee, setEntryFee] = useState<string>("");

  const totalCollection =
    Number.parseFloat(entryFee) > 0 ? Number.parseFloat(entryFee) * 48 : 0;
  const prizePool = (totalCollection * PRIZE_POOL_PCT) / 100;
  const commission = (totalCollection * COMMISSION_PCT) / 100;

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display mb-2">
          Rules & Regulations
        </h1>
        <p className="text-muted-foreground">
          Complete guide to participating in tournaments
        </p>
      </div>

      {/* Tournament Types */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Tournament Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Battle Ground Mode</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>48 Players divided into 12 teams</li>
              <li>4 players per team (1 substitute optional)</li>
              <li>Classic Battle Royale format</li>
              <li>Scoring based on kills and placement</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">4vs4 Custom Mode</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Team vs team matches</li>
              <li>4 players per team</li>
              <li>Custom room settings</li>
              <li>Scoring based on kills and match outcome</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Scoring System */}
      <Card className="border-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Scoring System
          </CardTitle>
          <CardDescription>
            How points are calculated in tournaments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Kill Points</h3>
            <p className="text-muted-foreground mb-2">
              Each elimination ={" "}
              <span className="text-primary font-bold">1 point</span>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Placement Points (Battle Ground Mode)
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">1st Place</TableCell>
                  <TableCell>
                    <Badge className="bg-primary">12 pts</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">6th Place</TableCell>
                  <TableCell>
                    <Badge variant="secondary">5 pts</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">2nd Place</TableCell>
                  <TableCell>
                    <Badge className="bg-primary">9 pts</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">7th Place</TableCell>
                  <TableCell>
                    <Badge variant="secondary">4 pts</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">3rd Place</TableCell>
                  <TableCell>
                    <Badge className="bg-secondary">8 pts</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">8th Place</TableCell>
                  <TableCell>
                    <Badge variant="secondary">3 pts</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">4th Place</TableCell>
                  <TableCell>
                    <Badge variant="secondary">7 pts</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">9th Place</TableCell>
                  <TableCell>
                    <Badge variant="secondary">2 pts</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">5th Place</TableCell>
                  <TableCell>
                    <Badge variant="secondary">6 pts</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">10th Place</TableCell>
                  <TableCell>
                    <Badge variant="secondary">1 pt</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-2">
              * Ranks 11-48 receive 0 placement points
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Total Score Calculation</h3>
            <p className="text-muted-foreground">
              <code className="bg-muted px-2 py-1 rounded">
                Total Points = Kill Points + Placement Points
              </code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Prize Distribution */}
      <Card className="border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Prize Distribution — Battle Ground Mode (48 Players)
          </CardTitle>
          <CardDescription>
            How winnings are calculated and distributed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Commission / Pool summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Platform Commission
              </p>
              <p className="text-2xl font-bold font-display text-destructive">
                30%
              </p>
              <p className="text-xs text-muted-foreground">
                of total collection
              </p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Prize Pool</p>
              <p className="text-2xl font-bold font-display text-primary">
                70%
              </p>
              <p className="text-xs text-muted-foreground">
                distributed to winners
              </p>
            </div>
          </div>

          {/* Auto-calculator */}
          <div className="p-4 border border-cyan-500/30 bg-cyan-500/5 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-cyan-400" />
              <p className="font-semibold text-sm text-cyan-400">
                Prize Calculator
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Label
                htmlFor="entry-fee-calc"
                className="text-sm whitespace-nowrap text-muted-foreground"
              >
                Entry Fee (₹):
              </Label>
              <Input
                id="entry-fee-calc"
                data-ocid="rules.entry_fee.input"
                type="number"
                min={1}
                placeholder="e.g. 10"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                className="max-w-[120px] h-8 text-sm"
              />
              {totalCollection > 0 && (
                <span className="text-xs text-muted-foreground">
                  Total: ₹{totalCollection.toFixed(2)}
                </span>
              )}
            </div>
            {totalCollection > 0 && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted rounded">
                  <span className="text-muted-foreground">
                    Commission (30%):
                  </span>
                  <span className="ml-1 font-bold text-destructive">
                    ₹{commission.toFixed(2)}
                  </span>
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="text-muted-foreground">
                    Prize Pool (70%):
                  </span>
                  <span className="ml-1 font-bold text-primary">
                    ₹{prizePool.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Prize breakdown table */}
          <div className="space-y-2">
            <h3 className="font-semibold">Prize Breakdown (of Prize Pool):</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-center">% of Prize Pool</TableHead>
                  <TableHead className="text-right">
                    {totalCollection > 0 ? "Amount (₹)" : "Amount"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BATTLE_GROUND_PRIZES.map((prize) => (
                  <TableRow key={prize.label}>
                    <TableCell className={`font-semibold ${prize.color}`}>
                      {prize.label}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{prize.pct}%</Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${prize.color}`}
                    >
                      {totalCollection > 0
                        ? `₹${((prizePool * prize.pct) / 100).toFixed(2)}`
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-primary/30">
                  <TableCell className="font-bold text-primary">
                    Total
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-primary">100%</Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {totalCollection > 0 ? `₹${prizePool.toFixed(2)}` : "—"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Best Performer note */}
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm space-y-1">
            <p className="font-semibold text-cyan-400 flex items-center gap-1">
              <Star className="h-4 w-4" /> Best Performer Award
            </p>
            <p className="text-muted-foreground">
              • Sirf ek player ko milega — jo sabse zyada kills kare (minimum 6
              kills required).
            </p>
            <p className="text-muted-foreground">
              • Agar do players ke kills tie ho to jo pehle woh kill achieve
              kare use award milega.
            </p>
            <p className="text-muted-foreground">
              • 5 kills ya kam hone par koi Best Performer award nahi diya
              jayega.
            </p>
          </div>

          <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
            <p>✓ All prizes are credited directly to your wallet</p>
            <p>✓ You can withdraw your winnings anytime</p>
          </div>
        </CardContent>
      </Card>

      {/* Code of Conduct */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Anti-Cheat Policy & Code of Conduct
          </CardTitle>
          <CardDescription>
            Zero tolerance for cheating and unfair practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Hackers will be banned permanently with NO REFUND
            </h3>
            <p className="text-sm text-muted-foreground">
              We take fair play extremely seriously. Any use of hacks, mods, or
              cheating tools will result in immediate and permanent account
              suspension.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Prohibited Activities</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <span className="font-semibold text-destructive">
                  Aimbot / Headshot Hack
                </span>{" "}
                - Automated or assisted aiming
              </li>
              <li>
                <span className="font-semibold text-destructive">
                  Wallhack / ESP
                </span>{" "}
                - Seeing players through walls or obstacles
              </li>
              <li>
                <span className="font-semibold text-destructive">
                  Speed Hack
                </span>{" "}
                - Moving faster than normal game speed
              </li>
              <li>
                <span className="font-semibold text-destructive">Mod Menu</span>{" "}
                - Any third-party modification tools
              </li>
              <li>
                <span className="font-semibold text-destructive">
                  Auto-clickers, macros, or scripts
                </span>{" "}
                - Automated actions
              </li>
              <li>
                <span className="font-semibold text-destructive">
                  Account sharing during tournaments
                </span>{" "}
                - Only registered players can play
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              How to Report Suspicious Players
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>
                After the tournament, click the "Report Player" button on the
                leaderboard
              </li>
              <li>Provide the suspect's name and Free Fire ID</li>
              <li>Select the type of violation you observed</li>
              <li>Add a detailed description (optional but helpful)</li>
              <li>Submit the report - our admin team will investigate</li>
            </ol>
            <p className="text-xs text-muted-foreground mt-2 italic">
              All reports are reviewed confidentially. Your identity remains
              anonymous.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Consequences for Cheating</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                First offense:{" "}
                <span className="text-destructive font-semibold">
                  Permanent ban
                </span>
              </li>
              <li>All winnings and prizes forfeited</li>
              <li>
                Entry fees are{" "}
                <span className="font-semibold">non-refundable</span>
              </li>
              <li>Team disqualification from current and future tournaments</li>
              <li>Name and ID added to public ban list</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">General Rules</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>All players must have valid Free Fire accounts and IDs</li>
              <li>Register with accurate information only</li>
              <li>
                Room ID and password will be shared 15-30 minutes before the
                match
              </li>
              <li>Join the room on time; late entries may not be allowed</li>
              <li>Screenshot proof required for kill claims</li>
              <li>Respect other players and maintain good sportsmanship</li>
              <li>Admin decisions are final</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Penalties</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Abusive behavior: Warning or temporary ban</li>
              <li>Match fixing: Permanent ban and prize forfeiture</li>
              <li>False information: Registration rejection</li>
              <li>Repeated violations: Account termination</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Registration & Payment */}
      <Card>
        <CardHeader>
          <CardTitle>Registration & Payment Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Add money to your wallet before registering for tournaments</li>
            <li>
              Entry fee will be deducted automatically upon successful
              registration
            </li>
            <li>Registrations are subject to admin approval</li>
            <li>
              Entry fees are non-refundable once approved (except in case of
              tournament cancellation)
            </li>
            <li>If rejected, entry fee will be refunded to your wallet</li>
            <li>
              Withdraw funds from wallet anytime (subject to admin approval)
            </li>
            <li>Minimum withdrawal amount may apply</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
