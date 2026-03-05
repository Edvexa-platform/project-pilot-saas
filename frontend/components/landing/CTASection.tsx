"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="saas-card rounded-[2.5rem] p-12 md:p-24 text-center mx-auto relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-card dark:to-black/30 border-primary/20"
        >
          {/* Decorative Sparks */}
          <div className="absolute top-10 left-10 text-primary/30 animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="absolute bottom-12 right-12 text-secondary/30 animate-pulse delay-700">
            <Sparkles className="w-12 h-12" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Ready to <span className="gradient-text">Ace Your Project?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Join thousands of students who are already using ProjectPilot AI to generate high-quality academic projects in record time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/signup" className="btn-gradient-glow flex items-center gap-2 h-16 px-10 text-lg font-bold group">
              Start Your Project Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/pricing" className="flex items-center gap-2 h-16 px-10 rounded-xl border border-border bg-white dark:bg-card hover:bg-muted font-bold transition-all shadow-sm">
              View Pricing
            </Link>
          </motion.div>

          <p className="mt-12 text-sm text-muted-foreground font-bold tracking-widest uppercase opacity-70">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

