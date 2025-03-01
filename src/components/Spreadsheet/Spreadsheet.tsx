
import React, { useState, useEffect, useCallback } from 'react';
import Cell from './Cell';
import ColumnHeader from './ColumnHeader';
import RowHeader from './RowHeader';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';
import FunctionList from './FunctionList';
import FindReplaceDialog from './FindReplaceDialog';
import { evaluateFormula, removeDuplicates, findAndReplace, getCellLabel } from '../../utils/spreadsheetFunctions';

// Default number of rows and columns
const DEFAULT_ROWS = 100;
const DEFAULT_COLS = 26;

const Spreadsheet: React.FC = () => {
  // Grid state
  const [data, setData] = useState<string[][]>(() => {
    return Array(DEFAULT_ROWS).fill('').map(() => Array(DEFAULT_COLS).fill(''));
  });
  
  // Cell formatting state
  const [cellFormats, setCellFormats] = useState<Record<string, { bold: boolean; italic: boolean; fontSize: number; color: string }>>(
    {}
  );
  
  // Cell selection state
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectionRange, setSelectionRange] = useState<{
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
  } | null>(null);
  
  // UI state
  const [rowHeights, setRowHeights] = useState<number[]>(Array(DEFAULT_ROWS).fill(25));
  const [colWidths, setColWidths] = useState<number[]>(Array(DEFAULT_COLS).fill(100));
  const [showFunctionList, setShowFunctionList] = useState(false);
  const [showFindReplaceDialog, setShowFindReplaceDialog] = useState(false);
  
  // Formatting state
  const [currentFontSize, setCurrentFontSize] = useState(12);
  const [currentColor, setCurrentColor] = useState('#000000');
  
  // Get column label (A, B, C, ...)
  const getColumnLabel = (index: number) => {
    return String.fromCharCode(65 + index);
  };
  
  // Get cell format
  const getCellFormat = (rowIndex: number, colIndex: number) => {
    const key = `${rowIndex},${colIndex}`;
    return (
      cellFormats[key] || {
        bold: false,
        italic: false,
        fontSize: 12,
        color: '#000000',
      }
    );
  };
  
  // Get cell value
  const getCellValue = useCallback(
    (rowIndex: number, colIndex: number): string => {
      if (rowIndex < 0 || rowIndex >= data.length || colIndex < 0 || colIndex >= data[0].length) {
        return '';
      }
      return data[rowIndex][colIndex];
    },
    [data]
  );
  
  // Get cell by reference (e.g., A1, B2)
  const getCellByReference = useCallback(
    (cellRef: string): string => {
      const colStr = cellRef.match(/[A-Z]+/)?.[0] || '';
      const rowStr = cellRef.match(/[0-9]+/)?.[0] || '';
      
      if (!colStr || !rowStr) return '';
      
      let colIndex = 0;
      for (let i = 0; i < colStr.length; i++) {
        colIndex = colIndex * 26 + (colStr.charCodeAt(i) - 64);
      }
      colIndex -= 1;
      
      const rowIndex = parseInt(rowStr) - 1;
      return getCellValue(rowIndex, colIndex);
    },
    [getCellValue]
  );
  
  // Update cell value
  const updateCellValue = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };
  
  // Handle cell focus
  const handleCellFocus = (rowIndex: number, colIndex: number) => {
    if (rowIndex >= 0 && rowIndex < data.length && colIndex >= 0 && colIndex < data[0].length) {
      setFocusedCell({ row: rowIndex, col: colIndex });
      setActiveCell({ row: rowIndex, col: colIndex });
      setSelectionRange({
        startRow: rowIndex,
        startCol: colIndex,
        endRow: rowIndex,
        endCol: colIndex,
      });
    }
  };
  
  // Handle cell selection
  const handleCellSelected = (rowIndex: number, colIndex: number, isShiftKey: boolean) => {
    if (rowIndex >= 0 && rowIndex < data.length && colIndex >= 0 && colIndex < data[0].length) {
      if (isShiftKey && activeCell) {
        setSelectionRange({
          startRow: Math.min(activeCell.row, rowIndex),
          startCol: Math.min(activeCell.col, colIndex),
          endRow: Math.max(activeCell.row, rowIndex),
          endCol: Math.max(activeCell.col, colIndex),
        });
      } else {
        setActiveCell({ row: rowIndex, col: colIndex });
        setSelectionRange({
          startRow: rowIndex,
          startCol: colIndex,
          endRow: rowIndex,
          endCol: colIndex,
        });
      }
      
      setFocusedCell(null);
    }
  };
  
  // Handle column selection
  const handleColumnSelect = (colIndex: number) => {
    setSelectionRange({
      startRow: 0,
      startCol: colIndex,
      endRow: data.length - 1,
      endCol: colIndex,
    });
    setActiveCell({ row: 0, col: colIndex });
    setFocusedCell(null);
  };
  
  // Handle row selection
  const handleRowSelect = (rowIndex: number) => {
    setSelectionRange({
      startRow: rowIndex,
      startCol: 0,
      endRow: rowIndex,
      endCol: data[0].length - 1,
    });
    setActiveCell({ row: rowIndex, col: 0 });
    setFocusedCell(null);
  };
  
  // Handle column resize
  const handleColumnResize = (colIndex: number, newWidth: number) => {
    const newColWidths = [...colWidths];
    newColWidths[colIndex] = newWidth;
    setColWidths(newColWidths);
  };
  
  // Handle row resize
  const handleRowResize = (rowIndex: number, newHeight: number) => {
    const newRowHeights = [...rowHeights];
    newRowHeights[rowIndex] = newHeight;
    setRowHeights(newRowHeights);
  };
  
  // Toolbar handlers
  const handleBoldClick = () => {
    if (!activeCell) return;
    
    const { row, col } = activeCell;
    const key = `${row},${col}`;
    const currentFormat = getCellFormat(row, col);
    
    setCellFormats({
      ...cellFormats,
      [key]: {
        ...currentFormat,
        bold: !currentFormat.bold,
      },
    });
  };
  
  const handleItalicClick = () => {
    if (!activeCell) return;
    
    const { row, col } = activeCell;
    const key = `${row},${col}`;
    const currentFormat = getCellFormat(row, col);
    
    setCellFormats({
      ...cellFormats,
      [key]: {
        ...currentFormat,
        italic: !currentFormat.italic,
      },
    });
  };
  
  const handleFontSizeChange = (size: number) => {
    setCurrentFontSize(size);
    
    if (!activeCell) return;
    
    const { row, col } = activeCell;
    const key = `${row},${col}`;
    const currentFormat = getCellFormat(row, col);
    
    setCellFormats({
      ...cellFormats,
      [key]: {
        ...currentFormat,
        fontSize: size,
      },
    });
  };
  
  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    
    if (!activeCell) return;
    
    const { row, col } = activeCell;
    const key = `${row},${col}`;
    const currentFormat = getCellFormat(row, col);
    
    setCellFormats({
      ...cellFormats,
      [key]: {
        ...currentFormat,
        color,
      },
    });
  };
  
  const handleAddRow = () => {
    const newRow = Array(data[0].length).fill('');
    const newData = [...data];
    const insertIndex = activeCell ? activeCell.row + 1 : data.length;
    newData.splice(insertIndex, 0, newRow);
    setData(newData);
    
    const newRowHeights = [...rowHeights];
    newRowHeights.splice(insertIndex, 0, 25);
    setRowHeights(newRowHeights);
  };
  
  const handleAddColumn = () => {
    const insertIndex = activeCell ? activeCell.col + 1 : data[0].length;
    const newData = data.map(row => {
      const newRow = [...row];
      newRow.splice(insertIndex, 0, '');
      return newRow;
    });
    setData(newData);
    
    const newColWidths = [...colWidths];
    newColWidths.splice(insertIndex, 0, 100);
    setColWidths(newColWidths);
  };
  
  const handleDeleteRow = () => {
    if (!activeCell) return;
    
    const newData = [...data];
    newData.splice(activeCell.row, 1);
    setData(newData);
    
    const newRowHeights = [...rowHeights];
    newRowHeights.splice(activeCell.row, 1);
    setRowHeights(newRowHeights);
    
    setActiveCell(null);
    setFocusedCell(null);
    setSelectionRange(null);
  };
  
  const handleDeleteColumn = () => {
    if (!activeCell) return;
    
    const newData = data.map(row => {
      const newRow = [...row];
      newRow.splice(activeCell.col, 1);
      return newRow;
    });
    setData(newData);
    
    const newColWidths = [...colWidths];
    newColWidths.splice(activeCell.col, 1);
    setColWidths(newColWidths);
    
    setActiveCell(null);
    setFocusedCell(null);
    setSelectionRange(null);
  };
  
  // Formula handlers
  const handleFormulaChange = (value: string) => {
    if (!activeCell) return;
    updateCellValue(activeCell.row, activeCell.col, value);
  };
  
  const handleFunctionSelect = (functionName: string) => {
    if (!activeCell) return;
    
    let currentValue = data[activeCell.row][activeCell.col];
    if (!currentValue.startsWith('=')) {
      currentValue = '=';
    }
    
    updateCellValue(activeCell.row, activeCell.col, `${currentValue}${functionName}()`);
    setShowFunctionList(false);
    handleCellFocus(activeCell.row, activeCell.col);
  };
  
  // Find and replace handlers
  const handleFind = (findText: string) => {
    if (!selectionRange || !findText) return;
    
    const { startRow, startCol, endRow, endCol } = selectionRange;
    
    for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
      for (let colIndex = startCol; colIndex <= endCol; colIndex++) {
        const cell = data[rowIndex][colIndex];
        if (cell.includes(findText)) {
          setActiveCell({ row: rowIndex, col: colIndex });
          return;
        }
      }
    }
  };
  
  const handleReplace = (findText: string, replaceText: string) => {
    if (!activeCell || !findText) return;
    
    const { row, col } = activeCell;
    const cell = data[row][col];
    
    if (cell.includes(findText)) {
      const newValue = cell.replace(findText, replaceText);
      updateCellValue(row, col, newValue);
    }
  };
  
  const handleReplaceAll = (findText: string, replaceText: string) => {
    if (!selectionRange || !findText) return;
    
    const { startRow, startCol, endRow, endCol } = selectionRange;
    const { newData, replacedCount } = findAndReplace(
      data,
      findText,
      replaceText,
      startRow,
      endRow,
      startCol,
      endCol
    );
    
    setData(newData);
    setShowFindReplaceDialog(false);
    
    alert(`Replaced ${replacedCount} occurrences.`);
  };
  
  const handleRemoveDuplicates = () => {
    if (!selectionRange) return;
    
    const { startRow, startCol, endRow, endCol } = selectionRange;
    const { newData, removedCount } = removeDuplicates(data, startRow, endRow, startCol, endCol);
    
    setData(newData);
    alert(`Removed ${removedCount} duplicate rows.`);
  };
  
  // Evaluate formulas
  useEffect(() => {
    const allCells: Record<string, string> = {};
    
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      for (let colIndex = 0; colIndex < data[rowIndex].length; colIndex++) {
        const key = getCellLabel(rowIndex, colIndex);
        allCells[key] = data[rowIndex][colIndex];
      }
    }
    
    const evaluateFormulasCycle = () => {
      let changedCount = 0;
      const newData = [...data];
      
      for (let rowIndex = 0; rowIndex < newData.length; rowIndex++) {
        for (let colIndex = 0; colIndex < newData[rowIndex].length; colIndex++) {
          const cellValue = newData[rowIndex][colIndex];
          
          if (cellValue.startsWith('=')) {
            try {
              const evaluatedValue = evaluateFormula(cellValue, getCellByReference, allCells);
              
              // Prevent setting the evaluated value if it's the same to avoid infinite loop
              if (evaluatedValue !== cellValue && !(cellValue.includes(evaluatedValue))) {
                newData[rowIndex][colIndex] = evaluatedValue;
                changedCount++;
              }
            } catch (error) {
              console.error('Formula evaluation error:', error);
              newData[rowIndex][colIndex] = '#ERROR!';
              changedCount++;
            }
          }
        }
      }
      
      if (changedCount > 0) {
        setData(newData);
      }
    };
    
    evaluateFormulasCycle();
  }, [data, getCellByReference]);
  
  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        onBoldClick={handleBoldClick}
        onItalicClick={handleItalicClick}
        onFontSizeChange={handleFontSizeChange}
        onColorChange={handleColorChange}
        onAddRow={handleAddRow}
        onAddColumn={handleAddColumn}
        onDeleteRow={handleDeleteRow}
        onDeleteColumn={handleDeleteColumn}
        onFindReplace={() => setShowFindReplaceDialog(true)}
        onRemoveDuplicates={handleRemoveDuplicates}
        currentFontSize={currentFontSize}
        currentColor={currentColor}
      />
      
      <FormulaBar
        value={activeCell ? data[activeCell.row][activeCell.col] : ''}
        onChange={handleFormulaChange}
        activeCellLabel={activeCell ? `${getColumnLabel(activeCell.col)}${activeCell.row + 1}` : ''}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="inline-block">
          <div className="flex">
            <div className="w-12 h-8 bg-neutral-100 border-r border-b border-neutral-300"></div>
            
            {/* Column headers */}
            {colWidths.map((width, colIndex) => (
              <ColumnHeader
                key={`col-${colIndex}`}
                index={colIndex}
                label={getColumnLabel(colIndex)}
                width={width}
                isSelected={
                  selectionRange?.startCol <= colIndex &&
                  selectionRange?.endCol >= colIndex &&
                  selectionRange?.startRow === 0 &&
                  selectionRange?.endRow === data.length - 1
                }
                onColumnSelect={handleColumnSelect}
                onColumnResize={handleColumnResize}
              />
            ))}
          </div>
          
          <div>
            {/* Spreadsheet cells */}
            {data.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex">
                <RowHeader
                  index={rowIndex}
                  height={rowHeights[rowIndex]}
                  isSelected={
                    selectionRange?.startRow <= rowIndex &&
                    selectionRange?.endRow >= rowIndex &&
                    selectionRange?.startCol === 0 &&
                    selectionRange?.endCol === data[0].length - 1
                  }
                  onRowSelect={handleRowSelect}
                  onRowResize={handleRowResize}
                />
                
                {row.map((cell, colIndex) => {
                  const isFormula = cell.startsWith('=');
                  const displayValue = isFormula
                    ? evaluateFormula(cell, getCellByReference, {})
                    : cell;
                  
                  const isFocused =
                    focusedCell &&
                    focusedCell.row === rowIndex &&
                    focusedCell.col === colIndex;
                  
                  const isSelected =
                    selectionRange &&
                    rowIndex >= selectionRange.startRow &&
                    rowIndex <= selectionRange.endRow &&
                    colIndex >= selectionRange.startCol &&
                    colIndex <= selectionRange.endCol;
                  
                  return (
                    <div
                      key={`cell-${rowIndex}-${colIndex}`}
                      style={{
                        width: colWidths[colIndex],
                        height: rowHeights[rowIndex],
                      }}
                    >
                      <Cell
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        value={cell}
                        isFormula={isFormula}
                        isFocused={isFocused}
                        isSelected={isSelected}
                        format={getCellFormat(rowIndex, colIndex)}
                        onCellValueChange={updateCellValue}
                        onCellFocus={handleCellFocus}
                        onCellSelected={handleCellSelected}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {showFunctionList && (
        <div className="absolute right-4 top-20">
          <FunctionList onFunctionSelect={handleFunctionSelect} />
        </div>
      )}
      
      {showFindReplaceDialog && (
        <FindReplaceDialog
          onFind={handleFind}
          onReplace={handleReplace}
          onReplaceAll={handleReplaceAll}
          onClose={() => setShowFindReplaceDialog(false)}
        />
      )}
    </div>
  );
};

export default Spreadsheet;
