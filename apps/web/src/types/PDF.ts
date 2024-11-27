import 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

export interface CalculationResult {
  weight: number;
  netCount: number;
  countsPerKg: number;
  adjustmentValue: number;
  finalValue: number;
}

export interface PercentageCalculation {
  weight: string;
  percentage: string;
  result: number;
}

export interface PDFData {
  results: CalculationResult[];
  percentageCalculations?: PercentageCalculation[];
}