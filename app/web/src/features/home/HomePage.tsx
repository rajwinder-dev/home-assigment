import { Building2, ExternalLink, Lock, Network, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { ProjectLogo } from "./ProjectLogo";
import { authClient } from "@/lib/auth-client";
import { UserProfile } from "@/components/UserProfile";

const features = [
  {
    icon: Shield,
    title: "Authentication",
    description:
      "Secure sign-up, login, and session management so users can access the app safely.",
  },
  {
    icon: Lock,
    title: "Role-Based Access Control",
    description:
      "Define roles and permissions to control who can view, create, or manage resources.",
  },
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Create, update, and manage employee records with role assignments and manager links.",
  },
  {
    icon: Network,
    title: "Organizational Hierarchy",
    description:
      "Model departments and reporting lines to visualize how teams and employees are structured.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  return (
    <div className="bg-background text-foreground min-h-screen font-sans antialiased">
      <nav className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <ProjectLogo />

          <div className="flex items-center gap-3">
            {session ? (
              <UserProfile />
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground shadow-primary/10 px-5 shadow-lg hover:opacity-90"
                onClick={() => navigate("/login")}
              >
                Get Started <ExternalLink size={14} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section className="container mx-auto flex flex-col items-center px-6 py-20 text-center lg:py-32">
        <Badge
          variant="outline"
          className="border-primary/20 text-primary bg-primary/5 mb-6 px-4 py-1"
        >
          Assignment Project
        </Badge>
        <h1 className="font-heading mb-8 max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight md:text-7xl">
          Manage your workforce with{" "}
          <span className="text-primary italic">EmployeeFlow</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-[640px] text-lg leading-relaxed md:text-xl">
          A full-stack employee management application built to demonstrate authentication,
          role-based access control, employee records, and organizational hierarchy in a real
          product workflow.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate(session ? "/org" : "/login")}
            className="shadow-primary/20 h-14 rounded-xl px-10 text-lg font-bold shadow-2xl transition-all hover:-translate-y-1"
          >
            {session ? "Go to Dashboard" : "Sign In"}
          </Button>
          {!session && (
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted/50 h-14 rounded-xl px-10 text-lg"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Button>
          )}
        </div>
      </section>

      <section className="border-border container mx-auto border-t px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg">
            <Building2 size={24} />
          </div>
          <h2 className="font-heading mb-4 text-3xl font-bold md:text-4xl">Assignment Overview</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            EmployeeFlow is a practical assignment focused on building a multi-tenant HR-style
            application. The goal is to implement secure user authentication, enforce permissions
            with RBAC, manage employee lifecycles, and represent company structure through
            departments and manager relationships.
          </p>
        </div>
      </section>

      <section className="border-border container mx-auto border-t px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold md:text-4xl">What This App Covers</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Core capabilities implemented as part of this assignment.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-card border-border hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                  <Icon size={24} />
                </div>
                <CardTitle className="font-heading text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-border container mx-auto border-t px-6 py-12 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          © {new Date().getFullYear()} EmployeeFlow
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
