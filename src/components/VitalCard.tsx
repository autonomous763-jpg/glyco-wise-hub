import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface VitalCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  status: "normal" | "borderline" | "high";
  target: string;
}

const VitalCard = ({ title, value, unit, icon: Icon, status, target }: VitalCardProps) => {
  const statusColors = {
    normal: "bg-success/10 border-success/20 text-success",
    borderline: "bg-warning/10 border-warning/20 text-warning",
    high: "bg-destructive/10 border-destructive/20 text-destructive",
  };

  const statusEmojis = {
    normal: "✅",
    borderline: "⚠️",
    high: "🔴",
  };

  return (
    <Card className={`${statusColors[status]} border-2 transition-all hover:shadow-lg`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-card">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-2xl">{statusEmojis[status]}</span>
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <p className="text-xs text-muted-foreground">Target: {target}</p>
      </CardContent>
    </Card>
  );
};

export default VitalCard;
