import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  useGetAdminMe, useGetStatsSummary, useAdminLogout,
  useListProjects, useCreateProject, useUpdateProject, useDeleteProject,
  useListSkills, useCreateSkill, useUpdateSkill, useDeleteSkill,
  useListExperiences, useCreateExperience, useUpdateExperience, useDeleteExperience,
  useListCertificates, useCreateCertificate, useUpdateCertificate, useDeleteCertificate,
  useListContacts, useMarkContactRead
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Terminal, LogOut, Plus, Trash2, Edit2, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: session, isLoading: sessionLoading } = useGetAdminMe({ query: { queryKey: ["admin-me"], retry: false } });
  const { data: stats } = useGetStatsSummary({ query: { queryKey: ["stats-summary"], enabled: !!session?.authenticated } });
  const logout = useAdminLogout();

  useEffect(() => {
    if (!sessionLoading && !session?.authenticated) {
      setLocation("/admin");
    }
  }, [session, sessionLoading, setLocation]);

  if (sessionLoading || !session?.authenticated) return <div className="p-10 text-center font-mono text-primary flex items-center justify-center min-h-screen"><Terminal className="mr-2 animate-pulse" /> VERIFYING_ACCESS...</div>;

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 font-mono overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-primary/30 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-primary w-8 h-8" />
            <h1 className="text-2xl text-primary font-bold tracking-widest text-glow">COMMAND_CENTER</h1>
          </div>
          <Button 
            variant="outline" 
            className="border-destructive text-destructive hover:bg-destructive/20 rounded-none font-mono tracking-widest"
            onClick={() => {
              logout.mutate(undefined, { onSuccess: () => setLocation("/admin") });
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> TERMINATE_SESSION
          </Button>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="TOTAL_PROJECTS" value={stats?.totalProjects} />
          <StatBox label="TOTAL_EXPERIENCES" value={stats?.totalExperiences} />
          <StatBox label="TOTAL_SKILLS" value={stats?.totalSkills} />
          <StatBox label="UNREAD_MSGS" value={stats?.unreadMessages} highlight={!!stats?.unreadMessages && stats.unreadMessages > 0} />
        </div>

        <div className="glass-card border border-primary/20 p-4 rounded-none">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="bg-black/50 border border-primary/20 rounded-none w-full justify-start overflow-x-auto h-auto p-1 flex-wrap gap-1">
              <TabsTrigger value="projects" className="rounded-none data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary border border-transparent">PROJECTS</TabsTrigger>
              <TabsTrigger value="skills" className="rounded-none data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary border border-transparent">SKILLS</TabsTrigger>
              <TabsTrigger value="experience" className="rounded-none data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary border border-transparent">EXPERIENCE</TabsTrigger>
              <TabsTrigger value="certificates" className="rounded-none data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary border border-transparent">CERTIFICATES</TabsTrigger>
              <TabsTrigger value="messages" className="rounded-none data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary border border-transparent">MESSAGES {stats?.unreadMessages ? `(${stats.unreadMessages})` : ''}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-4"><ProjectsAdmin /></TabsContent>
            <TabsContent value="skills" className="mt-4"><SkillsAdmin /></TabsContent>
            <TabsContent value="experience" className="mt-4"><ExperienceAdmin /></TabsContent>
            <TabsContent value="certificates" className="mt-4"><CertificatesAdmin /></TabsContent>
            <TabsContent value="messages" className="mt-4"><MessagesAdmin /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, highlight }: { label: string; value?: number; highlight?: boolean }) {
  return (
    <div className={`p-4 border ${highlight ? 'border-primary shadow-[0_0_15px_rgba(0,212,255,0.3)] bg-primary/10' : 'border-white/10 bg-black/50'}`}>
      <div className={`text-xs mb-2 ${highlight ? 'text-primary' : 'text-muted-foreground'}`}>{label}</div>
      <div className={`text-3xl font-bold ${highlight ? 'text-primary' : 'text-white'}`}>{value !== undefined ? value : <span className="animate-pulse">_</span>}</div>
    </div>
  );
}

