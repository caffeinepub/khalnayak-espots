import { j as jsxRuntimeExports, ag as useUnifiedAuth, ah as useIIProfile, ai as useNavigate, aj as Link, aa as ue, ak as Bell, al as User, x as useGetTournaments, am as decodeTournament, H as formatCurrency } from "./index-RJg2kaVa.js";
import { Z as Zap } from "./zap-B8L0bI6h.js";
import { U as Users } from "./users-ClqynK8d.js";
function KLLogo({ size = "md" }) {
  const fontSize = size === "sm" ? "clamp(11px,3vw,13px)" : size === "lg" ? "clamp(20px,6vw,28px)" : "clamp(14px,4vw,17px)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      style: {
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
        fontWeight: 900,
        fontSize,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 4
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
              filter: "drop-shadow(0 0 8px rgba(0,255,136,0.8))"
            },
            children: "KL"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              background: "linear-gradient(90deg, #9d4edd, #c77dff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 8px rgba(157,78,221,0.7))"
            },
            children: "Esports Life"
          }
        )
      ]
    }
  );
}
function TopBar() {
  const { userId } = useUnifiedAuth();
  const { profile } = useIIProfile();
  const navigate = useNavigate();
  const isLoggedIn = !!userId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "sticky top-0 z-50 flex items-center justify-between px-4",
      style: {
        height: 60,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #E0E0E0"
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
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(KLLogo, { size: "md" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Notifications",
              onClick: () => ue.info("No new notifications"),
              "data-ocid": "home.topbar.notifications.button",
              style: {
                background: "rgba(0,0,0,0.04)",
                border: "1px solid #E0E0E0",
                borderRadius: 10,
                padding: 8,
                color: "#666666",
                cursor: "pointer",
                transition: "all 0.2s",
                lineHeight: 0
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { strokeWidth: 1.5, style: { width: 20, height: 20 } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/profile",
              "aria-label": "Profile",
              "data-ocid": "home.topbar.profile.link",
              style: {
                background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.35)",
                borderRadius: 10,
                padding: 8,
                color: "#00FF88",
                cursor: "pointer",
                transition: "all 0.2s",
                lineHeight: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 6
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { strokeWidth: 1.5, style: { width: 18, height: 18 } }),
                (profile == null ? void 0 : profile.display_name) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      maxWidth: 80,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    children: profile.display_name
                  }
                )
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void navigate({ to: "/login" }),
            "data-ocid": "home.topbar.login.button",
            style: {
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(10px, 2.5vw, 12px)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "8px 14px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #00FF88 0%, #9d4edd 100%)",
              color: "#FFFFFF",
              boxShadow: "0 0 16px rgba(0,255,136,0.4)",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap"
            },
            children: "🔐 Login"
          }
        ) })
      ]
    }
  );
}
function HeroSection() {
  const { userId } = useUnifiedAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!userId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative px-4 py-10 flex flex-col items-center text-center overflow-hidden",
      style: {
        background: "linear-gradient(180deg, rgba(0,255,136,0.06) 0%, rgba(255,255,255,0) 60%)",
        minHeight: 280
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
              background: "radial-gradient(ellipse, rgba(0,255,136,0.10) 0%, transparent 70%)",
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
              color: "#333333",
              textShadow: "0 0 20px rgba(0,255,136,0.2)",
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
                    filter: "drop-shadow(0 0 20px rgba(0,255,136,0.4))"
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
              color: "#666666",
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
            className: "flex flex-col items-center gap-3 w-full",
            style: { maxWidth: 360, position: "relative", zIndex: 1 },
            children: [
              !isLoggedIn ? (
                /* Login button — navigates to login page */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void navigate({ to: "/login" }),
                    "data-ocid": "home.hero.get_started.primary_button",
                    style: {
                      width: "100%",
                      fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(12px, 3vw, 15px)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "15px 24px",
                      borderRadius: 14,
                      border: "none",
                      cursor: "pointer",
                      background: "linear-gradient(135deg, #00FF88 0%, #00cc66 60%, #9d4edd 100%)",
                      color: "#FFFFFF",
                      boxShadow: "0 0 24px rgba(0,255,136,0.4), 0 4px 16px rgba(0,0,0,0.12)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.1em" }, children: "🚀" }),
                      "LOGIN / SIGN IN"
                    ]
                  }
                )
              ) : (
                /* Logged-in CTAs */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tournaments", style: { flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                        background: "linear-gradient(135deg, #00FF88 0%, #9d4edd 100%)",
                        color: "#FFFFFF",
                        boxShadow: "0 0 16px rgba(0,255,136,0.35), 0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { style: { width: 14, height: 14 } }),
                        "PLAY NOW"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rules", style: { flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                        transition: "all 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6
                      },
                      children: "📖 RULES"
                    }
                  ) })
                ] })
              ),
              !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 12,
                    color: "#999999",
                    letterSpacing: "0.04em",
                    textAlign: "center"
                  },
                  children: "🔒 Face ID / Fingerprint / Google — No password needed"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
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
            color: "#333333"
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
    }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          textAlign: "center",
          padding: "24px",
          color: "#666666",
          fontFamily: "'Rajdhani', sans-serif"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 32, marginBottom: 8 }, children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 16 }, children: "No upcoming tournaments yet" })
        ]
      }
    ) })
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
        background: "#F5F5F5",
        border: "1px solid #E0E0E0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      },
      "data-ocid": `home.upcoming.item.${idx}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(13px, 3.5vw, 15px)",
                color: "#333333",
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
                color: "#666666",
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
                  background: "linear-gradient(135deg, #00FF88 0%, #9d4edd 100%)",
                  color: "#FFFFFF",
                  boxShadow: "0 0 12px rgba(0,255,136,0.3)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  whiteSpace: "nowrap"
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
      style: { background: "#FFFFFF", paddingBottom: 80 },
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
