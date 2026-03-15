import { Heart } from "lucide-react";
import { SiDiscord, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-card mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/kl-esports-life-logo-transparent.dim_400x300.png"
              alt="KL Esports Life"
              className="h-16 w-auto object-contain mb-3"
            />
            <h3 className="text-xl font-bold font-display text-primary mb-2">
              KHALNAYAK ESPOTS
            </h3>
            <p className="text-sm text-muted-foreground">
              India's premier Free Fire tournament platform. Join tournaments,
              compete with the best, and win exciting prizes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/tournaments"
                  className="hover:text-primary transition-colors"
                >
                  Tournaments
                </a>
              </li>
              <li>
                <a
                  href="/rules"
                  className="hover:text-primary transition-colors"
                >
                  Rules & Regulations
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex space-x-4 items-center">
              <a
                href="https://www.instagram.com/khalnayak_esports007?igsh=MWdqOWJ4MW1wbzM4bQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors drop-shadow-[0_0_6px_rgba(236,72,153,0.7)]"
                aria-label="Instagram"
                data-ocid="footer.instagram.link"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@khalnayak_Esports"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-red-500 transition-colors drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]"
                aria-label="YouTube"
                data-ocid="footer.youtube.link"
              >
                <SiYoutube className="h-6 w-6" />
              </a>
              <a
                href="https://discord.gg/2Xwhz7Pzjz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-indigo-400 transition-colors drop-shadow-[0_0_6px_rgba(129,140,248,0.7)]"
                aria-label="Discord"
                data-ocid="footer.discord.link"
              >
                <SiDiscord className="h-6 w-6" />
              </a>
              <a
                href="https://chat.whatsapp.com/FPfcFZV5YDL7wsAClH7AYN?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-400 transition-colors drop-shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                aria-label="WhatsApp"
                data-ocid="footer.whatsapp.link"
              >
                <SiWhatsapp className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center">
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-primary drop-shadow-[0_0_8px_var(--tw-shadow-color)] [--tw-shadow-color:hsl(var(--primary)/0.8)]">
            © 2026. Built with{" "}
            <Heart className="h-4 w-4 text-secondary fill-secondary" /> using KL
            Softwer
          </p>
        </div>
      </div>
    </footer>
  );
}
