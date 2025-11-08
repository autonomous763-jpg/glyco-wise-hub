import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Upload, Calendar, MessageSquare, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import VitalCard from "@/components/VitalCard";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchDashboard, DashboardData } from "@/lib/api";

const Dashboard = () => {
  const [userName, setUserName] = useState("User");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("glycocare_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userData);
    setUserName(user.name || user.email.split("@")[0]);

    // Fetch dashboard data
    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboard("mock123");
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for charts
  const glucoseData = [
    { time: "8AM", value: 95 },
    { time: "10AM", value: 142 },
    { time: "12PM", value: 125 },
    { time: "2PM", value: 138 },
    { time: "4PM", value: 115 },
    { time: "6PM", value: 148 },
    { time: "8PM", value: 122 },
  ];

  const bpData = [
    { day: "Mon", systolic: 125, diastolic: 82 },
    { day: "Tue", systolic: 132, diastolic: 85 },
    { day: "Wed", systolic: 128, diastolic: 83 },
    { day: "Thu", systolic: 135, diastolic: 88 },
    { day: "Fri", systolic: 130, diastolic: 84 },
  ];

  const mealData = [
    { name: "Healthy", value: 65, color: "hsl(var(--success))" },
    { name: "Risky", value: 35, color: "hsl(var(--destructive))" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userName} 👋</h1>
          <p className="text-muted-foreground">Here's your health summary for today</p>
        </div>

        {/* Vital Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your health data...</p>
          </div>
        ) : dashboardData ? (
          <>
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <VitalCard
                title="Blood Glucose"
                value={dashboardData.glucose}
                unit="mg/dL"
                icon={TrendingUp}
                status={
                  dashboardData.glucose < 140
                    ? "normal"
                    : dashboardData.glucose < 180
                    ? "borderline"
                    : "high"
                }
                target="< 140 mg/dL"
              />
              <VitalCard
                title="Blood Pressure"
                value={`${dashboardData.systolic}/${dashboardData.diastolic}`}
                unit="mmHg"
                icon={Heart}
                status={
                  dashboardData.systolic < 120 && dashboardData.diastolic < 80
                    ? "normal"
                    : dashboardData.systolic < 140 && dashboardData.diastolic < 90
                    ? "borderline"
                    : "high"
                }
                target="< 120/80"
              />
              <VitalCard
                title="Heart Rate"
                value={dashboardData.heartRate}
                unit="BPM"
                icon={Activity}
                status={
                  dashboardData.heartRate >= 60 && dashboardData.heartRate <= 100
                    ? "normal"
                    : "borderline"
                }
                target="60-100 BPM"
              />
            </div>

            {/* Latest Meal Summary */}
            {dashboardData.latestMeal && (
              <Card className="mb-8 border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📊 Latest Meal Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Dish</p>
                      <p className="font-semibold">{dashboardData.latestMeal.dish}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Portion</p>
                      <p className="font-semibold">{dashboardData.latestMeal.portion}g</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Glucose Impact</p>
                      <p className="font-semibold text-warning">
                        +{dashboardData.latestMeal.glucoseDelta} mg/dL
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-semibold">
                        {new Date(dashboardData.latestMeal.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : null}

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Post-Meal Glucose Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={glucoseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} name="Glucose (mg/dL)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure Variation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={bpData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend />
                  <Bar dataKey="systolic" fill="hsl(var(--destructive))" name="Systolic" />
                  <Bar dataKey="diastolic" fill="hsl(var(--success))" name="Diastolic" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meal Health Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={mealData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mealData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-center">
            <CardContent className="space-y-4 pt-6">
              <h3 className="text-xl font-semibold">Quick Actions</h3>
              <Link to="/analyze" className="block">
                <Button className="w-full justify-start gap-2" size="lg">
                  <Upload className="h-5 w-5" />
                  Upload New Meal
                </Button>
              </Link>
              <Link to="/planner" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <Calendar className="h-5 w-5" />
                  View 7-Day Summary
                </Button>
              </Link>
              <Link to="/chat" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <MessageSquare className="h-5 w-5" />
                  Chat with AI Coach
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
