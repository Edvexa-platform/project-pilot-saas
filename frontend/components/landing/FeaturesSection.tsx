"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Presentation,
  Code,
  MessageSquare,
  Brain,
  Download,
  Shield,
  Zap
} from "lucide-react";
import { PremiumCard } from "../PremiumCard";

const features = [
  {
    icon: Brain,
    title: "AI Project Generator",
    description: "Enter your topic and get a complete project with abstract, methodology, architecture, and results.",
    gradient: "from-blue-500/20 to-transparent",
  },
  {
    icon: FileText,
    title: "Academic Reports",
    description: "Auto-generate IEEE/university format reports with all required sections and citations.",
    gradient: "from-pink-500/20 to-transparent",
  },
  {
    icon: Presentation,
    title: "Professional PPTs",
    description: "Beautiful presentation slides that follow academic standards and impress evaluators.",
    gradient: "from-emerald-500/20 to-transparent",
  },
  {
    icon: Code,
    title: "Source Code",
    description: "Get working, well-commented code ready to run and submit on GitHub.",
    gradient: "from-amber-500/20 to-transparent",
  },
  {
    icon: MessageSquare,
    title: "Viva Preparation",
    description: "AI interviewer simulates real viva questions based on your project and department.",
    gradient: "from-rose-500/20 to-transparent",
  },
  {
    icon: Download,
    title: "One-Click Downloads",
    description: "Export everything — PDF reports, PPTX, source code ZIP — in seconds.",
    gradient: "from-teal-500/20 to-transparent",
  },
  {
    icon: Shield,
    title: "Plagiarism-Safe",
    description: "Unique content generated for each project, ready for submission.",
    gradient: "from-indigo-500/20 to-transparent",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your complete project bundle in under 5 minutes, not days.",
    gradient: "from-yellow-500/20 to-transparent",
  },
];

const FeaturesSection = () => {
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
        duration: 0.6,
      },
    },
  };

  return (
    <section id="features" className="py-32 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/20 mb-6">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/80">Premium Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-8 tracking-tight leading-tight">
            Everything You Need to <br />
            <span className="gradient-text opacity-90">Ace Your Project</span>
          </h2>
          <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium">
            From ideation to viva, ProjectPilot AI handles every step of your academic project journey with clinical precision.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div key={index} variants={itemVariants}>
                <PremiumCard className="h-full group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6 text-foreground/80" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </PremiumCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

