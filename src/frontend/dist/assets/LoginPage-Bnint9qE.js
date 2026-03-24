import { aZ as useFirebaseAuth, j as jsxRuntimeExports, S as Shield, U as Button, aa as LoaderCircle } from "./index-aR9rc9el.js";
function KLLoginLogo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(0,255,136,0.08)",
              border: "2px solid rgba(0,255,136,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(0,255,136,0.25), inset 0 0 20px rgba(0,255,136,0.05)",
              animation: "kl-logo-pulse 3s ease-in-out infinite"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  fontSize: 28,
                  color: "#00FF88",
                  textShadow: "0 0 15px rgba(0,255,136,1), 0 0 30px rgba(0,255,136,0.6)",
                  letterSpacing: "-1px",
                  lineHeight: 1
                },
                children: "KL"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(16px, 5vw, 22px)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      color: "#00FF88",
                      textShadow: "0 0 12px rgba(0,255,136,0.9)"
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
                      filter: "drop-shadow(0 0 6px rgba(157,78,221,0.7))"
                    },
                    children: "Esports Life"
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
                fontSize: 11,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginTop: 4
              },
              children: "DOMINATE THE BATTLEGROUND"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes kl-logo-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,255,136,0.25), inset 0 0 20px rgba(0,255,136,0.05); }
          50% { box-shadow: 0 0 50px rgba(0,255,136,0.45), inset 0 0 30px rgba(0,255,136,0.1); }
        }
      ` })
      ]
    }
  );
}
function LoginPage() {
  const { login, isLoggingIn } = useFirebaseAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "battleground-bg min-h-screen flex items-center justify-center px-4",
      style: { position: "relative" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              background: "radial-gradient(ellipse at 50% 100%, rgba(255,100,0,0.18) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative z-10 w-full max-w-sm",
            style: {
              background: "rgba(10,10,10,0.90)",
              border: "1.5px solid rgba(0,255,136,0.25)",
              borderRadius: 20,
              boxShadow: "0 0 60px rgba(0,255,136,0.1), 0 8px 40px rgba(0,0,0,0.8)",
              padding: "2.5rem 2rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KLLoginLogo, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    borderTop: "1px solid rgba(0,255,136,0.12)",
                    marginBottom: "2rem"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4", style: { color: "#00FF88" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm tracking-wider",
                      style: {
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'Rajdhani', sans-serif"
                      },
                      children: "SECURE LOGIN"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "login.primary_button",
                    className: "w-full",
                    disabled: isLoggingIn,
                    onClick: () => login(),
                    style: {
                      background: isLoggingIn ? "rgba(255,255,255,0.1)" : "white",
                      color: "#1a1a1a",
                      border: "none",
                      borderRadius: 12,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      padding: "0 24px",
                      height: 56,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      boxShadow: "0 0 20px rgba(255,255,255,0.15)",
                      transition: "all 0.3s ease"
                    },
                    children: [
                      isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
                          alt: "G",
                          width: 20,
                          height: 20
                        }
                      ),
                      isLoggingIn ? "Connecting..." : "Sign in with Google"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-center text-xs leading-relaxed",
                    style: {
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "'Rajdhani', sans-serif",
                      maxWidth: 260
                    },
                    children: "Sign in securely with your Google account"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 mt-2",
                    style: { color: "rgba(255,255,255,0.25)", fontSize: 11 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒 Secure" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚡ Fast" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎮 Gaming" })
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  LoginPage
};
