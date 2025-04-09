
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
  const dateStr = format(date, 'yyyy-MM-dd');

  const handleSetStatus = (status: DayStatus) => {
    setDayStatus(date, status);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border border-muted bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{formattedDate}</span>
            {isToday && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Today</span>}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-end items-center gap-2 mt-2">
          {currentStatus !== null && (
            <Button 
              onClick={() => handleSetStatus(null)}
              variant="outline"
              size="icon"
              className="p-2 hover:bg-primary/10 rounded-full text-destructive border border-destructive"
              title="Remove entry"
            >
              <Trash2 size={20} />
            </Button>
          )}
          <Button 
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-primary/10 rounded-full"
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => handleSetStatus('zero')}
            variant={currentStatus === 'zero' ? "outline" : "default"}
            className={`flex-1 py-6 border-2 transition-all font-semibold rounded-lg
              ${currentStatus === 'zero' 
                ? 'border-primary bg-transparent text-primary' 
                : 'border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary'
              }`}
          >
            Zero Day
          </Button>
          
          <Button
            onClick={() => handleSetStatus('reset')}
            variant={currentStatus === 'reset' ? "outline" : "destructive"}
            className={`flex-1 py-6 border-2 transition-all font-semibold rounded-lg
              ${currentStatus === 'reset' 
                ? 'border-destructive bg-transparent text-destructive' 
                : 'border-destructive bg-destructive text-destructive-foreground hover:bg-transparent hover:text-destructive'
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
