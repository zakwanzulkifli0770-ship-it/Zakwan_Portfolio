import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Github, Linkedin, Mail, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/ui/Particles";
import { useEffect, useState } from "react";
import { useGetStatsSummary } from "@workspace/api-client-react";
import profilePic from "@assets/WhatsApp_Image_2026-05-23_at_7.39.24_PM_1779824467823.jpeg";

export default function Home() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full Stack Developer",
    "Cybersecurity Enthusiast",
    "AI Integration Builder",
    "System Architect",
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
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-4 py-12">
      <Particles />

      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#8b5cf6]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#00d4ff]/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">

        {/* Left Column — identity */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col justify-center space-y-8"
        >
          <div className="space-y-4">
            <Badge variant="outline" className="border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10 gap-2 py-1 px-3 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]" />
              </span>
              Available for new opportunities
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gradient-cyber">Mr. Zakwan</span>
            </h1>

            <div className="flex items-center text-[#00d4ff] font-mono text-xl">
              <span className="mr-2">&gt;</span>
              <span>{text}</span>
              <span className="w-3 h-5 bg-[#00d4ff] ml-1 animate-blink inline-block" />
            </div>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            I craft high-performance, secure, and beautiful digital experiences.
            Bridging the gap between design and intricate systems architecture.
          </p>

          <div className="flex flex-col space-y-3 w-full sm:w-2/3">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/10 text-gray-300 hover:text-white hover:bg-white/5 glass-card h-12"
              asChild
            >
              <Link href="/contact">
                Contact Me <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-6 pt-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#00d4ff] hover:scale-110 transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#8b5cf6] hover:scale-110 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:muhdzakwanx@hotmail.com" className="text-gray-500 hover:text-[#00d4ff] hover:scale-110 transition-all">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        {/* Right Column — terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center mt-8 lg:mt-0"
        >
          <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a10]/80 backdrop-blur-md shadow-2xl animate-float">

            {/* macOS title bar */}
            <div className="h-10 bg-[#12121a] flex items-center px-4 border-b border-gray-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-gray-500 font-mono font-medium flex items-center justify-center gap-2">
                <TerminalIcon className="w-3 h-3" />
                terminal — bash
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm leading-relaxed relative min-h-[420px]">
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none scanline-overlay mix-blend-overlay opacity-20" />

              <div className="space-y-6 text-gray-300 relative z-10">

                {/* whoami */}
                <div>
                  <div className="flex">
                    <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                    <span className="text-white">whoami</span>
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center bg-gray-900/50 p-3 rounded-lg border border-gray-800/50 gap-4">
                    <img
                      src={profilePic}
                      alt="Profile"
                      style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid #00d4ff" }}
                      className="shadow-[0_0_10px_rgba(0,212,255,0.3)] shrink-0"
                    />
                    <div>
                      <div className="text-white font-semibold text-lg">Muhd Zakwan</div>
                      <div className="text-[#8b5cf6]">Cyber Expert &amp; Full Stack Dev</div>
                    </div>
                  </div>
                </div>

                {/* cat about.txt */}
                <div>
                  <div className="flex">
                    <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                    <span className="text-white">cat <span className="text-[#00d4ff]">about.txt</span></span>
                  </div>
                  <div className="mt-2 text-gray-400">
                    "I craft high-performance, secure, and beautiful digital experiences."
                  </div>
                </div>

                {/* ls skills/ */}
                <div>
                  <div className="flex">
                    <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                    <span className="text-white">ls <span className="text-[#00d4ff]">skills/</span></span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "Redis", "Kubernetes", "Bash"].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-gray-800/50 text-[#00d4ff] rounded border border-gray-700/50 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ./get_stats.sh */}
                <div>
                  <div className="flex mb-3">
                    <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                    <span className="text-[#00d4ff]">./get_stats.sh</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/40 border border-[#00d4ff]/20 p-3 rounded flex flex-col justify-center cyber-glow hover:border-[#00d4ff]/50 transition-colors">
                      <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Projects</span>
                      <span className="text-white text-xl font-bold">{stats?.totalProjects ?? 6}<span className="text-[#00d4ff]">+</span></span>
                    </div>
                    <div className="bg-gray-900/40 border border-[#8b5cf6]/20 p-3 rounded flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-[#8b5cf6]/50 transition-colors">
                      <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Experience</span>
                      <span className="text-white text-xl font-bold">{stats?.totalExperiences ?? 1}<span className="text-[#8b5cf6]">yr</span></span>
                    </div>
                    <div className="bg-gray-900/40 border border-[#00d4ff]/20 p-3 rounded flex flex-col justify-center cyber-glow hover:border-[#00d4ff]/50 transition-colors">
                      <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Skills</span>
                      <span className="text-white text-xl font-bold">24<span className="text-[#00d4ff]">+</span></span>
                    </div>
                    <div className="bg-gray-900/40 border border-[#8b5cf6]/20 p-3 rounded flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-[#8b5cf6]/50 transition-colors">
                      <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Certs</span>
                      <span className="text-white text-xl font-bold">1<span className="text-[#8b5cf6]">+</span></span>
                    </div>
                  </div>
                </div>

                {/* Blinking cursor */}
                <div className="flex items-center pt-1">
                  <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                  <span className="w-2.5 h-5 bg-white animate-blink block" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
