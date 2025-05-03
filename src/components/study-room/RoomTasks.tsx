
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, CheckSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
}

interface RoomTasksProps {
  roomId: string;
}

export const RoomTasks = ({ roomId }: RoomTasksProps) => {
  const { toast } = useToast();
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review Chapter 5', completed: true },
    { id: '2', title: 'Complete practice problems 1-10', completed: false },
    { id: '3', title: 'Prepare questions for next session', completed: false },
    { id: '4', title: 'Share summary notes with group', completed: false },
  ]);
  
  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    
    toast({
      title: "Task Added",
      description: "New task has been added to the list",
    });
  };
  
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    toast({
      title: "Task Removed",
      description: "Task has been removed from the list",
    });
  };
  
  return (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-indigo-600" />
          <h2 className="font-medium">Study Tasks</h2>
        </div>
        <div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => {
              toast({
                title: "Tasks Exported",
                description: "Tasks have been exported as a text file",
              });
            }}
          >
            Export Tasks
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6">
        <Input 
          placeholder="Add a new task..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        <Button 
          onClick={addTask}
          disabled={!newTask.trim()}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <Checkbox 
              id={`task-${task.id}`} 
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            />
            <label 
              htmlFor={`task-${task.id}`}
              className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
            >
              {task.title}
            </label>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckSquare className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p>No tasks yet. Add your first study task!</p>
          </div>
        )}
      </div>
    </div>
  );
};
