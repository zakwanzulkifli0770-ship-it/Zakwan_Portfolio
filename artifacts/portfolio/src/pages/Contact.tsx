import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const createContact = useCreateContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createContact.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({ title: "Message sent!", description: "I'll get back to you soon." });
          form.reset();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
        }
      }
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-12 text-gradient text-center">Let's Connect</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Interested in collaborating, or just want to say hi? Send me a message and I'll get back to you as soon as possible.
            </p>
            
            <div className="glass-card p-6 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-primary/20 text-primary rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium text-white">hello@example.com</div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-secondary/20 text-secondary rounded-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Social</div>
                <div className="flex gap-4 mt-1">
                  <a href="#" className="text-white hover:text-primary transition-colors">LinkedIn</a>
                  <a href="#" className="text-white hover:text-primary transition-colors">Twitter</a>
                  <a href="#" className="text-white hover:text-primary transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl border border-white/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this regarding?" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message..." className="bg-white/5 border-white/10 focus-visible:ring-primary min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold" disabled={createContact.isPending}>
                  {createContact.isPending ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
