import { ah as useIIProfile, ai as useNavigate, r as reactExports, j as jsxRuntimeExports, ab as LoaderCircle, U as Button, a$ as findPrincipalByReferralCode, aa as ue } from "./index-RJg2kaVa.js";
import { C as Checkbox } from "./checkbox-CMlqWpQq.js";
import { L as Label, I as Input } from "./label-C44oi-VJ.js";
import { f as fetchFFPlayerByUID } from "./freefirePlayerLookup-Pc_1aR9y.js";
import "./index-DGPXCKk4.js";
import "./check-BcacIcWe.js";
function ProfileSetupPage() {
  const { saveProfile, principal } = useIIProfile();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = reactExports.useState("");
  const [uid, setUid] = reactExports.useState("");
  const [nickname, setNickname] = reactExports.useState("");
  const [level, setLevel] = reactExports.useState(0);
  const [uidStatus, setUidStatus] = reactExports.useState("idle");
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [referralCode, setReferralCode] = reactExports.useState("");
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const stored = sessionStorage.getItem("kle_pending_referral");
    if (stored) setReferralCode(stored);
  }, []);
  reactExports.useEffect(() => {
    if (!uid) {
      setUidStatus("idle");
      setNickname("");
      setLevel(0);
      return;
    }
    if (!/^\d{8,12}$/.test(uid)) {
      setUidStatus("error");
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setUidStatus("loading");
      const result = await fetchFFPlayerByUID(uid);
      if (result.success && result.player) {
        setNickname(result.player.nickname);
        setLevel(result.player.level || 0);
        setUidStatus("success");
      } else if (result.error === "network_error" || result.manualFallback) {
        setUidStatus("manual");
      } else {
        setUidStatus("error");
      }
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [uid]);
  const canSubmit = displayName.trim().length > 0 && (uidStatus === "success" || uidStatus === "manual" && nickname.trim()) && confirmed && !submitting;
  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    let referredBy;
    if (referralCode) {
      const referrerPrincipal = await findPrincipalByReferralCode(referralCode);
      if (referrerPrincipal && referrerPrincipal !== principal) {
        referredBy = referrerPrincipal;
      }
    }
    const result = await saveProfile({
      display_name: displayName.trim(),
      freefire_uid: uid,
      freefire_nickname: nickname,
      freefire_level: level,
      referred_by: referredBy
    });
    sessionStorage.removeItem("kle_pending_referral");
    if (result.isNewUser && result.referralProcessed) {
      ue.success("🎁 Welcome bonus! ₹0.50 added to your wallet!", {
        duration: 4e3
      });
    }
    await navigate({ to: "/profile" });
    setSubmitting(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "battleground-bg min-h-screen flex items-center justify-center px-4 py-8",
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
              background: "radial-gradient(ellipse at 50% 100%, rgba(255,100,0,0.15) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative z-10 w-full max-w-sm",
            style: {
              background: "rgba(10,10,10,0.9)",
              border: "1.5px solid rgba(0,255,136,0.25)",
              borderRadius: 18,
              boxShadow: "0 0 40px rgba(0,255,136,0.08), 0 8px 40px rgba(0,0,0,0.7)",
              padding: "2rem 1.75rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-xl font-bold tracking-widest uppercase text-center mb-1",
                  style: {
                    fontFamily: "'Orbitron', sans-serif",
                    background: "linear-gradient(90deg, #00FF88, #9d4edd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  },
                  children: "Setup Your Profile"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-center text-xs mb-6",
                  style: {
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "'Rajdhani', sans-serif"
                  },
                  children: "Complete your profile to start playing"
                }
              ),
              referralCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mb-4 px-3 py-2 rounded-lg text-xs text-center",
                  style: {
                    background: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    color: "#00FF88",
                    fontFamily: "'Rajdhani', sans-serif"
                  },
                  children: [
                    "🎁 Referral code ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: referralCode }),
                    " applied — you'll get ₹0.50 welcome bonus!"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "display_name",
                      style: {
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: 13,
                        fontWeight: 600
                      },
                      children: "Your Display Name *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "display_name",
                      "data-ocid": "setup.input",
                      value: displayName,
                      onChange: (e) => setDisplayName(e.target.value),
                      placeholder: "Enter your gamer tag",
                      className: "mt-1",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(0,255,136,0.2)",
                        color: "white",
                        borderRadius: 8
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "ff_uid",
                      style: {
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: 13,
                        fontWeight: 600
                      },
                      children: "Free Fire UID *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ff_uid",
                      "data-ocid": "setup.input",
                      value: uid,
                      onChange: (e) => setUid(e.target.value.replace(/\D/g, "")),
                      placeholder: "Enter 8-12 digit UID",
                      inputMode: "numeric",
                      maxLength: 12,
                      className: "mt-1",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(0,255,136,0.2)",
                        color: "white",
                        borderRadius: 8
                      }
                    }
                  ),
                  uidStatus === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": "setup.loading_state",
                      className: "flex items-center gap-2 mt-2 text-xs",
                      style: { color: "rgba(255,255,255,0.5)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
                        "⏳ Fetching player info..."
                      ]
                    }
                  ),
                  uidStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": "setup.success_state",
                      className: "mt-2 text-xs px-3 py-2 rounded-lg",
                      style: {
                        background: "rgba(0,255,136,0.1)",
                        border: "1px solid rgba(0,255,136,0.3)",
                        color: "#00FF88"
                      },
                      children: [
                        "✅ Nickname: ",
                        nickname,
                        " | Level: ",
                        level
                      ]
                    }
                  ),
                  uidStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      "data-ocid": "setup.error_state",
                      className: "mt-2 text-xs px-3 py-2 rounded-lg",
                      style: {
                        background: "rgba(255,68,68,0.1)",
                        border: "1px solid rgba(255,68,68,0.3)",
                        color: "#FF6B6B"
                      },
                      children: "❌ Invalid UID. Please check and try again."
                    }
                  ),
                  uidStatus === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-xs px-3 py-1.5 rounded-lg mb-2",
                        style: {
                          background: "rgba(255,140,0,0.1)",
                          border: "1px solid rgba(255,140,0,0.3)",
                          color: "#FFA500"
                        },
                        children: "✏️ Auto-fetch unavailable. Enter nickname manually:"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: nickname,
                        onChange: (e) => setNickname(e.target.value),
                        placeholder: "Enter your Free Fire nickname",
                        style: {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,140,0,0.3)",
                          color: "white",
                          borderRadius: 8,
                          fontSize: 13
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      id: "confirm",
                      "data-ocid": "setup.checkbox",
                      checked: confirmed,
                      onCheckedChange: (v) => setConfirmed(Boolean(v)),
                      style: { marginTop: 2 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "confirm",
                      className: "cursor-pointer text-sm leading-tight",
                      style: {
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: "'Rajdhani', sans-serif"
                      },
                      children: "✓ I confirm that the above information is correct"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "setup.submit_button",
                    className: "w-full h-12 font-bold tracking-widest uppercase mt-2",
                    disabled: !canSubmit,
                    onClick: handleSubmit,
                    style: {
                      background: canSubmit ? "linear-gradient(90deg, #00FF88, #9d4edd)" : "rgba(255,255,255,0.07)",
                      color: canSubmit ? "#0a0a0a" : "rgba(255,255,255,0.3)",
                      border: "none",
                      borderRadius: 10,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.75rem",
                      boxShadow: canSubmit ? "0 0 20px rgba(0,255,136,0.35)" : "none",
                      transition: "all 0.3s ease"
                    },
                    children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                      "Saving..."
                    ] }) : "✅ COMPLETE"
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
  ProfileSetupPage
};
