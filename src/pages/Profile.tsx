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
import { authService } from "@/services/auth";
import { mealsService } from "@/services/meals";
import { vitalsService } from "@/services/vitals";

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
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          navigate("/login");
          return;
        }

        setUserId(user.id);
        setFormData({
          name: user.name || "",
          age: user.age?.toString() || "",
          weight: user.weight?.toString() || "",
          diabetes: !!user.diabetes_type,
          bloodPressure: user.has_bp || false,
          heart: user.has_heart_condition || false,
          medication: false,
          autoSync: false,
          glucose: "145",
          systolic: "138",
          diastolic: "88",
          heartRate: "92",
        });

        const latestVitals = await vitalsService.getLatestVitals(user.id);
        if (latestVitals) {
          setFormData(prev => ({
            ...prev,
            glucose: latestVitals.glucose_level?.toString() || "145",
            systolic: latestVitals.bp_systolic?.toString() || "138",
            diastolic: latestVitals.bp_diastolic?.toString() || "88",
            heartRate: latestVitals.heart_rate?.toString() || "92",
          }));
        }

        const meals = await mealsService.getMealHistory(user.id, 3);
        setRecentMeals(meals);
      } catch (error) {
        console.error("Failed to load profile:", error);
        navigate("/login");
      }
    };

    loadProfile();
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.updateProfile(userId, {
        name: formData.name,
        age: parseInt(formData.age) || undefined,
        weight: parseFloat(formData.weight) || undefined,
        diabetes_type: formData.diabetes ? 'type2' : null,
        has_bp: formData.bloodPressure,
        has_heart_condition: formData.heart,
      });

      await vitalsService.saveVitals({
        user_id: userId,
        glucose_level: parseFloat(formData.glucose),
        bp_systolic: parseInt(formData.systolic),
        bp_diastolic: parseInt(formData.diastolic),
        heart_rate: parseInt(formData.heartRate),
      });


      toast({
        title: "Profile updated",
        description: "Your health profile has been saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Could not update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
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
