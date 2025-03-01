
import React from 'react';
import { Bold, Italic, Type, Trash2, Plus, Search, List, RefreshCw } from 'lucide-react';

interface ToolbarProps {
  onBoldClick: () => void;
  onItalicClick: () => void;
  onFontSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  onFindReplace: () => void;
  onRemoveDuplicates: () => void;
  currentFontSize: number;
  currentColor: string;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBoldClick,
  onItalicClick,
  onFontSizeChange,
  onColorChange,
  onAddRow,
  onAddColumn,
  onDeleteRow,
  onDeleteColumn,
  onFindReplace,
  onRemoveDuplicates,
  currentFontSize,
  currentColor,
}) => {
  return (
    <div className="bg-neutral-100 border-b border-neutral-300 p-2 flex items-center space-x-2">
      <div className="flex space-x-1 mr-4">
        <button
          className="p-1 rounded hover:bg-neutral-200"
          onClick={onBoldClick}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          className="p-1 rounded hover:bg-neutral-200"
          onClick={onItalicClick}
          title="Italic"
        >
          <Italic size={16} />
        </button>
      </div>

      <div className="flex items-center space-x-2 mr-4">
        <Type size={16} />
        <select
          className="border border-neutral-300 rounded p-1 text-sm"
          value={currentFontSize}
          onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
        >
          {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-6 h-6 border border-neutral-300 rounded"
        />
      </div>

      <div className="h-6 border-l border-neutral-300 mx-2"></div>

      <div className="flex space-x-1 mr-4">
        <button
          className="p-1 rounded hover:bg-neutral-200 flex items-center"
          onClick={onAddRow}
          title="Add Row"
        >
          <Plus size={16} className="mr-1" /> Row
        </button>
        <button
          className="p-1 rounded hover:bg-neutral-200 flex items-center"
          onClick={onAddColumn}
          title="Add Column"
        >
          <Plus size={16} className="mr-1" /> Column
        </button>
      </div>

      <div className="flex space-x-1 mr-4">
        <button
          className="p-1 rounded hover:bg-neutral-200 flex items-center"
          onClick={onDeleteRow}
          title="Delete Row"
        >
          <Trash2 size={16} className="mr-1" /> Row
        </button>
        <button
          className="p-1 rounded hover:bg-neutral-200 flex items-center"
          onClick={onDeleteColumn}
          title="Delete Column"
        >
          <Trash2 size={16} className="mr-1" /> Column
        </button>
      </div>

      <div className="h-6 border-l border-neutral-300 mx-2"></div>

      <button
        className="p-1 rounded hover:bg-neutral-200 flex items-center"
        onClick={onFindReplace}
        title="Find and Replace"
      >
        <Search size={16} className="mr-1" /> Find & Replace
      </button>

      <button
        className="p-1 rounded hover:bg-neutral-200 flex items-center"
        onClick={onRemoveDuplicates}
        title="Remove Duplicates"
      >
        <List size={16} className="mr-1" /> Remove Duplicates
      </button>

      <div className="h-6 border-l border-neutral-300 mx-2"></div>

      <button
        className="p-1 rounded hover:bg-neutral-200 flex items-center"
        title="Refresh Formulas"
      >
        <RefreshCw size={16} className="mr-1" /> Refresh
      </button>
    </div>
  );
};

export default Toolbar;
