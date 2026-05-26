import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useAdminLogin } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const login = useAdminLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({ title: "Access Granted" });
          setLocation("/admin/dashboard");
        },
        onError: () => {
          toast({ title: "Access Denied", variant: "destructive" });
        }
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] p-4">
      <div className="w-full max-w-md">
        <div className="glass-card border border-primary/30 p-8 rounded-none shadow-[0_0_30px_rgba(0,212,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <div className="flex items-center gap-3 text-primary mb-8 border-b border-primary/20 pb-4">
            <Terminal className="w-6 h-6" />
            <h1 className="font-mono text-xl tracking-widest font-bold">SYSTEM_AUTH</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative font-mono">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">&gt;</span>
                        <Input 
                          type="password" 
                          placeholder="Enter passphrase" 
                          className="bg-black/50 border-primary/30 focus-visible:ring-primary focus-visible:border-primary pl-8 text-primary rounded-none" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive font-mono" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-none bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 font-mono tracking-widest" disabled={login.isPending}>
                {login.isPending ? "AUTHENTICATING..." : "EXECUTE"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
