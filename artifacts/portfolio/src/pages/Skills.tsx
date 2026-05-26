import { motion } from "framer-motion";
import { useListSkills } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Skills() {
  const { data: skills, isLoading } = useListSkills({}, { query: { queryKey: ["skills"] } });

  const categories = skills ? Array.from(new Set(skills.map(s => s.category))) : [];

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-12 text-gradient">Technical Arsenal</h1>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-64 w-full bg-white/5" />
            <Skeleton className="h-64 w-full bg-white/5" />
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category, idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-2">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills?.filter(s => s.category === category).map((skill, sIdx) => (
                    <div key={skill.id} className="glass-card p-4 rounded-xl border border-white/10">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-primary">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
