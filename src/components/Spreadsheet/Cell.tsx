
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  value: string;
  isFormula: boolean;
  isFocused: boolean;
  isSelected: boolean;
  format: {
    bold: boolean;
    italic: boolean;
    fontSize: number;
    color: string;
  };
  onCellValueChange: (rowIndex: number, colIndex: number, value: string) => void;
  onCellFocus: (rowIndex: number, colIndex: number) => void;
  onCellSelected: (rowIndex: number, colIndex: number, isShiftKey: boolean) => void;
}

const Cell: React.FC<CellProps> = ({
  rowIndex,
  colIndex,
  value,
  isFormula,
  isFocused,
  isSelected,
  format,
  onCellValueChange,
  onCellFocus,
  onCellSelected,
}) => {
  const [editValue, setEditValue] = useState(value);
  const cellRef = useRef<HTMLDivElement>(null);

  // Update the local state when the cell value changes from outside
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleDoubleClick = () => {
    onCellFocus(rowIndex, colIndex);
  };

  const handleClick = (e: React.MouseEvent) => {
    onCellSelected(rowIndex, colIndex, e.shiftKey);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleBlur = () => {
    onCellValueChange(rowIndex, colIndex, editValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onCellValueChange(rowIndex, colIndex, editValue);
      onCellFocus(rowIndex + 1, colIndex); // Move focus to next row
      e.preventDefault();
    } else if (e.key === 'Tab') {
      onCellValueChange(rowIndex, colIndex, editValue);
      onCellFocus(rowIndex, colIndex + 1); // Move focus to next column
      e.preventDefault();
    }
  };

  return (
    <div
      ref={cellRef}
      className={cn(
        'border border-neutral-200 min-w-[100px] h-[25px] px-2 overflow-hidden select-none relative',
        isSelected && 'bg-blue-50 outline outline-1 outline-blue-500',
        !isFocused && 'truncate'
      )}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {isFocused ? (
        <input
          className="absolute inset-0 w-full h-full px-2 outline-none"
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            fontWeight: format.bold ? 'bold' : 'normal',
            fontStyle: format.italic ? 'italic' : 'normal',
            fontSize: `${format.fontSize}px`,
            color: format.color,
          }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center truncate"
          style={{
            fontWeight: format.bold ? 'bold' : 'normal',
            fontStyle: format.italic ? 'italic' : 'normal',
            fontSize: `${format.fontSize}px`,
            color: format.color,
          }}
        >
          {isFormula ? value.startsWith('=') ? value : value : value}
        </div>
      )}
    </div>
  );
};

export default Cell;
