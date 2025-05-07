
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

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
  const [step, setStep] = useState(1);
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
    setStep(1);
  };
  
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const predefinedTags = ['#DSA', '#Math', '#Physics', '#AI', '#CSE', '#Chemistry', '#Biology', '#ExamPrep', '#LateNightStudy'];
  
  const handleClose = () => {
    onClose();
    setStep(1);
    setFormData({
      title: '',
      description: '',
      isPublic: true,
      duration: '1hr',
      tags: [],
      currentTag: ''
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create StudyPulse Room</DialogTitle>
        </DialogHeader>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
            <div className="h-1 w-8 bg-gray-200">
              <div className={`h-full bg-purple-600 ${step >= 2 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
            </div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
            <div className="h-1 w-8 bg-gray-200">
              <div className={`h-full bg-purple-600 ${step >= 3 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
            </div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Step 1: Room Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
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
                  maxLength={120}
                />
                <div className="text-xs text-right text-gray-500">
                  {formData.description.length}/120 characters
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  disabled={!formData.title.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Tags & Type */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
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
                      className={`cursor-pointer hover:bg-purple-50 ${formData.tags.includes(tag) ? 'bg-purple-100' : ''}`}
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
              
              <div className="flex justify-between items-center mt-4">
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
              
              <div className="pt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={formData.tags.length === 0}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Room Duration */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="duration">Room Duration</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['30min', '1hr', '2hr', 'Until Closed'].map(duration => (
                    <Button
                      key={duration}
                      type="button"
                      variant={formData.duration === duration ? 'default' : 'outline'}
                      className={`flex items-center justify-center py-6 ${formData.duration === duration ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, duration }))}
                    >
                      {duration}
                      {formData.duration === duration && <Check className="ml-2 h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 gap-2"
                >
                  <span>Create & Start Room</span>
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
