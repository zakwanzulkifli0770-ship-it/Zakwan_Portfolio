import React from 'react';
import { Github, Linkedin, Mail, ChevronRight, Terminal, Code, Award, Folder } from 'lucide-react';
import './_group.css';

export function CenteredColumn() {
  return (
    <div className="relative min-h-screen bg-[#050510] text-slate-200 overflow-hidden font-sans flex flex-col justify-center items-center py-20 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(0, 212, 255, 0.05) 30%, transparent 70%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full mx-auto space-y-8">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-cyan-300 font-medium tracking-wide">Available for new opportunities</span>
        </div>

        {/* Profile Photo */}
        <div className="relative animate-float mt-4">
          <div className="absolute inset-0 rounded-full cyber-glow blur-md" />
          <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-[#00d4ff] to-[#8b5cf6]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#050510]">
              <img 
                src="/__mockup/images/profile.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Headlines */}
        <div className="text-center space-y-2 mt-6">
          <h2 className="text-2xl md:text-3xl text-slate-400 font-medium tracking-wide">Hi, I'm</h2>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-gradient-cyber pb-2">
            Mr. Zakwan
          </h1>
        </div>

        {/* Typing Line */}
        <div className="font-mono text-xl md:text-2xl text-cyan-400 bg-[#0a0a1a] px-6 py-3 rounded-lg border border-cyan-900/50 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
          <span className="text-purple-400">{'>'}</span> Full Stack Developer<span className="animate-blink">_</span>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl text-center leading-relaxed">
          Crafting high-performance web applications with a focus on immersive user experiences and scalable architectures. Turning complex problems into elegant solutions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="px-8 py-4 rounded-lg bg-cyan-500 text-slate-950 font-bold text-lg hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group">
            View My Work
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-lg backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Me
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mt-8">
          <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] transition-all duration-300">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-purple-400 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
            <Mail className="w-6 h-6" />
          </a>
        </div>

      </div>

      {/* Stats Strip */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Projects', value: '6+', icon: Folder, color: 'text-cyan-400', border: 'border-cyan-500/30' },
            { label: 'Year Exp.', value: '1', icon: Terminal, color: 'text-purple-400', border: 'border-purple-500/30' },
            { label: 'Skills', value: '24', icon: Code, color: 'text-pink-400', border: 'border-pink-500/30' },
            { label: 'Certificates', value: '1', icon: Award, color: 'text-emerald-400', border: 'border-emerald-500/30' },
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-xl bg-white/[0.02] border ${stat.border} backdrop-blur-sm hover:bg-white/[0.04] transition-colors group flex flex-col items-center text-center`}>
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}