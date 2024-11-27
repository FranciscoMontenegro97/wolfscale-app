import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, InfoIcon } from 'lucide-react';

interface StepOneProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const StepOne: React.FC<StepOneProps> = ({ value, onChange, error }) => {
  return (
    <motion.div className="step-one">
      <div className="step-one__header">
        <h2 className="step-one__title">Conteo Base</h2>
        <p className="step-one__description">
          Ingresa el conteo de cero de la balanza para comenzar el proceso de calibración.
        </p>
      </div>

      <div className="step-one__form">
        <div className="step-one__input-group">
          <label className="step-one__label" htmlFor="zeroCount">
            Conteo de Cero
          </label>
          <div className="step-one__input-wrapper">
            <input
              id="zeroCount"
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`step-one__input ${error ? 'step-one__input--error' : ''}`}
              placeholder="Ej: 186540"
            />
            {error && (
              <div className="step-one__error-icon">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="step-one__error-message"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>

      <div className="step-one__info">
        <div className="step-one__info-icon">
          <InfoIcon className="w-5 h-5" />
        </div>
        <div className="step-one__info-text">
          <p>
            El conteo de cero es el valor que muestra la balanza cuando no tiene peso.
            Este valor es esencial para calcular correctamente los spans de calibración.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepOne;