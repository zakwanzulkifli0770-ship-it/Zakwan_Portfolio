import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Terminal, ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/Particles";
import { useEffect, useState } from "react";
import { useGetStatsSummary } from "@workspace/api-client-react";

export default function Home() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    "Full Stack Developer",
    "Cybersecurity Enthusiast",
    "AI Integration Builder",
    "System Architect"
  ];

  const { data: stats } = useGetStatsSummary({ query: { queryKey: ["stats-summary"] } });

  useEffect(() => {
    const role = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(role.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(role.substring(0, text.length + 1));
        if (text.length === role.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden px-4">
      <Particles />
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary w-fit text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm <br />
            <span className="text-gradient leading-tight">Mr. Zakwan</span>
          </h1>
          
          <div className="h-12 flex items-center text-2xl md:text-3xl font-mono text-muted-foreground">
            <span className="mr-2 text-primary">&gt;</span> 
            {text}
            <span className="animate-pulse ml-1 w-3 h-8 bg-primary block"></span>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            I craft high-performance, secure, and beautiful digital experiences. Bridging the gap between design and intricate systems architecture.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="lg" className="neon-border hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all bg-primary/20 hover:bg-primary/30 text-primary border-primary/50" asChild>
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white glass-card" asChild>
              <Link href="/contact">
                Contact Me <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-6 mt-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white hover:scale-110 transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#0077b5] hover:scale-110 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur-[100px] opacity-30 rounded-full"></div>
          <div className="glass-card rounded-2xl p-6 relative border border-primary/20 overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs font-mono text-muted-foreground flex items-center gap-2">
                <Terminal className="w-3 h-3" /> terminal
              </div>
            </div>
            
            <div className="font-mono text-sm leading-relaxed space-y-2">
              <p><span className="text-green-400">root@cyber-sys</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> whoami</p>
              <p className="text-muted-foreground">Alex_Cyber - Lead Architect</p>
              <p><span className="text-green-400">root@cyber-sys</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> neofetch</p>
              <div className="text-muted-foreground flex gap-4">
                <div className="text-primary font-bold text-5xl">/\</div>
                <div>
                  <p><span className="text-primary">OS:</span> Cyber_OS v10.4</p>
                  <p><span className="text-primary">Kernel:</span> React-Vite-Node</p>
                  <p><span className="text-primary">Uptime:</span> 5+ Years coding</p>
                  <p><span className="text-primary">Packages:</span> NPM, Bun, Rust</p>
                  <p><span className="text-primary">Shell:</span> ZSH</p>
                </div>
              </div>
              <p><span className="text-green-400">root@cyber-sys</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> ./get_stats.sh</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                <div className="bg-white/5 border border-white/10 p-3 rounded text-white">
                  <div className="text-xl font-bold text-primary">{stats?.totalProjects || 0}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded text-white">
                  <div className="text-xl font-bold text-secondary">{stats?.totalExperiences || 0}</div>
                  <div className="text-xs text-muted-foreground">Experiences</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
