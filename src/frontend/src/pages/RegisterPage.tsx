import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getUserByReferralCode,
  isEmailTaken,
  isPhoneTaken,
  register,
} from "@/hooks/useLocalAuth";
import { processReferral } from "@/hooks/useReferral";
import { Link, useRouter } from "@tanstack/react-router";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Gift,
  Loader2,
  Trophy,
  UserPlus,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Password Strength ─────────────────────────────────────────────────────────

function getPasswordStrength(password: string): {
  level: "weak" | "medium" | "strong";
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return { level: "weak", score, label: "Weak", color: "bg-destructive" };
  if (score <= 3)
    return { level: "medium", score, label: "Medium", color: "bg-warning" };
  return { level: "strong", score, label: "Strong", color: "bg-success" };
}

// ─── Field Indicator ───────────────────────────────────────────────────────────

function FieldIndicator({
  show,
  isValid,
  validMsg,
  errorMsg,
}: {
  show: boolean;
  isValid: boolean;
  validMsg: string;
  errorMsg: string;
}) {
  if (!show) return null;
  return (
    <div
      className={`flex items-center gap-1.5 text-xs mt-1 ${
        isValid ? "text-success" : "text-destructive"
      }`}
    >
      {isValid ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}
      <span>{isValid ? validMsg : errorMsg}</span>
    </div>
  );
}

// ─── Register Page ─────────────────────────────────────────────────────────────

export function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [referralCodeValid, setReferralCodeValid] = useState<boolean | null>(
    null,
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation state
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [emailTaken, setEmailTaken] = useState(false);
  const [phoneTaken, setPhoneTaken] = useState(false);

  // Mark field as touched on blur
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Email uniqueness check on blur
  useEffect(() => {
    if (!touched.email || !email) return;
    setEmailTaken(isEmailTaken(email));
  }, [touched.email, email]);

  // Phone uniqueness check on blur
  useEffect(() => {
    if (!touched.phone || !phone) return;
    setPhoneTaken(isPhoneTaken(phone));
  }, [touched.phone, phone]);

  // Referral code validation on change
  useEffect(() => {
    if (!referralCode) {
      setReferralCodeValid(null);
      return;
    }
    const user = getUserByReferralCode(referralCode);
    setReferralCodeValid(!!user);
  }, [referralCode]);

  // Validation predicates
  const isNameValid = fullName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !emailTaken;
  const isPhoneValid = phone.replace(/\s+/g, "").length >= 10 && !phoneTaken;
  const isPasswordValid = password.length >= 6;
  const isConfirmValid =
    password === confirmPassword && confirmPassword.length > 0;
  const passwordStrength = getPasswordStrength(password);

  const canSubmit =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmValid &&
    agreedToTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched to show all errors
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (!canSubmit) return;

    setIsLoading(true);
    try {
      const result = register(fullName, email, phone, password);

      if (!result.success) {
        toast.error("Registration failed", {
          description: result.error || "Please check your details.",
        });
        return;
      }

      // Process referral if a valid code was entered
      if (referralCode && referralCodeValid && result.user) {
        const referralResult = processReferral(
          result.user.id,
          fullName,
          referralCode,
        );
        if (referralResult.success) {
          toast.success("Referral bonus applied!", {
            description: "Your referrer earned ₹2 for referring you!",
          });
        }
      }

      toast.success("Account created!", {
        description: "Please login with your new credentials.",
      });

      await router.navigate({ to: "/login" });
    } catch (err) {
      toast.error("Unexpected error. Please try again.");
      console.error("[RegisterPage] register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      {/* Background grid effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.62 0.25 345 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.62 0.25 345 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-md space-y-6 relative z-10">
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
            Create your player account
          </p>
        </div>

        {/* Registration Card */}
        <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm shadow-glow-pink">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-secondary" />
              Create Account
            </CardTitle>
            <CardDescription>
              Join the tournament and start competing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  required
                  autoComplete="name"
                  className="bg-input border-border focus:border-secondary focus:ring-1 focus:ring-secondary"
                  data-ocid="register.input"
                />
                <FieldIndicator
                  show={!!touched.fullName}
                  isValid={isNameValid}
                  validMsg="Looks good!"
                  errorMsg="Name must be at least 2 characters."
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailTaken(false);
                  }}
                  onBlur={() => handleBlur("email")}
                  required
                  autoComplete="email"
                  className="bg-input border-border focus:border-secondary focus:ring-1 focus:ring-secondary"
                  data-ocid="register.input"
                />
                <FieldIndicator
                  show={!!touched.email && email.length > 0}
                  isValid={isEmailValid}
                  validMsg="Email is available!"
                  errorMsg={
                    emailTaken
                      ? "This email is already registered."
                      : "Please enter a valid email address."
                  }
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="+91XXXXXXXXXX"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneTaken(false);
                  }}
                  onBlur={() => handleBlur("phone")}
                  required
                  autoComplete="tel"
                  className="bg-input border-border focus:border-secondary focus:ring-1 focus:ring-secondary"
                  data-ocid="register.input"
                />
                <FieldIndicator
                  show={!!touched.phone && phone.length > 0}
                  isValid={isPhoneValid}
                  validMsg="Phone number is available!"
                  errorMsg={
                    phoneTaken
                      ? "This phone number is already registered."
                      : "Phone must be at least 10 digits."
                  }
                />
              </div>

              {/* Referral Code */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-referral"
                  className="flex items-center gap-1.5"
                >
                  <Gift className="h-3.5 w-3.5 text-green-400" />
                  Referral Code{" "}
                  <span className="text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="reg-referral"
                    type="text"
                    placeholder="e.g. REF123456"
                    value={referralCode}
                    onChange={(e) =>
                      setReferralCode(e.target.value.toUpperCase())
                    }
                    maxLength={9}
                    className={`bg-input border-border focus:border-green-500 focus:ring-1 focus:ring-green-500 uppercase pr-8 ${
                      referralCode && referralCodeValid === true
                        ? "border-green-500/60"
                        : referralCode && referralCodeValid === false
                          ? "border-destructive/60"
                          : ""
                    }`}
                    data-ocid="register.input"
                  />
                  {referralCode && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {referralCodeValid === true ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
                {referralCode && referralCodeValid !== null && (
                  <div
                    className={`flex items-center gap-1.5 text-xs mt-1 ${
                      referralCodeValid ? "text-green-400" : "text-destructive"
                    }`}
                  >
                    {referralCodeValid ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>
                          ✓ Valid referral code! Your referrer will earn ₹2
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        <span>✗ Invalid referral code</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-password">
                  Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="bg-input border-border focus:border-secondary focus:ring-1 focus:ring-secondary pr-10"
                    data-ocid="register.input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength Bar */}
                {password.length > 0 && (
                  <div className="space-y-1 mt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            i <= passwordStrength.score
                              ? passwordStrength.color
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${
                        passwordStrength.level === "weak"
                          ? "text-destructive"
                          : passwordStrength.level === "medium"
                            ? "text-warning"
                            : "text-success"
                      }`}
                    >
                      Password strength: {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-confirm">
                  Confirm Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="reg-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    required
                    autoComplete="new-password"
                    className="bg-input border-border focus:border-secondary focus:ring-1 focus:ring-secondary pr-10"
                    data-ocid="register.input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FieldIndicator
                  show={!!touched.confirmPassword && confirmPassword.length > 0}
                  isValid={isConfirmValid}
                  validMsg="Passwords match!"
                  errorMsg="Passwords do not match."
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border">
                <Checkbox
                  id="reg-terms"
                  checked={agreedToTerms}
                  onCheckedChange={(v) => setAgreedToTerms(!!v)}
                  className="mt-0.5"
                  required
                  data-ocid="register.checkbox"
                />
                <Label
                  htmlFor="reg-terms"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    to="/rules"
                    className="text-primary hover:text-primary/80 underline-offset-2 underline"
                    target="_blank"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and <span className="text-secondary">Fair Play Policy</span>.
                  I confirm that I will not use hacks, cheats, or unfair
                  methods.
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold tracking-wide"
                disabled={isLoading}
                data-ocid="register.submit_button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  data-ocid="register.link"
                >
                  Login here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features highlight */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "🛡️", label: "Secure" },
            { icon: "⚡", label: "Instant" },
            { icon: "🎮", label: "Free to Join" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-lg bg-card/50 border border-border/50"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-muted-foreground font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
