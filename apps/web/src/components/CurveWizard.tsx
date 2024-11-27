import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import StepOneWizard from './StepOneWizard';
import StepTwoWizard from './StepTwoWizard';
import StepThreeWizard from './StepThreeWizard';
import StepFourWizard from './StepFourWizard';
import { generatePDF } from '../utils/PDFGenerator';

interface SpanData {
  weight: string;
  count: string;
}

interface CalculationResult {
  weight: number;
  netCount: number;
  countsPerKg: number;
  adjustmentValue: number;
  finalValue: number;
}

interface FormData {
  zeroCount: string;
  mainSpan: { weight: string; count: string };
  additionalSpans: Array<{ weight: string; count: string }>;
  percentageCalculations: Array<{ weight: string; percentage: string }>;
  results?: CalculationResult[];
}

interface FormErrors {
  zeroCount?: string;
  mainSpan?: {
    weight?: string;
    count?: string;
  };
  additionalSpans?: Array<{
    weight?: string;
    count?: string;
  }>;
}

interface PercentageResult {
  weight: string;
  percentage: string;
  result: number;
}

const CurveWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    zeroCount: '',
    mainSpan: { weight: '', count: '' },
    additionalSpans: [],
    percentageCalculations: []
  });
  const [calculatedResult, setCalculatedResult] = useState<PercentageResult | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const steps = [
    {
      number: 1,
      title: 'Conteo Base',
      description: 'Ingresa el conteo de cero'
    },
    {
      number: 2,
      title: 'Span Principal',
      description: 'Configura el span principal'
    },
    {
      number: 3,
      title: 'Spans Adicionales',
      description: 'Agrega spans adicionales (opcional)'
    },
    {
      number: 4,
      title: 'Resultados',
      description: 'Revisa y calcula porcentajes'
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.zeroCount) {
          newErrors.zeroCount = 'El conteo de cero es requerido';
          isValid = false;
        } else if (isNaN(Number(formData.zeroCount)) || Number(formData.zeroCount) < 0) {
          newErrors.zeroCount = 'El valor debe ser un número positivo';
          isValid = false;
        }
        break;

      case 2:
        newErrors.mainSpan = {};
        if (!formData.mainSpan.weight) {
          newErrors.mainSpan.weight = 'El peso del span es requerido';
          isValid = false;
        } else if (isNaN(Number(formData.mainSpan.weight)) || Number(formData.mainSpan.weight) <= 0) {
          newErrors.mainSpan.weight = 'El peso debe ser un número positivo';
          isValid = false;
        }

        if (!formData.mainSpan.count) {
          newErrors.mainSpan.count = 'El conteo del span es requerido';
          isValid = false;
        } else if (isNaN(Number(formData.mainSpan.count)) || Number(formData.mainSpan.count) <= 0) {
          newErrors.mainSpan.count = 'El conteo debe ser un número positivo';
          isValid = false;
        }
        break;

      case 3:
        if (formData.additionalSpans.length > 0) {
          newErrors.additionalSpans = formData.additionalSpans.map(span => {
            const spanErrors: { weight?: string; count?: string } = {};

            if (!span.weight) {
              spanErrors.weight = 'El peso del span es requerido';
              isValid = false;
            } else if (isNaN(Number(span.weight)) || Number(span.weight) <= 0) {
              spanErrors.weight = 'El peso debe ser un número positivo';
              isValid = false;
            }

            return spanErrors;
          });
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(4, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  // Añade función para calcular los resultados
  const calculateResults = (): CalculationResult[] => {
    const results: CalculationResult[] = [];
    const zeroCount = Number(formData.zeroCount);
    const mainSpan = {
      weight: Number(formData.mainSpan.weight),
      count: Number(formData.mainSpan.count)
    };

    // Cálculo para el span principal
    const mainNetCount = mainSpan.count - zeroCount;
    const countsPerKg = mainNetCount / mainSpan.weight;

    results.push({
      weight: mainSpan.weight,
      netCount: mainNetCount,
      countsPerKg: countsPerKg,
      adjustmentValue: mainNetCount,
      finalValue: mainSpan.count
    });

    // Cálculo para spans adicionales
    formData.additionalSpans.forEach(span => {
      const weight = Number(span.weight);
      const adjustmentValue = weight * countsPerKg;
      const finalValue = adjustmentValue + zeroCount;

      results.push({
        weight: weight,
        netCount: adjustmentValue,
        countsPerKg: countsPerKg,
        adjustmentValue: Math.round(adjustmentValue),
        finalValue: Math.round(finalValue)
      });
    });

    return results;
  };

  // Añade función para calcular porcentajes
  const calculatePercentage = (weight: string, percentage: string): number => {
    const weightNum = Number(weight);
    const percentageNum = Number(percentage);
    return (weightNum * percentageNum) / 100;
  };

  return (
    <div className="wizard">
      <div className="wizard__container">
        <div className="wizard__progress">
          <div className="wizard__progress-bar">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`wizard__progress-step ${currentStep > step.number ? 'completed' : ''}`}
              >
                <motion.div
                  className={`wizard__progress-step-circle
                    ${currentStep === step.number ? 'wizard__progress-step-circle--current' : ''}
                    ${currentStep > step.number ? 'wizard__progress-step-circle--completed' : ''}
                    ${currentStep < step.number ? 'wizard__progress-step-circle--pending' : ''}`
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > step.number ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </motion.div>

                <div className="wizard__progress-step-content">
                  <h3 className={`wizard__progress-step-title
                    ${currentStep >= step.number ? 'wizard__progress-step-title--active' : 'wizard__progress-step-title--pending'}`}
                  >
                    {step.title}
                  </h3>
                  <p className="wizard__progress-step-description">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wizard__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <StepOneWizard
                  value={formData.zeroCount}
                  onChange={(value) => {
                    setFormData({ ...formData, zeroCount: value });
                    if (errors.zeroCount) {
                      setErrors({ ...errors, zeroCount: undefined });
                    }
                  }}
                  error={errors.zeroCount}
                />
              )}
              {currentStep === 2 && (
                <StepTwoWizard
                  data={formData.mainSpan}
                  onChange={(field, value) => {
                    setFormData({
                      ...formData,
                      mainSpan: { ...formData.mainSpan, [field]: value }
                    });
                    if (errors.mainSpan?.[field]) {
                      setErrors({
                        ...errors,
                        mainSpan: {
                          ...errors.mainSpan,
                          [field]: undefined
                        }
                      });
                    }
                  }}
                  errors={errors.mainSpan}
                />
              )}
              {currentStep === 3 && (
                <StepThreeWizard
                  spans={formData.additionalSpans}
                  onAddSpan={() => {
                    setFormData({
                      ...formData,
                      additionalSpans: [
                        ...formData.additionalSpans,
                        { weight: '', count: '' }
                      ]
                    });
                  }}
                  onRemoveSpan={(index) => {
                    const newSpans = formData.additionalSpans.filter((_, i) => i !== index);
                    setFormData({
                      ...formData,
                      additionalSpans: newSpans
                    });
                  }}
                  onChange={(index, field, value) => {
                    const newSpans = [...formData.additionalSpans];
                    newSpans[index] = {
                      ...newSpans[index],
                      [field]: value
                    };
                    setFormData({
                      ...formData,
                      additionalSpans: newSpans
                    });

                    // Limpiar errores al cambiar el valor
                    if (errors.additionalSpans?.[index]?.[field]) {
                      const newErrors = { ...errors };
                      if (newErrors.additionalSpans) {
                        newErrors.additionalSpans[index] = {
                          ...newErrors.additionalSpans[index],
                          [field]: undefined
                        };
                      }
                      setErrors(newErrors);
                    }
                  }}
                  errors={errors.additionalSpans}
                />
              )}
              {currentStep === 4 && (
                <StepFourWizard
                  results={calculateResults()}
                  onCalculatePercentage={calculatePercentage}
                  onResultChange={setCalculatedResult}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="wizard__navigation">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="wizard__navigation-button wizard__navigation-button--previous"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={() => {
              if (currentStep === 4) {
                const pdfData = {
                  results: calculateResults(),
                  percentageCalculations: calculatedResult ? [calculatedResult] : []
                };
                generatePDF(pdfData);
              } else {
                handleNext();
              }
            }}
            className="wizard__navigation-button wizard__navigation-button--next"
          >
            <span>{currentStep === 4 ? 'Finalizar' : 'Siguiente'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurveWizard;