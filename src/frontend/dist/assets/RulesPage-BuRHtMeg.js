import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Card, M as CardHeader, O as CardTitle, a5 as Trophy, T as CardContent, Q as CardDescription, S as Shield, a2 as TriangleAlert } from "./index-Chbj-AOn.js";
import { B as Badge } from "./badge-jp_-NXEv.js";
import { L as Label, I as Input } from "./label-BhsYovMS.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-k6G3R_GJ.js";
import { D as DollarSign } from "./dollar-sign-B5UgpyUp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const COMMISSION_PCT = 30;
const PRIZE_POOL_PCT = 70;
const BATTLE_GROUND_PRIZES = [
  { label: "🥇 1st Place", pct: 45, color: "text-yellow-400" },
  { label: "🥈 2nd Place", pct: 35, color: "text-slate-300" },
  { label: "🥉 3rd Place", pct: 15, color: "text-amber-600" },
  { label: "⭐ Best Performer (6+ kills)", pct: 5, color: "text-cyan-400" }
];
function RulesPage() {
  const [entryFee, setEntryFee] = reactExports.useState("");
  const totalCollection = Number.parseFloat(entryFee) > 0 ? Number.parseFloat(entryFee) * 48 : 0;
  const prizePool = totalCollection * PRIZE_POOL_PCT / 100;
  const commission = totalCollection * COMMISSION_PCT / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold font-display mb-2", children: "Rules & Regulations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Complete guide to participating in tournaments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }),
        "Tournament Types"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: "Battle Ground Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "48 Players divided into 12 teams" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "4 players per team (1 substitute optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Classic Battle Royale format" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Scoring based on kills and placement" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: "4vs4 Custom Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Team vs team matches" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "4 players per team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Custom room settings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Scoring based on kills and match outcome" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5" }),
          "Scoring System"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "How points are calculated in tournaments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: "Kill Points" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-2", children: [
            "Each elimination =",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: "1 point" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: "Placement Points (Battle Ground Mode)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Rank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Points" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Rank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Points" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "1st Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary", children: "12 pts" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "6th Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "5 pts" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "2nd Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary", children: "9 pts" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "7th Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "4 pts" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "3rd Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary", children: "8 pts" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "8th Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "3 pts" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "4th Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "7 pts" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "9th Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "2 pts" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "5th Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "6 pts" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: "10th Place" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "1 pt" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "* Ranks 11-48 receive 0 placement points" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Total Score Calculation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "Total Points = Kill Points + Placement Points" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-accent/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }),
          "Prize Distribution — Battle Ground Mode (48 Players)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "How winnings are calculated and distributed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Platform Commission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-destructive", children: "30%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "of total collection" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-primary/10 border border-primary/20 rounded-lg text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Prize Pool" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-primary", children: "70%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "distributed to winners" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-cyan-500/30 bg-cyan-500/5 rounded-lg space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-cyan-400", children: "Prize Calculator" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "entry-fee-calc",
                className: "text-sm whitespace-nowrap text-muted-foreground",
                children: "Entry Fee (₹):"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "entry-fee-calc",
                "data-ocid": "rules.entry_fee.input",
                type: "number",
                min: 1,
                placeholder: "e.g. 10",
                value: entryFee,
                onChange: (e) => setEntryFee(e.target.value),
                className: "max-w-[120px] h-8 text-sm"
              }
            ),
            totalCollection > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Total: ₹",
              totalCollection.toFixed(2)
            ] })
          ] }),
          totalCollection > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 bg-muted rounded", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Commission (30%):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-bold text-destructive", children: [
                "₹",
                commission.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 bg-muted rounded", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Prize Pool (70%):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-bold text-primary", children: [
                "₹",
                prizePool.toFixed(2)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Prize Breakdown (of Prize Pool):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Position" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "% of Prize Pool" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: totalCollection > 0 ? "Amount (₹)" : "Amount" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
              BATTLE_GROUND_PRIZES.map((prize) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: `font-semibold ${prize.color}`, children: prize.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                  prize.pct,
                  "%"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TableCell,
                  {
                    className: `text-right font-bold ${prize.color}`,
                    children: totalCollection > 0 ? `₹${(prizePool * prize.pct / 100).toFixed(2)}` : "—"
                  }
                )
              ] }, prize.label)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-t-2 border-primary/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold text-primary", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary", children: "100%" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-bold text-primary", children: totalCollection > 0 ? `₹${prizePool.toFixed(2)}` : "—" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-cyan-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }),
            " Best Performer Award"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "• Sirf ek player ko milega — jo sabse zyada kills kare (minimum 6 kills required)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "• Agar do players ke kills tie ho to jo pehle woh kill achieve kare use award milega." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "• 5 kills ya kam hone par koi Best Performer award nahi diya jayega." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted rounded-lg text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "✓ All prizes are credited directly to your wallet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "✓ You can withdraw your winnings anytime" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5" }),
          "Anti-Cheat Policy & Code of Conduct"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Zero tolerance for cheating and unfair practices" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-destructive/10 border border-destructive/30 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-lg mb-2 flex items-center gap-2 text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
            "Hackers will be banned permanently with NO REFUND"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We take fair play extremely seriously. Any use of hacks, mods, or cheating tools will result in immediate and permanent account suspension." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Prohibited Activities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Aimbot / Headshot Hack" }),
              " ",
              "- Automated or assisted aiming"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Wallhack / ESP" }),
              " ",
              "- Seeing players through walls or obstacles"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Speed Hack" }),
              " ",
              "- Moving faster than normal game speed"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Mod Menu" }),
              " ",
              "- Any third-party modification tools"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Auto-clickers, macros, or scripts" }),
              " ",
              "- Automated actions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Account sharing during tournaments" }),
              " ",
              "- Only registered players can play"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "How to Report Suspicious Players" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'After the tournament, click the "Report Player" button on the leaderboard' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide the suspect's name and Free Fire ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Select the type of violation you observed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Add a detailed description (optional but helpful)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Submit the report - our admin team will investigate" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 italic", children: "All reports are reviewed confidentially. Your identity remains anonymous." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Consequences for Cheating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "First offense:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: "Permanent ban" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All winnings and prizes forfeited" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Entry fees are",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "non-refundable" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Team disqualification from current and future tournaments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Name and ID added to public ban list" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "General Rules" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All players must have valid Free Fire accounts and IDs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Register with accurate information only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Room ID and password will be shared 15-30 minutes before the match" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Join the room on time; late entries may not be allowed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Screenshot proof required for kill claims" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Respect other players and maintain good sportsmanship" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Admin decisions are final" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Penalties" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Abusive behavior: Warning or temporary ban" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Match fixing: Permanent ban and prize forfeiture" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "False information: Registration rejection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Repeated violations: Account termination" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Registration & Payment Rules" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Add money to your wallet before registering for tournaments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Entry fee will be deducted automatically upon successful registration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Registrations are subject to admin approval" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Entry fees are non-refundable once approved (except in case of tournament cancellation)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "If rejected, entry fee will be refunded to your wallet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Withdraw funds from wallet anytime (subject to admin approval)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Minimum withdrawal amount may apply" })
      ] }) })
    ] })
  ] });
}
export {
  RulesPage
};
