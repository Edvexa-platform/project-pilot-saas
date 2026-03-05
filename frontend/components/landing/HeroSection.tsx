"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, LayoutDashboard, Folder, PlusSquare, FileText, Presentation, MessageSquare, Settings, BarChart3, Clock, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";
import VideoModal from "@/components/ui/VideoModal";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center">
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoUrl="/demo.webp" />

      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="ai-glow ai-glow-primary w-[500px] h-[500px] top-[-100px] left-[-100px] animate-pulse-slow" />
        <div className="ai-glow ai-glow-secondary w-[600px] h-[600px] bottom-[-200px] right-[-100px] animate-pulse-slow" />

        {/* Animated Mesh/Particles - Simplified Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border w-fit mx-auto lg:mx-0 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/80">The Future of Academic Excellence</span>
            </div>

            <h1 className="hero-headline text-foreground">
              Your College <span className="gradient-text">Projects</span>, <br />
              Done Right.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Redefining student productivity with clinical-grade AI generators. Abstracts, reports, presentations, and code — generated in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="/signup" className="btn-gradient-glow flex items-center gap-2 h-14 px-8 text-base font-bold group">
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-2 h-14 px-8 rounded-[12px] border border-border bg-white dark:bg-card hover:bg-muted font-bold transition-all shadow-sm group"
              >
                <Play className="w-5 h-5 fill-primary text-primary group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden flex items-center justify-center text-[10px] font-bold">
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-semibold">
                Trusted by <span className="text-foreground">2,500+</span> students this month
              </p>
            </div>
          </motion.div>

          {/* Right Column: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Dashboard Mockup - Floating Effect */}
            <div className="saas-card p-0 flex flex-row h-[520px] overflow-hidden border border-border/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative z-10 bg-white/95 dark:bg-card/95 backdrop-blur-sm">

              {/* Sidebar Mockup */}
              <div className="w-56 bg-muted/30 border-r border-border/50 p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 px-2 pb-8">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-extrabold text-sm tracking-tight">ProjectPilot</span>
                </div>

                {[
                  { icon: LayoutDashboard, label: "Dashboard", active: true },
                  { icon: Folder, label: "My Projects" },
                  { icon: PlusSquare, label: "Generate Project" },
                  { icon: FileText, label: "Reports" },
                  { icon: Presentation, label: "Presentations" },
                  { icon: MessageSquare, label: "Viva Assistant" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${item.active ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted/50'}`}>
                    <item.icon className={`w-4 h-4 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    {item.label}
                  </div>
                ))}

                <div className="mt-auto">
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted/50 transition-all cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </div>
                </div>
              </div>

              {/* Main Content Mockup */}
              <div className="flex-1 p-8 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xl tracking-tight">Project Analytics</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-5">
                  {[
                    { label: "Generated", value: "12", icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
                    { label: "In Review", value: "4", icon: Clock, color: "text-secondary", bg: "bg-secondary/10" },
                    { label: "Viva Rank", value: "A+", icon: Calendar, color: "text-accent", bg: "bg-accent/10" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-2xl border border-border/50 p-5 bg-background/50 flex flex-col gap-3">
                      <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-2xl font-black">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity Feed */}
                <div className="flex-1 rounded-2xl border border-border/50 p-6 bg-background/50">
                  <h4 className="font-bold text-sm mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Real-time Generations
                  </h4>
                  <div className="space-y-6">
                    {[
                      { title: "Smart City AI Report", time: "12m ago", status: "Success", progress: 100 },
                      { title: "Blockchain Voting System", time: "Generating...", status: "Processing", progress: 65 },
                      { title: "IoT Home Automation", time: "Ready", status: "Success", progress: 100 },
                    ].map((activity, i) => (
                      <div key={i} className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-foreground">{activity.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activity.status === 'Success' ? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'}`}>
                            {activity.status}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${activity.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                            className={`h-full bg-gradient-to-r ${activity.status === 'Success' ? 'from-accent to-emerald-400' : 'from-primary to-secondary'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Background Glows for Mockup */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-secondary/10 to-accent/20 rounded-[3rem] blur-3xl -z-10 opacity-60 animate-rotate-slow" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

