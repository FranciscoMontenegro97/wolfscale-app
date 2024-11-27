import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InfoIcon, Calculator } from 'lucide-react';
import { generatePDF } from '../utils/PDFGenerator';

interface CalculationResult {
  weight: number;
  netCount: number;
  countsPerKg: number;
  adjustmentValue: number;
  finalValue: number;
}

interface PercentageCalculation {
  weight: string;
  percentage: string;
  result?: number;
}

interface PercentageResult {
  weight: string;
  percentage: string;
  result: number;
}

interface StepFourProps {
  results: CalculationResult[];
  onCalculatePercentage: (weight: string, percentage: string) => number;
  onResultChange: (result: PercentageResult | null) => void;
}

const StepFour: React.FC<StepFourProps> = ({ results, onCalculatePercentage, onResultChange }) => {
  const [percentageCalc, setPercentageCalc] = useState<PercentageCalculation>({
    weight: '',
    percentage: ''
  });
  const [percentageResult, setPercentageResult] = useState<number | null>(null);

  const [calculatedResult, setCalculatedResult] = useState<PercentageResult | null>(null);

  const handleCalculatePercentage = () => {
    if (percentageCalc.weight && percentageCalc.percentage) {
      const result = onCalculatePercentage(percentageCalc.weight, percentageCalc.percentage);
      const newResult = {
        ...percentageCalc,
        result
      };
      onResultChange(newResult);
    }
  };

  const handleFinish = () => {
    const pdfData = {
      results,
      percentageCalculations: calculatedResult ? [calculatedResult] : []
    };
    generatePDF(pdfData);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="step-four"
    >
      <div className="step-four__header">
        <h2 className="step-four__title">Resultados</h2>
        <p className="step-four__description">
          Revisa los resultados y calcula porcentajes adicionales si lo necesitas
        </p>
      </div>

      <div className="step-four__form">
        <div className="step-four__results">
          <h3 className="step-four__results-title">Resultados de Calibración</h3>
          <table className="step-four__results-table">
            <thead>
              <tr>
                <th>Peso (kg)</th>
                <th>Conteo Neto</th>
                <th>Cuentas/kg</th>
                <th>Valor Ajuste</th>
                <th>Valor Final</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.weight}</td>
                  <td>{result.netCount}</td>
                  <td>{result.countsPerKg.toFixed(4)}</td>
                  <td>{result.adjustmentValue}</td>
                  <td>{result.finalValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="step-four__percentage">
          <h3 className="step-four__percentage-title">Calcular Porcentaje</h3>
          <div className="step-four__percentage-input-group">
            <div className="step-four__percentage-field">
              <label className="step-four__percentage-label">
                Peso (kg)
              </label>
              <div className="step-four__percentage-input-wrapper">
                <input
                  type="number"
                  value={percentageCalc.weight}
                  onChange={(e) => setPercentageCalc({
                    ...percentageCalc,
                    weight: e.target.value
                  })}
                  className="step-four__percentage-input"
                  placeholder="Ej: 8000"
                />
              </div>
            </div>

            <div className="step-four__percentage-field">
              <label className="step-four__percentage-label">
                Porcentaje (%)
              </label>
              <div className="step-four__percentage-input-wrapper">
                <input
                  type="number"
                  value={percentageCalc.percentage}
                  onChange={(e) => setPercentageCalc({
                    ...percentageCalc,
                    percentage: e.target.value
                  })}
                  className="step-four__percentage-input"
                  placeholder="Ej: 5"
                />
              </div>
            </div>

            <button
              onClick={handleCalculatePercentage}
              className="step-four__percentage-button"
            >
              <Calculator className="w-5 h-5" />
            </button>
          </div>

          {calculatedResult && (
            <div className="step-four__percentage-result">
              El {calculatedResult.percentage}% de {calculatedResult.weight}kg es: {calculatedResult.result}kg
            </div>
          )}
        </div>

        <div className="step-four__info">
          <div className="step-four__info-icon">
            <InfoIcon className="w-5 h-5" />
          </div>
          <div className="step-four__info-text">
            <p>
              Aquí puedes ver todos los resultados de la calibración.
              También puedes calcular porcentajes adicionales si lo necesitas.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepFour;