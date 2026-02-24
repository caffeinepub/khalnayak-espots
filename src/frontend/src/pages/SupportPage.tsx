import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";

export function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to a backend
    toast.success("Support request submitted! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-12 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold font-display mb-2">Support & Help</h1>
        <p className="text-muted-foreground">Get help or contact us for any queries</p>
      </div>

      {/* Contact Form */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
          <CardDescription>We'll respond to your query within 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your issue or question"
                rows={6}
                required
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I register for a tournament?</AccordionTrigger>
              <AccordionContent>
                First, add money to your wallet through the Wallet page. Then browse tournaments, click on a tournament
                you'd like to join, and click "Register Team". Fill in your team details and submit. Your registration
                will be pending until approved by an admin.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I add money to my wallet?</AccordionTrigger>
              <AccordionContent>
                Go to the Wallet page, click "Add Money", select your payment method (UPI, PhonePe, or Google Play
                Redeem Code), enter the amount, and submit. Note: In this demo, actual payment processing is not
                available. Your deposit request will be pending until approved by an admin.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>When do I receive room ID and password?</AccordionTrigger>
              <AccordionContent>
                Room credentials (ID and password) are shared 15-30 minutes before the tournament starts. You'll see
                them on the tournament detail page once your registration is approved and the tournament is live.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How are prizes distributed?</AccordionTrigger>
              <AccordionContent>
                70% of the total prize pool is distributed among winners. 1st place gets 35%, 2nd gets 25%, 3rd gets
                15%, and special awards for most kills. Prizes are credited directly to your wallet after the tournament
                is completed and scores are finalized.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I withdraw my winnings?</AccordionTrigger>
              <AccordionContent>
                Yes! Go to your Wallet page and click "Withdraw". Enter the amount you want to withdraw and submit the
                request. Admin will process your withdrawal request within 24-48 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What happens if I'm caught cheating?</AccordionTrigger>
              <AccordionContent>
                We have a zero-tolerance policy for cheating. If you're caught using hacks, mods, or any unfair
                advantage, you will be permanently banned from the platform and all your winnings will be forfeited.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Is my entry fee refundable?</AccordionTrigger>
              <AccordionContent>
                Entry fees are generally non-refundable once your registration is approved. However, if the tournament is
                cancelled by the organizers or your registration is rejected, your entry fee will be refunded to your
                wallet.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>How do I use my referral code?</AccordionTrigger>
              <AccordionContent>
                Your referral code is displayed in your Wallet page. Share it with friends who are signing up. When they
                register using your code, you'll receive bonus credits in your wallet.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-secondary/30">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Reach out to us directly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold">Email</p>
              <a href="mailto:support@khalnayakespots.com" className="text-muted-foreground hover:text-primary">
                support@khalnayakespots.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold">Discord</p>
              <p className="text-muted-foreground">Join our community server for instant support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
