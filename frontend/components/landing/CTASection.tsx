"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/2" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-[3rem] p-12 md:p-20 text-center max-w-5xl mx-auto border border-white/20 relative overflow-hidden"
        >
          {/* Decorative Sparks */}
          <div className="absolute top-10 left-10 text-primary/20 animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="absolute bottom-10 right-10 text-primary/20 animate-pulse delay-700">
            <Sparkles className="w-12 h-12" />
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            Ready to <span className="gradient-text italic">Ace Your Project?</span>
          </h2>
          <p className="text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of students who are already using ProjectPilot AI to generate high-quality academic projects in record time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup" className="btn-premium-primary w-full sm:w-auto">
              Start Your Project Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-premium-outline w-full sm:w-auto">
              View Pricing
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground font-bold tracking-widest uppercase opacity-60">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
