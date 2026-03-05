"use client";

import Link from "next/link";
import { Sparkles, Mail, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "FAQ", href: "#faq" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#" },
    ],
    Legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  };

  return (
    <footer className="relative border-t border-border bg-white dark:bg-card pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16 mb-20">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">
                Project<span className="gradient-text">Pilot</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed font-medium max-w-xs mb-10 text-lg">
              Empowering the next generation of engineers with specialized AI workflows.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -4, backgroundColor: 'hsl(var(--primary))', color: 'white' }}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-sm bg-background"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="font-bold text-foreground mb-8 tracking-widest uppercase text-xs">{title}</h4>
              <ul className="space-y-5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-bold text-muted-foreground tracking-tight">
            © {new Date().getFullYear()} ProjectPilot AI. Engineered for excellence.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-xs font-black tracking-widest uppercase text-muted-foreground/50 hover:text-foreground cursor-pointer transition-colors">Safe & Secure</span>
            <span className="text-xs font-black tracking-widest uppercase text-muted-foreground/50 hover:text-foreground cursor-pointer transition-colors">Privacy First</span>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10" />
    </footer>
  );
};

export default Footer;

