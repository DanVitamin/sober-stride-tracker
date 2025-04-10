
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { DayStatus, useSoberData } from '@/context/SoberContext';

interface DayModalProps {
  date: Date | null;
  isOpen: boolean;
  onClose: () => void;
}

const DayModal: React.FC<DayModalProps> = ({ date, isOpen, onClose }) => {
  const { getDayStatus, setDayStatus } = useSoberData();
  
  if (!date) return null;
  
  const currentStatus = getDayStatus(date);
  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
  const isToday = format(new Date(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');

  const handleSetStatus = (status: DayStatus) => {
    setDayStatus(date, status);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-none bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{formattedDate}</span>
            {isToday && <span className="text-xs px-2 py-0.5 rounded-full bg-zero-accent-primary text-black">Today</span>}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-end items-center gap-2 mt-2">
          {currentStatus !== null && (
            <Button 
              onClick={() => handleSetStatus(null)}
              variant="outline"
              size="icon"
              className="p-2 rounded-full text-muted-foreground"
              title="Remove entry"
            >
              <Trash2 size={18} />
            </Button>
          )}
          <Button 
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="p-2 rounded-full"
          >
            <X size={18} />
          </Button>
        </div>
        
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => handleSetStatus('zero')}
            className={`flex-1 py-5 transition-all font-medium rounded-lg ${
              currentStatus === 'zero'
                ? 'bg-transparent border border-zero-accent-primary text-zero-accent-primary'
                : 'bg-zero-accent-primary text-black hover:opacity-90'
            }`}
          >
            Zero Day
          </Button>
          
          <Button
            onClick={() => handleSetStatus('reset')}
            className={`flex-1 py-5 transition-all font-medium rounded-lg ${
              currentStatus === 'reset'
                ? 'bg-transparent border border-zero-accent-reset text-zero-accent-reset'
                : 'bg-zero-accent-reset text-white hover:opacity-90'
            }`}
          >
            Reset Day
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayModal;
