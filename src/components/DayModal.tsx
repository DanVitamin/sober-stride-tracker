
import React from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { DayStatus, useSoberData } from '@/context/SoberContext';
import { Trash2 } from 'lucide-react';

interface DayModalProps {
  date: Date | null;
  isOpen: boolean;
  onClose: () => void;
}

const DayModal: React.FC<DayModalProps> = ({ date, isOpen, onClose }) => {
  const { getDayStatus, setDayStatus } = useSoberData();
  
  if (!date || !isOpen) return null;
  
  const currentStatus = getDayStatus(date);
  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
  const isToday = format(new Date(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');

  const handleSetStatus = (status: DayStatus) => {
    setDayStatus(date, status);
    onClose();
  };

  return (
    <div className="mt-8 py-4 border-t border-zero-ui-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-medium">{formattedDate}</p>
          {isToday && <span className="text-xs text-zero-text-secondary">Today</span>}
        </div>
        
        {currentStatus !== null && (
          <Button 
            onClick={() => handleSetStatus(null)}
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:bg-zero-ui-hover"
            title="Remove entry"
          >
            <Trash2 size={18} />
          </Button>
        )}
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => handleSetStatus('zero')}
          className={`flex-1 py-5 transition-all font-medium rounded-lg hover:opacity-90 ${
            currentStatus === 'zero'
              ? 'bg-transparent border border-zero-accent-primary text-zero-accent-primary'
              : 'bg-zero-accent-primary text-black'
          }`}
        >
          Zero Day
        </Button>
        
        <Button
          onClick={() => handleSetStatus('reset')}
          className={`flex-1 py-5 transition-all font-medium rounded-lg hover:opacity-90 ${
            currentStatus === 'reset'
              ? 'bg-transparent border border-zero-accent-reset text-zero-accent-reset'
              : 'bg-zero-accent-reset text-white'
          }`}
        >
          Reset Day
        </Button>
      </div>
    </div>
  );
};

export default DayModal;
