import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  loginWithEmail,
  loginWithOtp,
  loginWithPhone,
  sendOtp,
} from "@/hooks/useLocalAuth";
import { Link, useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Phone, Shield, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Login Page ────────────────────────────────────────────────────────────────

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4">
      {/* Background grid effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-md space-y-4 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-display">
            <span className="glow-cyan text-primary">KHALNAYAK</span>{" "}
            <span className="text-secondary">ESPOTS</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Login to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-primary/30 bg-card/80 backdrop-blur-sm shadow-glow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Welcome Back
            </CardTitle>
            <CardDescription>
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="email"
              className="space-y-4"
              data-ocid="login.tab"
            >
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger
                  value="email"
                  data-ocid="login.tab"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  📧 Email Login
                </TabsTrigger>
                <TabsTrigger
                  value="phone"
                  data-ocid="login.tab"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  📱 Phone Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <EmailLoginForm />
              </TabsContent>

              <TabsContent value="phone">
                <PhoneLoginForm />
              </TabsContent>
            </Tabs>

            {/* Register Link */}
            <div className="mt-5 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
                data-ocid="login.link"
              >
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Email Login Form ──────────────────────────────────────────────────────────

function EmailLoginForm() {
  const router = useRouter();
  const { login: iiLogin, identity } = useInternetIdentity();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot Password dialog state
  const [fpDialogOpen, setFpDialogOpen] = useState(false);
  const [fpEmail, setFpEmail] = useState("");
  const [fpSent, setFpSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = loginWithEmail(email, password, rememberMe);

      if (!result.success) {
        setError(result.error || "Login failed");
        return;
      }

      // Dispatch storage event to trigger reactive updates across the app
      window.dispatchEvent(new StorageEvent("storage", { key: "kle_session" }));

      toast.success(`Welcome back, ${result.session!.fullName}!`, {
        description: "You have been logged in successfully.",
      });

      // If II identity not yet established, trigger it (non-blocking)
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
      toast.error("Please enter a valid email address.");
      return;
    }
    setFpSent(true);
    toast.success("Password reset link sent!", {
      description: `Demo: Check ${fpEmail} for the reset link.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email Address</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary"
          data-ocid="login.input"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary pr-10"
            data-ocid="login.input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(v) => setRememberMe(!!v)}
            data-ocid="login.checkbox"
          />
          <Label htmlFor="remember-me" className="text-sm cursor-pointer">
            Remember Me
          </Label>
        </div>

        {/* Forgot Password Dialog */}
        <Dialog open={fpDialogOpen} onOpenChange={setFpDialogOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
              data-ocid="login.link"
            >
              Forgot Password?
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm" data-ocid="login.dialog">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email to receive a password reset link.
              </DialogDescription>
            </DialogHeader>
            {fpSent ? (
              <div className="py-4 text-center space-y-2">
                <div className="text-4xl">📬</div>
                <p className="font-semibold text-success">Link sent!</p>
                <p className="text-sm text-muted-foreground">
                  Check your email at{" "}
                  <span className="font-mono text-primary">{fpEmail}</span> for
                  the reset link.
                </p>
                <p className="text-xs text-muted-foreground">(Demo mode)</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 py-2">
                  <Label htmlFor="fp-email">Email Address</Label>
                  <Input
                    id="fp-email"
                    type="email"
                    placeholder="your@email.com"
                    value={fpEmail}
                    onChange={(e) => setFpEmail(e.target.value)}
                    data-ocid="login.input"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFpDialogOpen(false)}
                    data-ocid="login.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleFpSend}
                    className="bg-primary hover:bg-primary/90"
                    data-ocid="login.confirm_button"
                  >
                    Send Reset Link
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Error */}
      {error && (
        <p
          className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/30"
          data-ocid="login.error_state"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 font-semibold tracking-wide"
        disabled={isLoading}
        data-ocid="login.submit_button"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}

// ─── Phone Login Form ──────────────────────────────────────────────────────────

function PhoneLoginForm() {
  const router = useRouter();
  const { login: iiLogin, identity } = useInternetIdentity();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OTP countdown timer
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
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
    }, 1000);
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
      toast.success(`OTP sent to ${phone}`, {
        description: `Demo mode — OTP: ${generatedOtp}`,
        duration: 8000,
      });
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let result: {
        success: boolean;
        session?: import("@/hooks/useLocalAuth").LocalSession;
        error?: string;
      };

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

      // Dispatch storage event for reactivity
      window.dispatchEvent(new StorageEvent("storage", { key: "kle_session" }));

      toast.success(`Welcome back, ${result.session!.fullName}!`, {
        description: "You have been logged in successfully.",
      });

      // Trigger II login if not yet authenticated
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Phone Number */}
      <div className="space-y-1.5">
        <Label htmlFor="login-phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-phone"
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className="bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary pl-10"
            data-ocid="login.input"
          />
        </div>
      </div>

      {/* OTP / Password Toggle */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
        <span className="text-sm text-muted-foreground">Login with:</span>
        <button
          type="button"
          onClick={() => {
            setUseOtp(false);
            setError(null);
          }}
          className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
            !useOtp
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="login.toggle"
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => {
            setUseOtp(true);
            setError(null);
          }}
          className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
            useOtp
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="login.toggle"
        >
          OTP
        </button>
      </div>

      {/* Password or OTP field */}
      {!useOtp ? (
        <div className="space-y-1.5">
          <Label htmlFor="login-phone-password">Password</Label>
          <div className="relative">
            <Input
              id="login-phone-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!useOtp}
              autoComplete="current-password"
              className="bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary pr-10"
              data-ocid="login.input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1.5">
          <Label htmlFor="login-otp">OTP Code</Label>
          <div className="flex gap-2">
            <Input
              id="login-otp"
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              required={useOtp}
              maxLength={6}
              className="bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary font-mono text-lg tracking-widest"
              data-ocid="login.input"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleSendOtp}
              disabled={isSendingOtp || timerActive}
              className="whitespace-nowrap border-primary/40 hover:border-primary min-w-[110px]"
              data-ocid="login.secondary_button"
            >
              {isSendingOtp ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : timerActive ? (
                `Resend in ${timer}s`
              ) : otpSent ? (
                "Resend OTP"
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>
          {otpSent && (
            <p className="text-xs text-success">
              ✓ OTP sent to {phone}. Check the toast for demo code.
            </p>
          )}
        </div>
      )}

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="phone-remember-me"
          checked={rememberMe}
          onCheckedChange={(v) => setRememberMe(!!v)}
          data-ocid="login.checkbox"
        />
        <Label htmlFor="phone-remember-me" className="text-sm cursor-pointer">
          Remember Me
        </Label>
      </div>

      {/* Error */}
      {error && (
        <p
          className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/30"
          data-ocid="login.error_state"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 font-semibold tracking-wide"
        disabled={isLoading}
        data-ocid="login.submit_button"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
