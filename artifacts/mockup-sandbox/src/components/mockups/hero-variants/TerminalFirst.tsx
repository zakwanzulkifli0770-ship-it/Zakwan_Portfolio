import React from 'react';
import { Github, Linkedin, Mail, Terminal as TerminalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import './_group.css';

export function TerminalFirst() {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 lg:p-12 font-sans relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#8b5cf6]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#00d4ff]/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* Left Column - 5 cols (approx 38%) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10 gap-2 py-1 px-3">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse"></span>
              Available for Work
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
              <span className="text-gradient-cyber">Mr. Zakwan</span>
            </h1>
            
            <div className="flex items-center text-[#00d4ff] font-mono text-xl">
              <span className="mr-2">&gt;</span>
              <span>Full Stack Developer</span>
              <span className="w-3 h-5 bg-[#00d4ff] ml-1 animate-blink inline-block"></span>
            </div>
          </div>

          <div className="text-gray-400 text-lg leading-relaxed space-y-2">
            <p>Architecting robust backend systems and crafting immersive frontend experiences.</p>
            <p>Specializing in high-performance web applications.</p>
          </div>

          <div className="flex flex-col space-y-4 w-full sm:w-2/3">
            <Button className="w-full bg-[#00d4ff] hover:bg-[#00b3d6] text-black font-semibold cyber-glow h-12">
              View My Work
            </Button>
            <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 h-12">
              Contact Me
            </Button>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            <a href="#" className="text-gray-500 hover:text-[#00d4ff] transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-[#8b5cf6] transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-[#00d4ff] transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Column - 7 cols (approx 62%) */}
        <div className="lg:col-span-7 flex flex-col justify-center mt-12 lg:mt-0">
          <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a10]/80 backdrop-blur-md shadow-2xl animate-float">
            
            {/* macOS Title Bar */}
            <div className="h-10 bg-[#12121a] flex items-center px-4 border-b border-gray-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 text-center text-xs text-gray-500 font-mono font-medium flex items-center justify-center">
                <TerminalIcon className="w-3 h-3 mr-2" />
                terminal - bash
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm md:text-base leading-relaxed relative min-h-[450px]">
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none scanline-overlay mix-blend-overlay opacity-30"></div>
              
              <div className="space-y-6 text-gray-300 relative z-10">
                {/* Command 1 */}
                <div>
                  <div className="flex">
                    <span className="text-green-400 mr-2">root@cyber-sys:~$</span>
                    <span className="text-white">whoami</span>
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center bg-gray-900/50 p-3 rounded-lg border border-gray-800/50 gap-4">
                    <img 
                      src="/__mockup/images/profile.jpeg" 
                      alt="Profile" 
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00d4ff' }} 
                      className="shadow-[0_0_10px_rgba(0,212,255,0.3)] shrink-0"
                    />
                    <div>
                      <div className="text-white font-semibold text-lg">Muhd Zakwan</div>
                      <div className="text-[#8b5cf6] text-sm sm:text-base">Cyber Expert & Full Stack Dev</div>
                    </div>
                  </div>
                </div>

                {/* Command 2 */}
                <div>
                  <div className="flex">
                    <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                    <span className="text-white">cat <span className="text-[#00d4ff]">about.txt</span></span>
                  </div>
                  <div className="mt-2 text-gray-400">
                    "I craft high-performance, secure, and beautiful digital experiences."
                  </div>
                </div>

                {/* Command 3 */}
                <div>
                  <div className="flex">
                    <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                    <span className="text-white">ls <span className="text-[#00d4ff]">skills/</span></span>
                  </div>
                  <div className="mt-2 text-gray-400 flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'Kubernetes', 'Bash'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-800/50 text-[#00d4ff] rounded border border-gray-700/50 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Command 4 */}
                <div>
                  <div className="flex mb-3">
                    <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                    <span className="text-[#00d4ff]">./get_stats.sh</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
                    <div className="bg-gray-900/40 border border-[#00d4ff]/20 p-3 rounded flex flex-col justify-center cyber-glow hover:border-[#00d4ff]/50 transition-colors">
                      <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Projects</span>
                      <span className="text-white text-xl font-bold">6<span className="text-[#00d4ff]">+</span></span>
                    </div>
                    <div className="bg-gray-900/40 border border-[#8b5cf6]/20 p-3 rounded flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-[#8b5cf6]/50 transition-colors">
                      <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Experience</span>
                      <span className="text-white text-xl font-bold">1<span className="text-[#8b5cf6]">yr</span></span>
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

                {/* Blinking Cursor */}
                <div className="flex pt-2 items-center">
                  <span className="text-green-400 mr-2 whitespace-nowrap">root@cyber-sys:~$</span>
                  <span className="w-2.5 h-5 bg-white animate-blink block"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
