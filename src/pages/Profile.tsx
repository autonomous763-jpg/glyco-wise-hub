import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    diabetes: false,
    bloodPressure: false,
    heart: false,
    glucose: "145",
    systolic: "138",
    diastolic: "88",
    heartRate: "92",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("glycocare_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userData);
    setFormData({ ...formData, ...user });
  }, [navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("glycocare_user", JSON.stringify(formData));
    
    toast({
      title: "Profile updated",
      description: "Your health profile has been saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">GlycoCare+</span>
            </div>
            <nav className="flex gap-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/analyze">
                <Button variant="ghost">Analyze</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Profile</h1>
          <p className="text-muted-foreground">Manage your personal health information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label>Health Conditions</Label>
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

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Current Vitals</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="glucose">Monitored Glucose (mg/dL)</Label>
                    <Input
                      id="glucose"
                      type="number"
                      value={formData.glucose}
                      onChange={(e) => setFormData({ ...formData, glucose: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="systolic">BP Systolic (mmHg)</Label>
                      <Input
                        id="systolic"
                        type="number"
                        value={formData.systolic}
                        onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diastolic">BP Diastolic (mmHg)</Label>
                      <Input
                        id="diastolic"
                        type="number"
                        value={formData.diastolic}
                        onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                    <Input
                      id="heartRate"
                      type="number"
                      value={formData.heartRate}
                      onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
