
import React from 'react';
import { cn } from '@/lib/utils';

interface RowHeaderProps {
  index: number;
  isSelected: boolean;
  height: number;
  onRowSelect: (rowIndex: number) => void;
  onRowResize: (rowIndex: number, height: number) => void;
}

const RowHeader: React.FC<RowHeaderProps> = ({
  index,
  isSelected,
  height,
  onRowSelect,
  onRowResize,
}) => {
  const startResizing = (event: React.MouseEvent) => {
    event.preventDefault();
    
    const startY = event.clientY;
    const startHeight = height;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newHeight = startHeight + (moveEvent.clientY - startY);
      if (newHeight >= 20) { // Minimum height
        onRowResize(index, newHeight);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={cn(
        'w-12 border-r border-b border-neutral-300 bg-neutral-100 flex items-center justify-center select-none relative',
        isSelected && 'bg-blue-100'
      )}
      style={{ height: `${height}px` }}
      onClick={() => onRowSelect(index)}
    >
      {index + 1}
      <div
        className="absolute left-0 bottom-0 w-full h-1 cursor-row-resize hover:bg-blue-500"
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default RowHeader;
