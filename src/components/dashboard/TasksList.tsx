
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  title: string;
  subject: string;
  due: string;
  priority: "high" | "medium" | "low";
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "low":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const TasksList = () => {
  const tasks: Task[] = [
    {
      title: "Physics Assignment Due",
      subject: "Physics",
      due: "2:00 PM Today",
      priority: "high"
    },
    {
      title: "Math Group Study",
      subject: "Math",
      due: "4:00 PM Tomorrow",
      priority: "medium"
    },
    {
      title: "Chemistry Lab Report",
      subject: "Chemistry",
      due: "Friday, 5:00 AM",
      priority: "low"
    },
    {
      title: "Biology Research Paper",
      subject: "Biology",
      due: "Next Monday",
      priority: "medium"
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">Tasks</CardTitle>
        <Button size="sm" className="h-8">
          <Plus className="mr-1 h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{task.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-normal">
                    {task.subject}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{task.due}</span>
                </div>
              </div>
              <Badge className={`${getPriorityColor(task.priority)} capitalize`}>
                {task.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
