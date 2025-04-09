
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
  Check, 
  X, 
  Calendar
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{formattedDate}</span>
            {isToday && <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Today</span>}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <h3 className="text-center text-lg">Did you stay sober on this day?</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleSetStatus('sober')}
              variant={currentStatus === 'sober' ? "default" : "outline"}
              className={`h-24 flex flex-col gap-2 ${currentStatus === 'sober' ? 'border-2 border-primary' : ''}`}
            >
              <Check className="h-8 w-8" />
              <span>Yes, I stayed sober</span>
            </Button>
            
            <Button
              onClick={() => handleSetStatus('not-sober')}
              variant={currentStatus === 'not-sober' ? "destructive" : "outline"}
              className={`h-24 flex flex-col gap-2 ${currentStatus === 'not-sober' ? 'border-2 border-destructive' : ''}`}
            >
              <X className="h-8 w-8" />
              <span>No, I drank</span>
            </Button>
          </div>
          
          {currentStatus !== null && (
            <p className="text-center text-sm text-muted-foreground">
              Current status: {currentStatus === 'sober' ? 'Sober day ✓' : 'Not sober ✗'}
            </p>
          )}
        </div>
        <DialogFooter>
          {currentStatus !== null && (
            <Button 
              onClick={() => handleSetStatus(null)} 
              variant="outline"
              className="w-full sm:w-auto"
            >
              Clear Status
            </Button>
          )}
          <Button 
            onClick={onClose}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DayModal;
