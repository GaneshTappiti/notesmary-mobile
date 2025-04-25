
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckSquare, Plus } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  time: string;
  subject: string;
  priority: string;
  completed: boolean;
}

interface TasksSectionProps {
  tasks: Task[];
  onNewTask: () => void;
}

export const TasksSection = ({ tasks, onNewTask }: TasksSectionProps) => {
  return (
    <Card className="border-none shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold flex items-center gap-2">
            <CheckSquare size={18} className="text-gray-500" />
            Tasks
          </h3>
          <Button size="sm" variant="ghost" onClick={onNewTask}>
            <Plus size={16} className="mr-1" />
            Add Task
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border ${
                task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{task.time}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {task.subject}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === 'high' ? 'bg-red-50 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
