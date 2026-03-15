import { j as jsxRuntimeExports, ae as useInternetIdentity, af as useLocalAuth, ag as Link, a8 as ue, ah as Bell, ai as User, w as useGetTournaments, aj as decodeTournament, K as formatCurrency } from "./index-VIWjWtVa.js";
import { Z as Zap } from "./zap-D_hb_VH8.js";
import { U as Users } from "./users-Bfy8Xq8w.js";
function TopBar() {
  const { identity } = useInternetIdentity();
  const { isLoggedIn } = useLocalAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "sticky top-0 z-50 flex items-center justify-between px-4",
      style: {
        height: 60,
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,136,0.15)"
      },
      "data-ocid": "home.topbar.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2",
            "data-ocid": "home.topbar.logo.link",
            style: { textDecoration: "none" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(14px, 4vw, 18px)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        background: "linear-gradient(90deg, #00FF88, #00cc66)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "none",
                        filter: "drop-shadow(0 0 10px rgba(0,255,136,0.7))"
                      },
                      children: "⚔️ KHALNAYAK"
                    }
                  ),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        background: "linear-gradient(90deg, #9d4edd, #c77dff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 10px rgba(157,78,221,0.7))"
                      },
                      children: "ESPOTS"
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Notifications",
              onClick: () => ue.info("No new notifications"),
              "data-ocid": "home.topbar.notifications.button",
              style: {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: 8,
                color: "#888",
                cursor: "pointer",
                transition: "all 0.2s",
                lineHeight: 0
              },
              onMouseEnter: (e) => {
                const el = e.currentTarget;
                el.style.color = "#00FF88";
                el.style.borderColor = "rgba(0,255,136,0.5)";
                el.style.boxShadow = "0 0 12px rgba(0,255,136,0.3)";
              },
              onMouseLeave: (e) => {
                const el = e.currentTarget;
                el.style.color = "#888";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.boxShadow = "none";
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { strokeWidth: 1.5, style: { width: 20, height: 20 } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: identity || isLoggedIn ? "/profile" : "/login",
              "aria-label": "Profile",
              "data-ocid": "home.topbar.profile.link",
              style: {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: 8,
                color: "#888",
                cursor: "pointer",
                transition: "all 0.2s",
                lineHeight: 0,
                display: "inline-flex"
              },
              onMouseEnter: (e) => {
                const el = e.currentTarget;
                el.style.color = "#00FF88";
                el.style.borderColor = "rgba(0,255,136,0.5)";
                el.style.boxShadow = "0 0 12px rgba(0,255,136,0.3)";
              },
              onMouseLeave: (e) => {
                const el = e.currentTarget;
                el.style.color = "#888";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.boxShadow = "none";
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { strokeWidth: 1.5, style: { width: 20, height: 20 } })
            }
          )
        ] })
      ]
    }
  );
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative px-4 py-12 flex flex-col items-center text-center overflow-hidden",
      style: {
        background: "linear-gradient(180deg, rgba(0,255,136,0.04) 0%, rgba(10,10,10,0) 60%)",
        minHeight: 260
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              top: -40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 280,
              height: 180,
              background: "radial-gradient(ellipse, rgba(0,255,136,0.12) 0%, transparent 70%)",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              bottom: 0,
              right: -30,
              width: 160,
              height: 160,
              background: "radial-gradient(ellipse, rgba(157,78,221,0.1) 0%, transparent 70%)",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "h1",
          {
            style: {
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 7vw, 2.8rem)",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "#FFFFFF",
              textShadow: "0 0 30px rgba(0,255,136,0.4), 0 2px 8px rgba(0,0,0,0.8)",
              marginBottom: 12,
              position: "relative",
              zIndex: 1
            },
            "data-ocid": "home.hero.heading",
            children: [
              "🔥 DOMINATE THE",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    background: "linear-gradient(90deg, #00FF88 0%, #00cc66 50%, #9d4edd 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(0,255,136,0.6))"
                  },
                  children: "BATTLEGROUND"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(13px, 3.5vw, 16px)",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 28,
              position: "relative",
              zIndex: 1
            },
            "data-ocid": "home.hero.subtext",
            children: "India's Premier Free Fire Platform"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-center gap-3 w-full",
            style: { maxWidth: 400, position: "relative", zIndex: 1 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/register",
                  "data-ocid": "home.hero.get_started.primary_button",
                  style: { flex: 1 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      style: {
                        width: "100%",
                        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(11px, 2.8vw, 13px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        background: "linear-gradient(135deg, #00FF88 0%, #00cc66 100%)",
                        color: "#0A0A0A",
                        boxShadow: "0 0 20px rgba(0,255,136,0.5), 0 4px 16px rgba(0,0,0,0.4)",
                        transition: "all 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        whiteSpace: "nowrap"
                      },
                      onMouseEnter: (e) => {
                        const el = e.currentTarget;
                        el.style.boxShadow = "0 0 32px rgba(0,255,136,0.8), 0 4px 20px rgba(0,0,0,0.5)";
                        el.style.transform = "translateY(-2px)";
                      },
                      onMouseLeave: (e) => {
                        const el = e.currentTarget;
                        el.style.boxShadow = "0 0 20px rgba(0,255,136,0.5), 0 4px 16px rgba(0,0,0,0.4)";
                        el.style.transform = "translateY(0)";
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { style: { width: 14, height: 14 } }),
                        "GET STARTED"
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/rules",
                  "data-ocid": "home.hero.learn.secondary_button",
                  style: { flex: 1 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      style: {
                        width: "100%",
                        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(11px, 2.8vw, 13px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "12px 16px",
                        borderRadius: 12,
                        cursor: "pointer",
                        background: "transparent",
                        color: "#00FF88",
                        border: "2px solid rgba(0,255,136,0.5)",
                        boxShadow: "0 0 12px rgba(0,255,136,0.15), inset 0 0 12px rgba(0,255,136,0.05)",
                        transition: "all 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        whiteSpace: "nowrap"
                      },
                      onMouseEnter: (e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(0,255,136,0.1)";
                        el.style.borderColor = "#00FF88";
                        el.style.boxShadow = "0 0 24px rgba(0,255,136,0.4), inset 0 0 20px rgba(0,255,136,0.08)";
                        el.style.transform = "translateY(-2px)";
                      },
                      onMouseLeave: (e) => {
                        const el = e.currentTarget;
                        el.style.background = "transparent";
                        el.style.borderColor = "rgba(0,255,136,0.5)";
                        el.style.boxShadow = "0 0 12px rgba(0,255,136,0.15), inset 0 0 12px rgba(0,255,136,0.05)";
                        el.style.transform = "translateY(0)";
                      },
                      children: "📖 LEARN HOW"
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const STATIC_UPCOMING = [
  {
    name: "Friday Night Showdown",
    schedule: "Today • 8:00 PM",
    entry: "₹50 Entry",
    teams: "8/16 Teams",
    to: "/tournaments"
  },
  {
    name: "Solo Battle",
    schedule: "Tomorrow • 10:00 AM",
    entry: "₹20 Entry",
    teams: "4/16 Players",
    to: "/tournaments"
  }
];
function UpcomingTournamentsSection() {
  const { data: tournaments } = useGetTournaments();
  const upcoming = tournaments == null ? void 0 : tournaments.filter((t) => t.status === "upcoming").map((t) => ({ ...t, ...decodeTournament(t) })).slice(0, 2);
  const hasReal = upcoming && upcoming.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 pb-6", "data-ocid": "home.upcoming.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          style: {
            fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(13px, 3.5vw, 16px)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#FFFFFF"
          },
          "data-ocid": "home.upcoming.heading",
          children: "📅 UPCOMING TOURNAMENTS"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/tournaments",
          "data-ocid": "home.upcoming.view_all.link",
          style: {
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#00FF88",
            textDecoration: "none",
            letterSpacing: "0.06em",
            textTransform: "uppercase"
          },
          children: "View All →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: hasReal ? upcoming.map((t, idx) => {
      const idxNum = idx + 1;
      const entryFee = formatCurrency(t.entryFee);
      const maxTeams = Number(t.maxTeams);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        TournamentCard,
        {
          name: t.name,
          schedule: `${entryFee} Entry`,
          entry: entryFee,
          teams: `0/${maxTeams} Teams`,
          to: `/tournament/${t.id.toString()}`,
          idx: idxNum
        },
        t.id.toString()
      );
    }) : STATIC_UPCOMING.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TournamentCard,
      {
        name: item.name,
        schedule: item.schedule,
        entry: item.entry,
        teams: item.teams,
        to: item.to,
        idx: idx + 1
      },
      item.name
    )) })
  ] });
}
function TournamentCard({
  name,
  schedule,
  entry,
  teams,
  to,
  idx
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-[12px] p-4 transition-all duration-200",
      style: {
        background: "rgba(22,33,62,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(0,255,136,0.2)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      },
      "data-ocid": `home.upcoming.item.${idx}`,
      onMouseEnter: (e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "0 4px 28px rgba(0,255,136,0.2), 0 0 0 1px rgba(0,255,136,0.35)";
        el.style.borderColor = "rgba(0,255,136,0.4)";
        el.style.transform = "translateY(-1px)";
      },
      onMouseLeave: (e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
        el.style.borderColor = "rgba(0,255,136,0.2)";
        el.style.transform = "translateY(0)";
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(13px, 3.5vw, 15px)",
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                marginBottom: 6,
                lineHeight: 1.3
              },
              children: name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              style: {
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.04em",
                marginBottom: 8
              },
              children: [
                schedule,
                " • ",
                entry
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { style: { width: 12, height: 12, color: "#9d4edd" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 12,
                  color: "#9d4edd",
                  fontWeight: 700
                },
                children: teams
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to,
            "data-ocid": `home.upcoming.register.${idx}.primary_button`,
            style: { flexShrink: 0, alignSelf: "center" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                style: {
                  fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "9px 14px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #00FF88 0%, #00cc66 100%)",
                  color: "#0A0A0A",
                  boxShadow: "0 0 16px rgba(0,255,136,0.45)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  whiteSpace: "nowrap"
                },
                onMouseEnter: (e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 0 28px rgba(0,255,136,0.8)";
                  el.style.transform = "scale(1.05)";
                },
                onMouseLeave: (e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 0 16px rgba(0,255,136,0.45)";
                  el.style.transform = "scale(1)";
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { style: { width: 12, height: 12 } }),
                  "REGISTER"
                ]
              }
            )
          }
        )
      ] })
    }
  );
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen overflow-x-hidden",
      style: { background: "#0A0A0A", paddingBottom: 80 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingTournamentsSection, {})
      ]
    }
  );
}
export {
  HomePage
};
