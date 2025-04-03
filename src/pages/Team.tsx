
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Saran Hiruthik M",
    role: "Algorithm Designer & Frontend Developer",
    bio: "Machine learning enthusiast with experience in scalable algorithm design and optimization.",
    image: "/public/faceonly.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:saran@example.com"
  },
  {
    name: "Shivanesh M C",
    role: "Full-Stack Developer",
    bio: "Passionate about creating interactive visualizations and building performant web applications.",
    image: "/public/shi.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:shivanesh@example.com"
  },
  {
    name: "Hemanth Kumar G T",
    role: "Algorithm Researcher",
    bio: "Specializes in optimization algorithms and parallel computing techniques.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:hemanth@example.com"
  },
  {
    name: "Sarvvesh Kuppusamy",
    role: "UI/UX Designer & Developer",
    bio: "Creates intuitive interfaces that help users understand complex algorithms through visual learning.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:sarvvesh@example.com"
  }
];

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Our Team</h1>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Meet the talented individuals behind the scalable algorithms project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className={cn(
                "overflow-hidden hover-scale",
                "glass-card-subtle group"
              )}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                  <p className="text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                      <a href={member.email}>
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Project Repository</h2>
                    <p className="text-muted-foreground mb-6">
                      This project is open-source and available on GitHub. Feel free to explore the code,
                      report issues, or contribute to the development.
                    </p>
                    <Button asChild>
                      <a 
                        href="https://github.com/algorithm-visualization-project" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="mr-2 h-5 w-5" />
                        Visit Repository
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                    <p className="mb-3">
                      This educational platform was developed as part of a computer science course project
                      focused on algorithm analysis and visualization.
                    </p>
                    <p className="text-muted-foreground">
                      The goal was to create an interactive tool that helps students and professionals
                      understand the behavior and performance characteristics of various scalable algorithms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
