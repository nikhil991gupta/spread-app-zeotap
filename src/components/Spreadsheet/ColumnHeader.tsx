
import React from 'react';
import { cn } from '@/lib/utils';

interface ColumnHeaderProps {
  index: number;
  label: string;
  isSelected: boolean;
  width: number;
  onColumnSelect: (colIndex: number) => void;
  onColumnResize: (colIndex: number, width: number) => void;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  index,
  label,
  isSelected,
  width,
  onColumnSelect,
  onColumnResize,
}) => {
  const startResizing = (event: React.MouseEvent) => {
    event.preventDefault();
    
    const startX = event.clientX;
    const startWidth = width;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth >= 50) { // Minimum width
        onColumnResize(index, newWidth);
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
        'h-8 border-b border-r border-neutral-300 bg-neutral-100 flex items-center justify-center select-none relative',
        isSelected && 'bg-blue-100'
      )}
      style={{ width: `${width}px` }}
      onClick={() => onColumnSelect(index)}
    >
      {label}
      <div
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-500"
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default ColumnHeader;
