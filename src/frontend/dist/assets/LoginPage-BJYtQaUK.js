import { af as useUnifiedAuth, r as reactExports, j as jsxRuntimeExports, U as Button, aa as LoaderCircle } from "./index-FWT3nz_N.js";
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
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 48 48", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#FFC107",
        d: "M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#FF3D00",
        d: "m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#4CAF50",
        d: "M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#1976D2",
        d: "M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      }
    )
  ] });
}
function LoginPage() {
  const { loginWithGoogle } = useUnifiedAuth();
  const [googleLoading, setGoogleLoading] = reactExports.useState(false);
  const [googleError, setGoogleError] = reactExports.useState(null);
  const handleGoogleLogin = async () => {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed";
      if (!msg.includes("popup-closed") && !msg.includes("cancelled")) {
        setGoogleError("Sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "login.google.primary_button",
                    disabled: googleLoading,
                    onClick: handleGoogleLogin,
                    className: "w-full",
                    style: {
                      width: "100%",
                      height: 54,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      background: googleLoading ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.95)",
                      color: googleLoading ? "rgba(60,60,60,0.5)" : "#3c3c3c",
                      border: "1.5px solid rgba(255,255,255,0.2)",
                      borderRadius: 12,
                      cursor: googleLoading ? "wait" : "pointer",
                      fontFamily: "'Rajdhani', 'Roboto', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      transition: "all 0.25s ease",
                      boxShadow: googleLoading ? "none" : "0 2px 12px rgba(0,0,0,0.3)"
                    },
                    children: [
                      googleLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LoaderCircle,
                        {
                          className: "h-4 w-4 animate-spin",
                          style: { color: "#4285F4" }
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
                      googleLoading ? "Signing in..." : "Sign in with Google"
                    ]
                  }
                ),
                googleError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "#FF4444",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 12,
                      textAlign: "center"
                    },
                    "data-ocid": "login.google.error_state",
                    children: googleError
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🌐 Google" })
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
