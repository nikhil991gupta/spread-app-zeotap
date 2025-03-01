
import React, { useState } from 'react';

interface FindReplaceDialogProps {
  onFind: (findText: string) => void;
  onReplace: (findText: string, replaceText: string) => void;
  onReplaceAll: (findText: string, replaceText: string) => void;
  onClose: () => void;
}

const FindReplaceDialog: React.FC<FindReplaceDialogProps> = ({
  onFind,
  onReplace,
  onReplaceAll,
  onClose,
}) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Find and Replace</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="find" className="block text-sm font-medium text-neutral-700 mb-1">
              Find
            </label>
            <input
              id="find"
              type="text"
              className="w-full border border-neutral-300 rounded px-3 py-2"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Text to find"
            />
          </div>

          <div>
            <label htmlFor="replace" className="block text-sm font-medium text-neutral-700 mb-1">
              Replace with
            </label>
            <input
              id="replace"
              type="text"
              className="w-full border border-neutral-300 rounded px-3 py-2"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              onClick={() => onFind(findText)}
              disabled={!findText}
            >
              Find
            </button>
            <button
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              onClick={() => onReplace(findText, replaceText)}
              disabled={!findText}
            >
              Replace
            </button>
            <button
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => onReplaceAll(findText, replaceText)}
              disabled={!findText}
            >
              Replace All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindReplaceDialog;
