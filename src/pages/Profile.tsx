import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    diabetes: false,
    bloodPressure: false,
    heart: false,
    medication: false,
    autoSync: false,
    glucose: "145",
    systolic: "138",
    diastolic: "88",
    heartRate: "92",
  });
  const [recentMeals, setRecentMeals] = useState<any[]>([]);
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

    // Load recent meals
    const meals = JSON.parse(localStorage.getItem("glycocare_meals") || "[]");
    setRecentMeals(meals.slice(-3).reverse());
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
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

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

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="medication">Taking Medication</Label>
                  <Switch
                    id="medication"
                    checked={formData.medication}
                    onCheckedChange={(checked) => setFormData({ ...formData, medication: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoSync">Auto-sync Vitals from Device</Label>
                  <Switch
                    id="autoSync"
                    checked={formData.autoSync}
                    onCheckedChange={(checked) => setFormData({ ...formData, autoSync: checked })}
                  />
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

        {/* Recent Meals */}
        {recentMeals.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Meals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMeals.map((meal, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{meal.dish}</p>
                      <p className="text-sm text-muted-foreground">
                        {meal.portion}g • +{meal.predictedDelta} mg/dL
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(meal.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
