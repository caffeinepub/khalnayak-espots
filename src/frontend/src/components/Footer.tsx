import { Heart } from "lucide-react";
import { SiInstagram, SiYoutube, SiDiscord } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 bg-card mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold font-display text-primary mb-2">KHALNAYAK ESPOTS</h3>
            <p className="text-sm text-muted-foreground">
              India's premier Free Fire tournament platform. Join tournaments, compete with the best, and win exciting prizes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/tournaments" className="hover:text-primary transition-colors">
                  Tournaments
                </a>
              </li>
              <li>
                <a href="/rules" className="hover:text-primary transition-colors">
                  Rules & Regulations
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-primary transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <SiYoutube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Discord">
                <SiDiscord className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear}. Built with <Heart className="h-4 w-4 text-secondary fill-secondary" /> using{" "}
            <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
