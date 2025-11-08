import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    diabetes: false,
    bloodPressure: false,
    heart: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.signUp(formData.email, formData.password, {
        name: formData.name,
        age: parseInt(formData.age) || undefined,
        weight: parseFloat(formData.weight) || undefined,
        diabetes_type: formData.diabetes ? 'type2' : null,
        has_bp: formData.bloodPressure,
        has_heart_condition: formData.heart,
      });

      toast({
        title: "Account created!",
        description: "Welcome to GlycoCare+. Let's start your health journey.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">GlycoCare+</span>
          </div>
          <CardTitle className="text-2xl text-center">Create your account</CardTitle>
          <CardDescription className="text-center">
            Tell us about yourself to get personalized health insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="29"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="68"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label>Health Conditions (select all that apply)</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diabetes"
                    checked={formData.diabetes}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, diabetes: checked as boolean })
                    }
                  />
                  <label htmlFor="diabetes" className="text-sm cursor-pointer">
                    Diabetes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bloodPressure"
                    checked={formData.bloodPressure}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, bloodPressure: checked as boolean })
                    }
                  />
                  <label htmlFor="bloodPressure" className="text-sm cursor-pointer">
                    Blood Pressure Issues
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="heart"
                    checked={formData.heart}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, heart: checked as boolean })
                    }
                  />
                  <label htmlFor="heart" className="text-sm cursor-pointer">
                    Heart Condition
                  </label>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
