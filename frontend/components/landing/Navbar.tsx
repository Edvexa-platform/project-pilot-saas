"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (user) {
      e.preventDefault();
      router.push("/dashboard");
    }
  };

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[calc(100%-2rem)] max-w-7xl rounded-2xl border border-transparent px-6",
        scrolled ? "modern-navbar" : "bg-transparent"
      )}
    >
      <div className="mx-auto h-16 flex items-center justify-between">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-10">
          <Logo onClick={handleLogoClick} />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-semibold text-muted-foreground hover:text-primary transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          {!loading && (
            <div className="flex items-center gap-4">
              {user ? (
                <Link href="/dashboard" className="btn-gradient-glow text-sm font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">
                    Login
                  </Link>
                  <Link href="/signup" className="btn-gradient-glow text-sm font-bold">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 modern-navbar rounded-2xl border p-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <div className="h-px bg-border/50" />
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-border/50" />
            {user ? (
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="btn-gradient-glow text-center w-full block">
                Dashboard
              </Link>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center text-sm font-semibold text-muted-foreground">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="btn-gradient-glow text-center w-full block">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




