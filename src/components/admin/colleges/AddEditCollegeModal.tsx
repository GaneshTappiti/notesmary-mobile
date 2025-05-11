
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'College name must be at least 3 characters'),
  domain: z.string().min(3, 'Domain must be at least 3 characters').includes('.', { message: 'Domain must include a dot (.)' }),
  adminEmail: z.string().email('Please enter a valid email'),
  status: z.enum(['active', 'inactive']),
});

type FormValues = z.infer<typeof formSchema>;

interface AddEditCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeData?: any;
}

export const AddEditCollegeModal: React.FC<AddEditCollegeModalProps> = ({ 
  isOpen, 
  onClose, 
  collegeData 
}) => {
  const { toast } = useToast();
  const isEditing = !!collegeData;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing ? {
      name: collegeData.name,
      domain: collegeData.domain,
      adminEmail: collegeData.adminEmail,
      status: collegeData.status
    } : {
      name: '',
      domain: '',
      adminEmail: '',
      status: 'active'
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real implementation, this would make an API call to create/update the college
      console.log('Form submitted:', data);
      
      toast({
        title: isEditing ? "College Updated" : "College Created",
        description: isEditing 
          ? `${data.name} has been successfully updated.` 
          : `${data.name} has been successfully added.`,
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit College' : 'Add New College'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the details for this college.' 
              : 'Fill out the form below to add a new college to the system.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter college name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Full name of the college or university
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="example.edu" {...field} />
                  </FormControl>
                  <FormDescription>
                    Educational domain used for identifying college users
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="adminEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@example.edu" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email for the college administrator
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set whether this college is active in the system
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update College' : 'Add College'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
