
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  user_id: string;
};

const Todos: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Fetch todos
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos', user?.id, filter],
    queryFn: async () => {
      let query = supabase
        .from('todos')
        .select('*')
        .eq('user_id', user?.id);

      if (filter === 'active') {
        query = query.eq('completed', false);
      } else if (filter === 'completed') {
        query = query.eq('completed', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add todo mutation
  const addTodoMutation = useMutation({
    mutationFn: async (task: string) => {
      const { data, error } = await supabase
        .from('todos')
        .insert({ 
          task, 
          user_id: user?.id, 
          completed: false,
          priority: 'medium' 
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTask('');
      toast({
        title: 'Todo Added',
        description: 'Your new task has been created.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add todo.',
        variant: 'destructive'
      });
    }
  });

  // Toggle todo mutation
  const toggleTodoMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string, completed: boolean }) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ completed })
        .eq('id', id);
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Todo Deleted',
        description: 'Your task has been removed.',
      });
    }
  });

  const handleAddTodo = () => {
    if (newTask.trim()) {
      addTodoMutation.mutate(newTask.trim());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Todo List</h1>

      <div className="flex mb-4 space-x-2">
        <Input 
          placeholder="Add a new task" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          className="flex-grow"
        />
        <Button 
          onClick={handleAddTodo} 
          disabled={!newTask.trim()}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="flex space-x-2 mb-4">
        {['all', 'active', 'completed'].map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? 'default' : 'outline'}
            onClick={() => setFilter(filterOption as typeof filter)}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-2">
          {todos?.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet</p>
          ) : (
            todos?.map((todo) => (
              <div 
                key={todo.id} 
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodoMutation.mutate({ 
                      id: todo.id, 
                      completed: !todo.completed 
                    })}
                  />
                  <span 
                    className={`${
                      todo.completed 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {todo.task}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => deleteTodoMutation.mutate(todo.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Todos;
