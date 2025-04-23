
import { FileText, Users, Brain } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export const StatisticsSection = () => {
  const stats = [
    {
      label: "Total Notes",
      value: "53",
      change: "+5%",
      icon: <FileText className="h-4 w-4 text-blue-500" />
    },
    {
      label: "Study Sessions",
      value: "28",
      change: "+14%",
      icon: <Users className="h-4 w-4 text-green-500" />
    },
    {
      label: "AI Answers",
      value: "152",
      change: "+25%",
      icon: <Brain className="h-4 w-4 text-purple-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span className="ml-2 text-xs font-medium text-green-500">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
