import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { fetchMealPlan, regenerateMealPlan, MealPlan } from "@/lib/api";

const Planner = () => {
  const [plan, setPlan] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = async () => {
    setLoading(true);
    try {
      const data = await fetchMealPlan();
      setPlan(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load meal plan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const data = await regenerateMealPlan();
      setPlan(data);
      toast({
        title: "Plan Regenerated",
        description: "Your meal plan has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate plan",
        variant: "destructive",
      });
    } finally {
      setRegenerating(false);
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your meal plan will be downloaded as PDF",
    });
    // TODO: Implement PDF export
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">7-Day Meal Planner</h1>
          <p className="text-muted-foreground">AI-generated personalized meal plan</p>
        </div>

        <div className="flex gap-4 mb-6">
          <Button onClick={handleRegenerate} disabled={regenerating} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
            Regenerate Plan
          </Button>
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Plan
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your meal plan...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plan.map((day, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-primary">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Breakfast</h4>
                    <p className="text-sm">{day.breakfast}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Lunch</h4>
                    <p className="text-sm">{day.lunch}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Dinner</h4>
                    <p className="text-sm">{day.dinner}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && plan.length > 0 && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Weekly Summary</h3>
              <p className="text-sm text-muted-foreground">
                This meal plan is designed to help maintain stable glucose levels and support your health goals.
                All meals are balanced with appropriate portions of protein, healthy fats, and complex carbohydrates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Planner;
