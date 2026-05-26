import { motion } from "framer-motion";
import { useListExperiences } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function Experience() {
  const { data: experiences, isLoading } = useListExperiences({}, { query: { queryKey: ["experiences"] } });

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-12 text-gradient">Journey</h1>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-32 w-full bg-white/5" />
            <Skeleton className="h-32 w-full bg-white/5" />
          </div>
        ) : (
          <div className="relative border-l-2 border-primary/30 ml-4 md:ml-8 space-y-12">
            {experiences?.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[21px] top-1 p-2 bg-background border-2 border-primary rounded-full text-primary">
                  {exp.type === "work" ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                </div>
                
                <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <div className="text-primary font-medium">{exp.organization}</div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - 
                      {exp.current ? " Present" : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}` : ""}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                  {exp.location && (
                    <div className="mt-4 text-xs text-muted-foreground">
                      Location: {exp.location}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
