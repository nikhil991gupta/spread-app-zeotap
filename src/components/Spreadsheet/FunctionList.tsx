
import React from 'react';

interface FunctionListProps {
  onFunctionSelect: (functionName: string) => void;
}

const FunctionList: React.FC<FunctionListProps> = ({ onFunctionSelect }) => {
  const functions = {
    Mathematical: [
      { name: 'SUM', description: 'Adds all the numbers in a range of cells' },
      { name: 'AVERAGE', description: 'Calculates the average of a range of cells' },
      { name: 'MAX', description: 'Returns the maximum value from a range of cells' },
      { name: 'MIN', description: 'Returns the minimum value from a range of cells' },
      { name: 'COUNT', description: 'Counts the number of cells containing numerical values' },
    ],
    'Data Quality': [
      { name: 'TRIM', description: 'Removes leading and trailing whitespace from a cell' },
      { name: 'UPPER', description: 'Converts the text in a cell to uppercase' },
      { name: 'LOWER', description: 'Converts the text in a cell to lowercase' },
      { name: 'REMOVE_DUPLICATES', description: 'Removes duplicate rows from a selected range' },
      { name: 'FIND_AND_REPLACE', description: 'Finds and replaces specific text within a range' },
    ],
  };

  return (
    <div className="border border-neutral-300 rounded bg-white shadow-lg w-64 max-h-96 overflow-y-auto">
      {Object.entries(functions).map(([category, funcs]) => (
        <div key={category} className="p-2">
          <div className="font-bold text-sm text-neutral-700 mb-1">{category}</div>
          {funcs.map((func) => (
            <div
              key={func.name}
              className="p-1 hover:bg-neutral-100 cursor-pointer text-sm rounded"
              onClick={() => onFunctionSelect(func.name)}
              title={func.description}
            >
              <div className="font-medium">{func.name}</div>
              <div className="text-xs text-neutral-500 truncate">{func.description}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FunctionList;
