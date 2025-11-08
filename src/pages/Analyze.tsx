import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Upload, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Analyze = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [vitals, setVitals] = useState({
    glucose: "145",
    systolic: "138",
    diastolic: "88",
    heartRate: "92",
  });
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    
    // Mock analysis delay
    setTimeout(() => {
      setResult({
        dish: "Chicken Biryani",
        portion: 250,
        predictedDelta: 14.6,
        confidence: 0.89,
        advice: "Your glucose is moderately elevated and BP slightly high. This meal is high in carbs and sodium. Consider brown rice next time and reduce salt. Take a 10-minute walk after eating to help regulate glucose.",
        status: "borderline",
      });
      setAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "Meal analyzed successfully",
      });
    }, 2000);
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meal Analyzer</h1>
          <p className="text-muted-foreground">Upload a meal photo for instant AI analysis</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Meal Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <Label htmlFor="meal-upload" className="cursor-pointer">
                  <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                  <p className="text-sm text-muted-foreground mt-2">PNG, JPG up to 10MB</p>
                </Label>
                <Input
                  id="meal-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>

              {analyzing && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Analyzing your meal...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Vitals */}
          <Card>
            <CardHeader>
              <CardTitle>Current Vitals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="glucose">Current Glucose (mg/dL)</Label>
                <Input
                  id="glucose"
                  type="number"
                  value={vitals.glucose}
                  onChange={(e) => setVitals({ ...vitals, glucose: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolic">Systolic (mmHg)</Label>
                  <Input
                    id="systolic"
                    type="number"
                    value={vitals.systolic}
                    onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    value={vitals.diastolic}
                    onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  value={vitals.heartRate}
                  onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {result && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Detected Dish</p>
                  <p className="text-2xl font-semibold">{result.dish}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Portion Size</p>
                  <p className="text-2xl font-semibold">{result.portion}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Predicted Glucose Delta</p>
                  <p className="text-2xl font-semibold text-warning flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    +{result.predictedDelta} mg/dL
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  result.status === "borderline"
                    ? "bg-warning/10 border border-warning/20"
                    : "bg-success/10 border border-success/20"
                }`}
              >
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  {result.status === "borderline" ? "⚠️" : "✅"} AI Health Advice
                </h3>
                <p className="text-sm">{result.advice}</p>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">Save Meal</Button>
                <Button variant="outline" className="flex-1">
                  Voice Advice
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Analyze;
