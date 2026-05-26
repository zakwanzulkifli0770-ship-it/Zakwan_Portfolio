import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import './_group.css';

export function ProfileLed() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050508] text-white overflow-hidden font-sans">
      {/* Left Side - Profile Photo */}
      <div className="w-full md:w-[45%] relative h-[50vh] md:h-screen">
        <img 
          src="/__mockup/images/profile.jpeg" 
          alt="Mr. Zakwan" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-tr from-purple-900/80 via-[#00d4ff]/30 to-transparent mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent md:hidden"></div>
      </div>

      {/* Vertical Glowing Line */}
      <div className="hidden md:block w-[2px] h-screen bg-cyan-400 cyber-glow z-10 relative">
        <div className="absolute inset-0 bg-[#00d4ff] blur-md opacity-50"></div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-[55%] flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 bg-[#050508]/80 backdrop-blur-sm h-auto md:h-screen z-20">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 border border-[#00d4ff]/30 bg-[#00d4ff]/10 rounded-full px-4 py-1.5 mb-8 w-fit shadow-[0_0_15px_rgba(0,212,255,0.15)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4ff]"></span>
          </span>
          <span className="text-xs font-medium text-cyan-50 uppercase tracking-wider">Available for new opportunities</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          Mr. <span className="text-gradient-cyber">Zakwan</span>
        </h1>

        {/* Role Line */}
        <div className="font-mono text-xl md:text-2xl text-cyan-400 mb-6 flex items-center">
          <span>&gt; Full Stack Developer</span>
          <span className="w-3 h-6 bg-cyan-400 ml-1 animate-blink inline-block"></span>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
          Crafting scalable digital experiences with precision. Obsessed with clean code, modern architectures, and building products that leave a lasting impact.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button className="bg-[#00d4ff] text-[#050508] hover:bg-cyan-300 font-bold px-8 py-6 text-lg rounded-none relative group overflow-hidden cyber-glow transition-all">
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </Button>
          <Button variant="outline" className="border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 px-8 py-6 text-lg rounded-none transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            Contact Me
          </Button>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mb-12">
          {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
            <a key={i} href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300 transform hover:-translate-y-1">
              <Icon size={24} />
            </a>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-md border-t border-gray-800 pt-8 mt-auto">
          <div>
            <div className="text-3xl font-bold text-white mb-1">6<span className="text-[#00d4ff]">+</span></div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">1<span className="text-[#8b5cf6]">yr</span></div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">24<span className="text-[#00d4ff]">+</span></div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">Skills</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">1</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">Cert</div>
          </div>
        </div>

      </div>
    </div>
  );
}
