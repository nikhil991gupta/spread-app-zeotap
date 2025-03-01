
import React, { useState, useEffect } from 'react';

interface FormulaBarProps {
  value: string;
  onChange: (value: string) => void;
  activeCellLabel: string;
}

const FormulaBar: React.FC<FormulaBarProps> = ({ value, onChange, activeCellLabel }) => {
  const [formula, setFormula] = useState(value);

  useEffect(() => {
    setFormula(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChange(formula);
    }
  };

  const handleBlur = () => {
    onChange(formula);
  };

  return (
    <div className="bg-white border-b border-neutral-300 p-2 flex items-center">
      <div className="bg-neutral-100 border border-neutral-300 rounded px-2 py-1 mr-2 w-16 text-center">
        {activeCellLabel}
      </div>
      <div className="flex-1">
        <input
          type="text"
          className="w-full border border-neutral-300 rounded px-2 py-1"
          value={formula}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Enter a value or formula (e.g., =SUM(A1:A5))"
        />
      </div>
    </div>
  );
};

export default FormulaBar;
