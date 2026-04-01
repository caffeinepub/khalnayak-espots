import { w as createLucideIcon, j as jsxRuntimeExports, C as Card, o as CardHeader, p as CardTitle, T as Trophy, l as CardContent, K as CardDescription, M as Shield, N as TriangleAlert } from "./index-Bq9COV-K.js";
import { B as Badge } from "./badge-CPKanA6G.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DhpirWHT.js";
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
function RulesPage() {
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
