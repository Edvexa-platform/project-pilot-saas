"use client";

import Link from "next/link";
import { Sparkles, Mail, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "FAQ", href: "#faq" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#" },
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  };

  return (
    <footer className="relative border-t border-border/50 pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-background z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter text-foreground">
                PROJECT<span className="gradient-text">PILOT</span>
              </span>
            </Link>
            <p className="text-muted-foreground/80 leading-relaxed font-medium max-w-sm mb-10">
              Transforming the academic journey with clinical-grade AI generators. Built for the modern student.
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
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-foreground/40 mb-8">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-all duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
            © {new Date().getFullYear()} ProjectPilot AI. Engineered with precision.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-xs font-bold tracking-widest uppercase">Safe & Secure</span>
            <span className="text-xs font-bold tracking-widest uppercase">Privacy Focused</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

