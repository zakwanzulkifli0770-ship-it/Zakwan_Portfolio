import { useState } from "react";
import { motion } from "framer-motion";
import { useListProjects } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const { data: projects, isLoading } = useListProjects(
    activeCategory ? { category: activeCategory } : {},
    { query: { queryKey: ["projects", activeCategory] } }
  );

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gradient">Projects</h1>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-4">
          <Button 
            variant={activeCategory === undefined ? "default" : "outline"} 
            onClick={() => setActiveCategory(undefined)}
            className={activeCategory === undefined ? "bg-primary text-black" : "border-white/20"}
          >
            All
          </Button>
          <Button 
            variant={activeCategory === "Frontend" ? "default" : "outline"} 
            onClick={() => setActiveCategory("Frontend")}
            className={activeCategory === "Frontend" ? "bg-primary text-black" : "border-white/20"}
          >
            Frontend
          </Button>
          <Button 
            variant={activeCategory === "Backend" ? "default" : "outline"} 
            onClick={() => setActiveCategory("Backend")}
            className={activeCategory === "Backend" ? "bg-primary text-black" : "border-white/20"}
          >
            Backend
          </Button>
          <Button 
            variant={activeCategory === "Fullstack" ? "default" : "outline"} 
            onClick={() => setActiveCategory("Fullstack")}
            className={activeCategory === "Fullstack" ? "bg-primary text-black" : "border-white/20"}
          >
            Fullstack
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-80 w-full rounded-xl bg-white/5" />
            <Skeleton className="h-80 w-full rounded-xl bg-white/5" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card rounded-xl overflow-hidden border border-white/10 hover:neon-border group"
              >
                <div className="h-48 bg-white/5 relative overflow-hidden flex items-center justify-center">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                  ) : (
                    <div className="text-muted-foreground flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/10 to-secondary/10">No Image</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{project.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <Button size="sm" className="bg-primary/20 hover:bg-primary/40 text-primary w-full" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2" /> Live</a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="border-white/20 w-full" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" /> Code</a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
