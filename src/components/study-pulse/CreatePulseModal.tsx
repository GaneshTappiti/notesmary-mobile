
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface CreatePulseModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (roomData: any) => void;
}

export const CreatePulseModal: React.FC<CreatePulseModalProps> = ({
  open,
  onClose,
  onCreate
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: true,
    duration: '1hr',
    tags: [] as string[],
    currentTag: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublic: checked }));
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && formData.currentTag.trim()) {
      e.preventDefault();
      const newTag = formData.currentTag.trim().startsWith('#') 
        ? formData.currentTag.trim() 
        : `#${formData.currentTag.trim()}`;
        
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag],
          currentTag: ''
        }));
      }
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roomData = {
      title: formData.title,
      description: formData.description,
      type: formData.isPublic ? 'public' : 'private',
      duration: formData.duration,
      tags: formData.tags,
      createdAt: new Date().toISOString()
    };
    onCreate(roomData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      isPublic: true,
      duration: '1hr',
      tags: [],
      currentTag: ''
    });
  };
  
  const predefinedTags = ['#DSA', '#Math', '#Physics', '#AI', '#CSE', '#Chemistry', '#Biology'];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create StudyPulse Room</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Room Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="E.g., DSA Doubt Solving Session"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="What will you be studying or discussing?"
              className="resize-none h-20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-1 mb-2">
              {formData.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="flex items-center gap-1 bg-purple-50"
                >
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <Input
              id="currentTag"
              name="currentTag"
              value={formData.currentTag}
              onChange={handleInputChange}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {predefinedTags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-50"
                  onClick={() => {
                    if (!formData.tags.includes(tag)) {
                      setFormData(prev => ({
                        ...prev,
                        tags: [...prev.tags, tag]
                      }));
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label htmlFor="public-switch">Public Room</Label>
              <p className="text-xs text-gray-500">
                {formData.isPublic 
                  ? 'Anyone can discover and join your room' 
                  : 'Only people with the link can join'}
              </p>
            </div>
            <Switch 
              id="public-switch"
              checked={formData.isPublic}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Room Duration</Label>
            <div className="flex gap-2">
              {['1hr', '2hr', '3hr', 'Infinite'].map(duration => (
                <Button
                  key={duration}
                  type="button"
                  variant={formData.duration === duration ? 'default' : 'outline'}
                  className={formData.duration === duration ? 'bg-purple-600' : ''}
                  onClick={() => setFormData(prev => ({ ...prev, duration }))}
                >
                  {duration}
                </Button>
              ))}
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.title.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create & Start Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
