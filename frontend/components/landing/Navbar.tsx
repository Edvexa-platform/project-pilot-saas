"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-7xl",
        scrolled ? "top-2" : "top-6"
      )}
    >
      <div className={cn(
        "mx-auto h-16 px-6 flex items-center justify-between transition-all duration-500",
        scrolled ? "glass rounded-2xl shadow-2xl shadow-black/5" : "bg-transparent"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Logo onClick={handleLogoClick} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          {!loading && (
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="default" className="rounded-full px-6 font-bold text-xs uppercase tracking-widest h-10 shadow-lg shadow-primary/20">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
                      Log in
                    </button>
                  </Link>
                  <Link href="/signup">
                    <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20 transition-all h-10 font-bold text-xs uppercase tracking-widest">
                      Get Started
                    </Button>
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
        <div className="md:hidden absolute top-20 left-0 right-0 glass rounded-2xl p-6 mx-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <div className="h-px bg-border/50" />
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-border/50" />
            {user ? (
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-full uppercase text-xs font-bold tracking-widest">Dashboard</Button>
              </Link>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full uppercase text-xs font-bold tracking-widest">Log in</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-full uppercase text-xs font-bold tracking-widest">Get Started</Button>
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


