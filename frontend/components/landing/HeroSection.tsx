"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, FileText, Presentation, MessageSquare } from "lucide-react";
import { useState } from "react";
import VideoModal from "@/components/ui/VideoModal";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-20">
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoUrl="/demo.webp" />

      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08)_0%,transparent_50%)]" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/20 mb-10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/80">AI-Powered Project Generation</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Your College Projects, <br />
            <span className="gradient-text opacity-90 italic">Done Right</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Generate complete academic projects with AI — from abstract to code to viva preparation.
            Professionally formatted and ready for submission.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
          >
            <a href="/signup" className="btn-premium-primary group">
              Start Building Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => setIsVideoOpen(true)} className="btn-premium-outline group">
              <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: FileText, title: "Complete Reports", desc: "Auto-generated PDFs with all mandatory sections", color: "from-blue-500/20" },
              { icon: Presentation, title: "Pro Presentations", desc: "Sleek, professional PPTs ready for your defense", color: "from-purple-500/20" },
              { icon: MessageSquare, title: "Viva Assistant", desc: "AI-powered mock interviews to boost your confidence", color: "from-pink-500/20" },
            ].map((feature, i) => (
              <div key={i} className="group premium-card text-left">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-6 h-6 text-foreground/80" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

