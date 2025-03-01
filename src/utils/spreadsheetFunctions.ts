
export const evaluateFormula = (
  formula: string,
  getCell: (cellRef: string) => string,
  allCells: Record<string, string>
): string => {
  if (!formula.startsWith('=')) {
    return formula;
  }
  
  const withoutEquals = formula.substring(1).trim();
  
  // Check for functions
  if (withoutEquals.includes('(') && withoutEquals.includes(')')) {
    const functionName = withoutEquals.substring(0, withoutEquals.indexOf('(')).toUpperCase();
    const argsString = withoutEquals.substring(
      withoutEquals.indexOf('(') + 1,
      withoutEquals.lastIndexOf(')')
    );
    
    // If it's a range like A1:A5
    if (argsString.includes(':')) {
      const [start, end] = argsString.split(':');
      const cells = expandCellRange(start, end);
      const values = cells.map(cell => {
        const value = getCell(cell);
        return isNumeric(value) ? parseFloat(value) : value;
      });
      
      switch (functionName) {
        case 'SUM':
          return sum(values).toString();
        case 'AVERAGE':
          return average(values).toString();
        case 'MAX':
          return max(values).toString();
        case 'MIN':
          return min(values).toString();
        case 'COUNT':
          return count(values).toString();
        default:
          return '#ERROR!';
      }
    } else {
      // Single cell or comma-separated list
      const args = argsString.split(',').map(arg => arg.trim());
      const values = args.map(arg => {
        if (isCellReference(arg)) {
          const value = getCell(arg);
          return isNumeric(value) ? parseFloat(value) : value;
        }
        return arg;
      });
      
      switch (functionName) {
        case 'SUM':
          return sum(values).toString();
        case 'AVERAGE':
          return average(values).toString();
        case 'MAX':
          return max(values).toString();
        case 'MIN':
          return min(values).toString();
        case 'COUNT':
          return count(values).toString();
        case 'TRIM':
          return trim(values[0] as string);
        case 'UPPER':
          return upper(values[0] as string);
        case 'LOWER':
          return lower(values[0] as string);
        default:
          return '#ERROR!';
      }
    }
  }
  
  return '#ERROR!';
};

// Mathematical Functions
const sum = (values: any[]): number => {
  return values
    .filter(value => isNumeric(value))
    .reduce((acc, value) => acc + parseFloat(value.toString()), 0);
};

const average = (values: any[]): number => {
  const numValues = values.filter(value => isNumeric(value));
  if (numValues.length === 0) return 0;
  return sum(numValues) / numValues.length;
};

const max = (values: any[]): number => {
  const numValues = values.filter(value => isNumeric(value)).map(v => parseFloat(v.toString()));
  if (numValues.length === 0) return 0;
  return Math.max(...numValues);
};

const min = (values: any[]): number => {
  const numValues = values.filter(value => isNumeric(value)).map(v => parseFloat(v.toString()));
  if (numValues.length === 0) return 0;
  return Math.min(...numValues);
};

const count = (values: any[]): number => {
  return values.filter(value => isNumeric(value)).length;
};

// Data Quality Functions
const trim = (value: string): string => {
  return value.trim();
};

const upper = (value: string): string => {
  return value.toUpperCase();
};

const lower = (value: string): string => {
  return value.toLowerCase();
};

// Helper Functions
const isNumeric = (value: any): boolean => {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

const isCellReference = (value: string): boolean => {
  return /^[A-Z]+[0-9]+$/.test(value);
};

const expandCellRange = (start: string, end: string): string[] => {
  const startCol = getColIndex(start);
  const startRow = getRowIndex(start);
  const endCol = getColIndex(end);
  const endRow = getRowIndex(end);
  
  const cells: string[] = [];
  
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      cells.push(`${getColLabel(col)}${row + 1}`);
    }
  }
  
  return cells;
};

const getColIndex = (cellRef: string): number => {
  const colStr = cellRef.match(/[A-Z]+/)?.[0] || '';
  let index = 0;
  
  for (let i = 0; i < colStr.length; i++) {
    index = index * 26 + (colStr.charCodeAt(i) - 64);
  }
  
  return index - 1;
};

const getRowIndex = (cellRef: string): number => {
  const rowStr = cellRef.match(/[0-9]+/)?.[0] || '';
  return parseInt(rowStr) - 1;
};

const getColLabel = (index: number): string => {
  let label = '';
  index++;
  
  while (index > 0) {
    const remainder = (index - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    index = Math.floor((index - 1) / 26);
  }
  
  return label;
};

export const removeDuplicates = (
  data: string[][],
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number
): { newData: string[][], removedCount: number } => {
  if (startRow === endRow && startCol === endCol) {
    return { newData: data, removedCount: 0 };
  }
  
  const newData = [...data];
  const rowsToCheck = data.slice(startRow, endRow + 1);
  
  // Create a map to track unique rows
  const uniqueRows = new Map<string, number>();
  const duplicateIndices: number[] = [];
  
  rowsToCheck.forEach((row, index) => {
    const slicedRow = row.slice(startCol, endCol + 1);
    const rowKey = JSON.stringify(slicedRow);
    
    if (uniqueRows.has(rowKey)) {
      duplicateIndices.push(startRow + index);
    } else {
      uniqueRows.set(rowKey, startRow + index);
    }
  });
  
  // Remove rows in reverse order (to avoid shifting indices)
  duplicateIndices.sort((a, b) => b - a).forEach(rowIndex => {
    newData.splice(rowIndex, 1);
  });
  
  return { newData, removedCount: duplicateIndices.length };
};

export const findAndReplace = (
  data: string[][],
  findText: string,
  replaceText: string,
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number
): { newData: string[][], replacedCount: number } => {
  if (!findText) {
    return { newData: data, replacedCount: 0 };
  }
  
  const newData = data.map(row => [...row]);
  let replacedCount = 0;
  
  for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
    if (rowIndex >= newData.length) continue;
    
    for (let colIndex = startCol; colIndex <= endCol; colIndex++) {
      if (colIndex >= newData[rowIndex].length) continue;
      
      const cell = newData[rowIndex][colIndex];
      if (cell.includes(findText)) {
        newData[rowIndex][colIndex] = cell.split(findText).join(replaceText);
        replacedCount += (cell.split(findText).length - 1);
      }
    }
  }
  
  return { newData, replacedCount };
};

export const getCellLabel = (row: number, col: number): string => {
  const colLabel = getColLabel(col);
  return `${colLabel}${row + 1}`;
};
