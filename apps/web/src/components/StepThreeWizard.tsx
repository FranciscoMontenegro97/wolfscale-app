import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, InfoIcon, Plus, X } from 'lucide-react';

interface SpanData {
  weight: string;
  count: string;
}

interface StepThreeProps {
  spans: SpanData[];
  onAddSpan: () => void;
  onRemoveSpan: (index: number) => void;
  onChange: (index: number, field: keyof SpanData, value: string) => void;
  errors?: Array<{
    weight?: string;
    count?: string;
  }>;
}

const StepThree: React.FC<StepThreeProps> = ({
  spans,
  onAddSpan,
  onRemoveSpan,
  onChange,
  errors = []
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  // const handleRemove = async (index: number) => {
  //   setIsRemoving(true);
  //   // Esperamos a que termine la animación de salida
  //   await new Promise(resolve => setTimeout(resolve, 300));
  //   onRemoveSpan(index);
  //   setIsRemoving(false);
  // };
  const containerVariants = {
    hidden: { height: 0 },
    visible: { height: 'auto' },
    exit: { height: 'auto' }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="step-three"
      // Añadimos animación al contenedor principal
      initial={{ height: 'auto' }}
      animate={{ height: 'auto' }}
      transition={{ duration: 0.8, delay: 0.8 }} // El delay permite que la card se elimine primero
    >
      <div className="step-three__header">
        <h2 className="step-three__title">Spans Adicionales</h2>
        <p className="step-three__description">
          Agrega spans adicionales para puntos de calibración extra (opcional)
        </p>
      </div>

      <div className="step-three__form">
        <div className="step-three__spans-header">
          <h3 className="step-three__subtitle">Spans</h3>
          <button
            onClick={onAddSpan}
            disabled={spans.length >= 4}
            className="step-three__add-button"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Span</span>
          </button>
        </div>


        <AnimatePresence mode="wait">
          <motion.div
            className="step-three__spans-container"
            variants={containerVariants}
            initial="visible"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {spans.map((span, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="step-three__span-row"
              >
                <button
                  onClick={() => onRemoveSpan(index)}
                  className="step-three__remove-button"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="step-three__input-group">
                  <label className="step-three__label">
                    Peso del Span (kg)
                  </label>
                  <div className="step-three__input-wrapper">
                    <input
                      type="number"
                      value={span.weight}
                      onChange={(e) => onChange(index, 'weight', e.target.value)}
                      className={`step-three__input ${errors[index]?.weight ? 'step-three__input--error' : ''}`}
                      placeholder="Ej: 5000"
                    />
                    {errors[index]?.weight && (
                      <div className="step-three__error-icon">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  {errors[index]?.weight && (
                    <p className="step-three__error-message">{errors[index].weight}</p>
                  )}
                </div>

                <div className="step-three__input-group">
                  <label className="step-three__label">
                    Conteo del Span
                  </label>
                  <div className="step-three__input-wrapper">
                    <input
                      type="number"
                      value={span.count}
                      onChange={(e) => onChange(index, 'count', e.target.value)}
                      className={`step-three__input ${errors[index]?.count ? 'step-three__input--error' : ''}`}
                      placeholder="Opcional"
                    />
                    {errors[index]?.count && (
                      <div className="step-three__error-icon">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  {errors[index]?.count && (
                    <p className="step-three__error-message">{errors[index].count}</p>
                  )}
                </div>

              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="step-three__info">
          <div className="step-three__info-icon">
            <InfoIcon className="w-5 h-5" />
          </div>
          <div className="step-three__info-text">
            <p>
              Los spans adicionales son opcionales y se calculan automáticamente
              basándose en el span principal. Puedes agregar hasta 4 spans adicionales.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepThree;