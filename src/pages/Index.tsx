
import React from 'react';
import Spreadsheet from '../components/Spreadsheet/Spreadsheet';

const Index = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="py-2 px-4 bg-white border-b border-neutral-300 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl font-medium mr-2">SpreadApp</div>
          <div className="text-xs bg-neutral-100 px-2 py-1 rounded">Google Sheets Clone</div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-100">
            Save
          </button>
          <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-100">
            Load
          </button>
        </div>
      </div>
      <Spreadsheet />
    </div>
  );
};

export default Index;
