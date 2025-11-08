import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Heart, TrendingDown, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">GlycoCare+</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Heart className="h-4 w-4" />
            AI-Powered Health Assistant
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            Your AI-powered companion for{" "}
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              smarter nutrition
            </span>{" "}
            and better health
          </h1>
          <p className="text-xl text-muted-foreground">
            Detect meals from photos, predict glucose response, and get personalized health recommendations
            powered by AI.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                <Activity className="h-5 w-5" />
                Try Demo
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to manage your health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI technology meets personalized health tracking
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Smart Food Detection</h3>
            <p className="text-muted-foreground">
              Upload meal photos and get instant dish recognition with portion size estimates using advanced
              AI models.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Glucose Prediction</h3>
            <p className="text-muted-foreground">
              Predict post-meal glucose response based on your meal and personal health data to make informed
              choices.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold">Health Monitoring</h3>
            <p className="text-muted-foreground">
              Track glucose, blood pressure, and heart rate with color-coded alerts and personalized
              recommendations.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Activity className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">AI Health Coach</h3>
            <p className="text-muted-foreground">
              Get personalized advice considering your vitals, medications, and health conditions through
              AI-powered chat.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Trend Analysis</h3>
            <p className="text-muted-foreground">
              Visualize your health trends with interactive charts and get insights into your progress over
              time.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Utensils className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Meal Planning</h3>
            <p className="text-muted-foreground">
              Get AI-generated 7-day meal plans tailored to your health goals and dietary requirements.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-gradient-to-br from-primary to-success text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users managing their health smarter with GlycoCare+
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Free
              <Activity className="h-5 w-5" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">GlycoCare+</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a
                href="https://huggingface.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Hugging Face
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 GlycoCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
