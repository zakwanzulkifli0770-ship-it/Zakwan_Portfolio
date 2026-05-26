import { motion } from "framer-motion";
import { useGetStatsSummary } from "@workspace/api-client-react";

export default function About() {
  const { data: stats } = useGetStatsSummary({ query: { queryKey: ["stats-summary"] } });

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gradient">About Me</h1>
        
        <div className="glass-card p-8 rounded-2xl border border-white/10 mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I am a passionate software engineer with a deep love for building scalable, high-performance web applications. My journey started with a fascination for how things work under the hood, and that curiosity has driven me to explore the entire stack — from pixel-perfect frontends to robust backend architectures.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When I'm not coding, I'm usually exploring the latest advancements in AI, tinkering with cybersecurity concepts, or contributing to open-source projects. I believe in writing code that not only works but is elegant, maintainable, and secure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value={stats?.totalProjects} label="Projects Delivered" delay={0.1} />
          <StatCard value={stats?.totalExperiences} label="Years Experience" delay={0.2} />
          <StatCard value={stats?.totalSkills} label="Tech Skills" delay={0.3} />
          <StatCard value={stats?.totalCertificates} label="Certifications" delay={0.4} />
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ value, label, delay }: { value?: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 rounded-xl border border-primary/20 text-center hover:neon-border transition-all"
    >
      <div className="text-4xl font-bold text-primary mb-2">{value || 0}</div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}
