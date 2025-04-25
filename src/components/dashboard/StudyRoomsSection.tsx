
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { StudyRoomCard } from './StudyRoomCard';

interface StudyRoom {
  id: string;
  title: string;
  participants: number;
  date: string;
  status: string;
  duration: string;
  avatars: string[];
}

interface StudyRoomsSectionProps {
  rooms: StudyRoom[];
  onViewAll: () => void;
}

export const StudyRoomsSection = ({ rooms, onViewAll }: StudyRoomsSectionProps) => {
  return (
    <Card className="border-none shadow-sm overflow-hidden bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users size={20} className="text-gray-500" />
            Recent Study Rooms
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
            className="text-blue-600 border-blue-200 hover:border-blue-400"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <StudyRoomCard key={room.id} {...room} />
        ))}
      </div>
    </Card>
  );
};
