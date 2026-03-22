import { Heart } from "lucide-react";
import { SiDiscord, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

function KLFooterLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 900,
          fontSize: 20,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.1,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            color: "#00FF88",
            textShadow:
              "0 0 12px rgba(0,255,136,0.9), 0 0 24px rgba(0,255,136,0.5)",
          }}
        >
          KL
        </span>
        <span
          style={{
            background: "linear-gradient(90deg, #9d4edd, #c77dff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 6px rgba(157,78,221,0.7))",
          }}
        >
          Esports Life
        </span>
      </span>
      <span
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 11,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        Khalnayak Espots
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-card mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <KLFooterLogo />
            <p className="text-sm text-muted-foreground mt-3">
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
                className="text-muted-foreground hover:text-pink-500 transition-colors"
                aria-label="Instagram"
                data-ocid="footer.instagram.link"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@khalnayak_Esports"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-red-500 transition-colors"
                aria-label="YouTube"
                data-ocid="footer.youtube.link"
              >
                <SiYoutube className="h-6 w-6" />
              </a>
              <a
                href="https://discord.gg/2Xwhz7Pzjz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-indigo-400 transition-colors"
                aria-label="Discord"
                data-ocid="footer.discord.link"
              >
                <SiDiscord className="h-6 w-6" />
              </a>
              <a
                href="https://chat.whatsapp.com/FPfcFZV5YDL7wsAClH7AYN?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
                data-ocid="footer.whatsapp.link"
              >
                <SiWhatsapp className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center">
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-primary">
            © 2026. Built with{" "}
            <Heart className="h-4 w-4 text-secondary fill-secondary" /> using KL
            Softwer
          </p>
        </div>
      </div>
    </footer>
  );
}
