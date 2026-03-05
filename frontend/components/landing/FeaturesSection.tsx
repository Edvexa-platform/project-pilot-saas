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
  Zap,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Project Generator",
    description: "Multi-model AI architecture that builds projects from abstract to final conclusion in seconds.",
    gradient: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: FileText,
    title: "Academic Reports",
    description: "Generate IEEE, APA, or University-specific formatted reports with auto-citations.",
    gradient: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Presentation,
    title: "Professional PPTs",
    description: "Visual-first presentation slides designed to impress academic panels and evaluators.",
    gradient: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Code,
    title: "Working Source Code",
    description: "Clean, production-ready code generation with documentation and setup guides.",
    gradient: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: MessageSquare,
    title: "Viva Preparation",
    description: "Predictive AI viva coach that prepares you for common and technical defense questions.",
    gradient: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    icon: Download,
    title: "Export Ecosystem",
    description: "Download entire project bundles including code, PDF, and PPTX in one click.",
    gradient: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    icon: Shield,
    title: "Plagiarism-Unique",
    description: "Every generation is thermodynamically unique to ensure academic integrity.",
    gradient: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Zap,
    title: "Sub-5m Delivery",
    description: "From concept to full project delivery in under 5 minutes. Guaranteed speed.",
    gradient: "bg-primary/10 text-primary dark:text-primary",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-white dark:bg-card mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/80">Core Intelligence</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
            The AI Suite for <br />
            <span className="gradient-text">World-Class Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            ProjectPilot engineering combines advanced LLMs with academic formatting engines to produce industry-standard results.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="saas-card h-full flex flex-col group cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.gradient} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;



