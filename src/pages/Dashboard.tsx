import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, TrendingUp, Upload, Calendar, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import VitalCard from "@/components/VitalCard";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("glycocare_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userData);
    setUserName(user.name || user.email.split("@")[0]);
  }, [navigate]);

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userName} 👋</h1>
          <p className="text-muted-foreground">Here's your health summary for today</p>
        </div>

        {/* Vital Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <VitalCard
            title="Blood Glucose"
            value={145}
            unit="mg/dL"
            icon={TrendingUp}
            status="borderline"
            target="< 140 mg/dL"
          />
          <VitalCard
            title="Blood Pressure"
            value="138/88"
            unit="mmHg"
            icon={Heart}
            status="borderline"
            target="< 120/80"
          />
          <VitalCard
            title="Heart Rate"
            value={92}
            unit="BPM"
            icon={Activity}
            status="normal"
            target="60-100 BPM"
          />
        </div>

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
              <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                <Calendar className="h-5 w-5" />
                View 7-Day Summary
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                <MessageSquare className="h-5 w-5" />
                Chat with AI Coach
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