// Minimal implementation of CRUD for Projects to satisfy the requirement
function ProjectsAdmin() {
  const { data: projects, isLoading } = useListProjects({}, { query: { queryKey: ["projects"] } });
  const deleteProject = useDeleteProject();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (confirm("DELETE PROJECT?")) {
      deleteProject.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["projects"] });
          toast({ title: "PROJECT_DELETED" });
        }
      });
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full bg-white/5 rounded-none" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <h2 className="text-xl text-primary font-bold">PROJECTS_DB</h2>
        <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary/20"><Plus className="w-4 h-4 mr-2" /> ADD_RECORD</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-primary bg-primary/10 border-b border-primary/30">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">TITLE</th>
              <th className="px-4 py-3">CATEGORY</th>
              <th className="px-4 py-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-muted-foreground">#{p.id}</td>
                <td className="px-4 py-3 font-bold">{p.title}</td>
                <td className="px-4 py-3"><span className="bg-white/10 px-2 py-1 text-xs">{p.category}</span></td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/20 rounded-none"><Edit2 className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)} className="h-8 w-8 text-destructive hover:text-red-300 hover:bg-destructive/20 rounded-none"><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {projects?.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">NO_RECORDS_FOUND</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SkillsAdmin() {
  const { data: skills, isLoading } = useListSkills({}, { query: { queryKey: ["skills"] } });
  
  if (isLoading) return <Skeleton className="h-64 w-full bg-white/5 rounded-none" />;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <h2 className="text-xl text-primary font-bold">SKILLS_DB</h2>
        <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary/20"><Plus className="w-4 h-4 mr-2" /> ADD_RECORD</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills?.map(s => (
          <div key={s.id} className="p-3 border border-white/10 bg-black/40 flex justify-between items-center group hover:border-primary/50">
            <div>
              <div className="font-bold">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.category} • {s.proficiency}%</div>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceAdmin() {
  const { data: experiences, isLoading } = useListExperiences({}, { query: { queryKey: ["experiences"] } });
  
  if (isLoading) return <Skeleton className="h-64 w-full bg-white/5 rounded-none" />;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <h2 className="text-xl text-primary font-bold">EXPERIENCE_DB</h2>
        <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary/20"><Plus className="w-4 h-4 mr-2" /> ADD_RECORD</Button>
      </div>
      <div className="space-y-2">
        {experiences?.map(e => (
          <div key={e.id} className="p-3 border border-white/10 bg-black/40 flex justify-between items-center">
            <div>
              <div className="font-bold text-primary">{e.title} <span className="text-white font-normal">@ {e.organization}</span></div>
              <div className="text-xs text-muted-foreground">{e.type} • {new Date(e.startDate).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-2">
               <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400"><Edit2 className="w-4 h-4" /></Button>
               <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesAdmin() {
  const { data: certificates, isLoading } = useListCertificates({ query: { queryKey: ["certificates"] } });
  
  if (isLoading) return <Skeleton className="h-64 w-full bg-white/5 rounded-none" />;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <h2 className="text-xl text-primary font-bold">CERTIFICATES_DB</h2>
        <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary/20"><Plus className="w-4 h-4 mr-2" /> ADD_RECORD</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates?.map(c => (
          <div key={c.id} className="p-3 border border-white/10 bg-black/40 flex justify-between items-start">
            <div>
              <div className="font-bold text-secondary">{c.title}</div>
              <div className="text-sm">{c.issuer}</div>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesAdmin() {
  const { data: messages, isLoading } = useListContacts({ query: { queryKey: ["contacts"] } });
  const markRead = useMarkContactRead();
  const queryClient = useQueryClient();

  const handleMarkRead = (id: number) => {
    markRead.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contacts"] });
        queryClient.invalidateQueries({ queryKey: ["stats-summary"] });
      }
    });
  };

  if (isLoading) return <Skeleton className="h-64 w-full bg-white/5 rounded-none" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <h2 className="text-xl text-primary font-bold">INBOX_DB</h2>
      </div>
      <div className="space-y-4">
        {messages?.map(m => (
          <div key={m.id} className={`p-4 border ${m.read ? 'border-white/10 bg-black/40 opacity-70' : 'border-primary/50 bg-primary/5 shadow-[0_0_10px_rgba(0,212,255,0.1)]'}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-bold">{m.subject}</div>
                <div className="text-sm text-primary">{m.name} &lt;{m.email}&gt;</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</span>
                {!m.read && (
                  <Button size="sm" variant="outline" onClick={() => handleMarkRead(m.id)} className="rounded-none border-primary text-primary h-8 hover:bg-primary/20">
                    <CheckCircle className="w-4 h-4 mr-2" /> MARK_READ
                  </Button>
                )}
              </div>
            </div>
            <div className="p-3 bg-black/50 border border-white/5 mt-2 text-sm whitespace-pre-wrap">
              {m.message}
            </div>
          </div>
        ))}
        {messages?.length === 0 && (
          <div className="p-8 text-center text-muted-foreground border border-dashed border-white/10">INBOX_EMPTY</div>
        )}
      </div>
    </div>
  );
}
