import { j as jsxRuntimeExports, T as Trophy, C as Card, h as CardHeader, i as CardTitle, S as Shield, p as CardDescription, k as CardContent, Q as Link, aS as useRouter, O as useInternetIdentity, r as reactExports, B as Button, L as LoaderCircle, aT as loginWithEmail, I as ue, aU as loginWithOtp, aV as loginWithPhone, aW as sendOtp } from "./index-DXLNnwaf.js";
import { C as Checkbox } from "./checkbox-u9F_vPVW.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-DY4zO4d6.js";
import { L as Label, I as Input } from "./label-BtxAZz49.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BKhmmaOs.js";
import { E as EyeOff, a as Eye } from "./eye-CF9iubdH.js";
import { P as Phone } from "./phone-C9nY_2q9.js";
import "./index-CnYX-Ylu.js";
import "./check-DL1iwDGS.js";
function LoginPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center py-6 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 pointer-events-none opacity-5",
        style: {
          backgroundImage: `
            linear-gradient(oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold font-display", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-cyan text-primary", children: "KHALNAYAK" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: "ESPOTS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Login to your account to continue" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-card/80 backdrop-blur-sm shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary" }),
            "Welcome Back"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Choose your preferred login method" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Tabs,
            {
              defaultValue: "email",
              className: "space-y-4",
              "data-ocid": "login.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2 bg-muted/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      value: "email",
                      "data-ocid": "login.tab",
                      className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                      children: "📧 Email Login"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      value: "phone",
                      "data-ocid": "login.tab",
                      className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                      children: "📱 Phone Login"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmailLoginForm, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneLoginForm, {}) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 text-center text-sm text-muted-foreground", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/register",
                className: "text-primary hover:text-primary/80 font-semibold transition-colors",
                "data-ocid": "login.link",
                children: "Register here"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function EmailLoginForm() {
  const router = useRouter();
  const { login: iiLogin, identity } = useInternetIdentity();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [rememberMe, setRememberMe] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [fpDialogOpen, setFpDialogOpen] = reactExports.useState(false);
  const [fpEmail, setFpEmail] = reactExports.useState("");
  const [fpSent, setFpSent] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = loginWithEmail(email, password, rememberMe);
      if (!result.success) {
        setError(result.error || "Login failed");
        return;
      }
      window.dispatchEvent(new StorageEvent("storage", { key: "kle_session" }));
      ue.success(`Welcome back, ${result.session.fullName}!`, {
        description: "You have been logged in successfully."
      });
      if (!identity) {
        iiLogin();
      }
      await router.navigate({ to: "/profile" });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("[LoginPage] login error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFpSend = () => {
    if (!fpEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fpEmail)) {
      ue.error("Please enter a valid email address.");
      return;
    }
    setFpSent(true);
    ue.success("Password reset link sent!", {
      description: `Demo: Check ${fpEmail} for the reset link.`
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", children: "Email Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "login-email",
          type: "email",
          placeholder: "your@email.com",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          autoComplete: "email",
          className: "bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary",
          "data-ocid": "login.input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "login-password",
            type: showPassword ? "text" : "password",
            placeholder: "Enter your password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            autoComplete: "current-password",
            className: "bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary pr-10",
            "data-ocid": "login.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowPassword(!showPassword),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            tabIndex: -1,
            "aria-label": showPassword ? "Hide password" : "Show password",
            children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: "remember-me",
            checked: rememberMe,
            onCheckedChange: (v) => setRememberMe(!!v),
            "data-ocid": "login.checkbox"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "remember-me", className: "text-sm cursor-pointer", children: "Remember Me" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: fpDialogOpen, onOpenChange: setFpDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-sm text-primary hover:text-primary/80 transition-colors",
            "data-ocid": "login.link",
            children: "Forgot Password?"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", "data-ocid": "login.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reset Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Enter your email to receive a password reset link." })
          ] }),
          fpSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4 text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "📬" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-success", children: "Link sent!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Check your email at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: fpEmail }),
              " for the reset link."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "(Demo mode)" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fp-email", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "fp-email",
                  type: "email",
                  placeholder: "your@email.com",
                  value: fpEmail,
                  onChange: (e) => setFpEmail(e.target.value),
                  "data-ocid": "login.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setFpDialogOpen(false),
                  "data-ocid": "login.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: handleFpSend,
                  className: "bg-primary hover:bg-primary/90",
                  "data-ocid": "login.confirm_button",
                  children: "Send Reset Link"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/30",
        "data-ocid": "login.error_state",
        children: error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        className: "w-full bg-primary hover:bg-primary/90 font-semibold tracking-wide",
        disabled: isLoading,
        "data-ocid": "login.submit_button",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Logging in..."
        ] }) : "Login"
      }
    )
  ] });
}
function PhoneLoginForm() {
  const router = useRouter();
  const { login: iiLogin, identity } = useInternetIdentity();
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [rememberMe, setRememberMe] = reactExports.useState(false);
  const [useOtp, setUseOtp] = reactExports.useState(false);
  const [otp, setOtp] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isSendingOtp, setIsSendingOtp] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [timer, setTimer] = reactExports.useState(60);
  const [timerActive, setTimerActive] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!timerActive) return;
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [timerActive]);
  const handleSendOtp = () => {
    if (!phone || phone.replace(/\s+/g, "").length < 10) {
      setError("Please enter a valid phone number (at least 10 digits).");
      return;
    }
    setError(null);
    setIsSendingOtp(true);
    setTimeout(() => {
      const generatedOtp = sendOtp(phone);
      setOtpSent(true);
      setIsSendingOtp(false);
      setTimerActive(true);
      ue.success(`OTP sent to ${phone}`, {
        description: `Demo mode — OTP: ${generatedOtp}`,
        duration: 8e3
      });
    }, 800);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      let result;
      if (useOtp) {
        if (!otpSent) {
          setError("Please send an OTP first.");
          return;
        }
        result = loginWithOtp(phone, otp, rememberMe);
      } else {
        result = loginWithPhone(phone, password, rememberMe);
      }
      if (!result.success) {
        setError(result.error || "Login failed");
        return;
      }
      window.dispatchEvent(new StorageEvent("storage", { key: "kle_session" }));
      ue.success(`Welcome back, ${result.session.fullName}!`, {
        description: "You have been logged in successfully."
      });
      if (!identity) {
        iiLogin();
      }
      await router.navigate({ to: "/profile" });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("[LoginPage] phone login error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-phone", children: "Phone Number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "login-phone",
            type: "tel",
            placeholder: "+91XXXXXXXXXX",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            required: true,
            autoComplete: "tel",
            className: "bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary pl-10",
            "data-ocid": "login.input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Login with:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setUseOtp(false);
            setError(null);
          },
          className: `px-3 py-1 rounded text-xs font-semibold transition-all ${!useOtp ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
          "data-ocid": "login.toggle",
          children: "Password"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setUseOtp(true);
            setError(null);
          },
          className: `px-3 py-1 rounded text-xs font-semibold transition-all ${useOtp ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
          "data-ocid": "login.toggle",
          children: "OTP"
        }
      )
    ] }),
    !useOtp ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-phone-password", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "login-phone-password",
            type: showPassword ? "text" : "password",
            placeholder: "Enter your password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: !useOtp,
            autoComplete: "current-password",
            className: "bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary pr-10",
            "data-ocid": "login.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowPassword(!showPassword),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            tabIndex: -1,
            "aria-label": showPassword ? "Hide password" : "Show password",
            children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-otp", children: "OTP Code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "login-otp",
            type: "text",
            inputMode: "numeric",
            placeholder: "Enter 6-digit OTP",
            value: otp,
            onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
            required: useOtp,
            maxLength: 6,
            className: "bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary font-mono text-lg tracking-widest",
            "data-ocid": "login.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleSendOtp,
            disabled: isSendingOtp || timerActive,
            className: "whitespace-nowrap border-primary/40 hover:border-primary min-w-[110px]",
            "data-ocid": "login.secondary_button",
            children: isSendingOtp ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : timerActive ? `Resend in ${timer}s` : otpSent ? "Resend OTP" : "Send OTP"
          }
        )
      ] }),
      otpSent && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-success", children: [
        "✓ OTP sent to ",
        phone,
        ". Check the toast for demo code."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: "phone-remember-me",
          checked: rememberMe,
          onCheckedChange: (v) => setRememberMe(!!v),
          "data-ocid": "login.checkbox"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone-remember-me", className: "text-sm cursor-pointer", children: "Remember Me" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/30",
        "data-ocid": "login.error_state",
        children: error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        className: "w-full bg-primary hover:bg-primary/90 font-semibold tracking-wide",
        disabled: isLoading,
        "data-ocid": "login.submit_button",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Logging in..."
        ] }) : "Login"
      }
    )
  ] });
}
export {
  LoginPage
};
