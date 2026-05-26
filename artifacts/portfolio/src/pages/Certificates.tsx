import { motion } from "framer-motion";
import { useListCertificates } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Certificates() {
  const { data: certificates, isLoading } = useListCertificates({ query: { queryKey: ["certificates"] } });

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-12 text-gradient">Certifications</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full bg-white/5 rounded-xl" />
            <Skeleton className="h-64 w-full bg-white/5 rounded-xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates?.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-xl border border-white/10 flex flex-col items-center text-center hover:neon-border transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                <p className="text-primary text-sm mb-4">{cert.issuer}</p>
                <div className="text-xs text-muted-foreground mb-6">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                </div>
                {cert.credentialUrl && (
                  <Button variant="outline" className="mt-auto border-white/20 w-full" asChild>
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                      View Credential <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
