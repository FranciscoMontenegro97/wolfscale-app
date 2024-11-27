import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, InfoIcon } from 'lucide-react';

interface SpanData {
  weight: string;
  count: string;
}

interface StepTwoProps {
  data: SpanData;
  onChange: (field: keyof SpanData, value: string) => void;
  errors?: {
    weight?: string;
    count?: string;
  };
}

const StepTwo: React.FC<StepTwoProps> = ({ data, onChange, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="step-two"
    >
      <div className="step-two__header">
        <h2 className="step-two__title">Span Principal</h2>
        <p className="step-two__description">
          Configura los valores del span principal para la calibración
        </p>
      </div>

      <div className="step-two__form">
        {/* Input Peso */}
        <div className="step-two__input-group">
          <label className="step-two__label" htmlFor="spanWeight">
            Peso del Span (kg)
          </label>
          <div className="step-two__input-wrapper">
            <input
              id="spanWeight"
              type="number"
              value={data.weight}
              onChange={(e) => onChange('weight', e.target.value)}
              className={`step-two__input ${errors?.weight ? 'step-two__input--error' : ''}`}
              placeholder="Ej: 22000"
            />
            {errors?.weight && (
              <div className="step-two__error-icon">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>
          {errors?.weight && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="step-two__error-message"
            >
              {errors.weight}
            </motion.p>
          )}
        </div>

        {/* Input Conteo */}
        <div className="step-two__input-group">
          <label className="step-two__label" htmlFor="spanCount">
            Conteo del Span
          </label>
          <div className="step-two__input-wrapper">
            <input
              id="spanCount"
              type="number"
              value={data.count}
              onChange={(e) => onChange('count', e.target.value)}
              className={`step-two__input ${errors?.count ? 'step-two__input--error' : ''}`}
              placeholder="Ej: 284317"
            />
            {errors?.count && (
              <div className="step-two__error-icon">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>
          {errors?.count && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="step-two__error-message"
            >
              {errors.count}
            </motion.p>
          )}
        </div>
      </div>

      <div className="step-two__info">
        <div className="step-two__info-icon">
          <InfoIcon className="w-5 h-5" />
        </div>
        <div className="step-two__info-text">
          <p>
            El span principal es el valor de referencia para la calibración.
            Ingresa el peso de las masas patrón utilizadas y el conteo que muestra
            la balanza con ese peso.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepTwo;