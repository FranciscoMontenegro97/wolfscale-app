import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  CustomCheck,
  CustomChevronLeft,
  CustomChevronRight
} from './icons/CustomIcons';
import { styles, COLORS } from '../styles/curveWizard.styles';
import Animated, {
  SlideInRight,
  SlideOutLeft
} from 'react-native-reanimated';
import { generatePDF, sharePDF } from '../utils/PDFgenerator';
import { Alert } from 'react-native';
import StepOneWizard from './StepOneWizard';
import StepTwoWizard from './StepTwoWizard';
import StepThreeWizard from './StepThreeWizard';
import StepFourWizard from './StepFourWizard';

// Interfaces
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
  mainSpan: SpanData;
  additionalSpans: SpanData[];
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

const CurveWizardContent: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    zeroCount: '',
    mainSpan: { weight: '', count: '' },
    additionalSpans: [],
    percentageCalculations: []
  });
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

    // Cálculos para spans adicionales
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

  const calculatePercentage = (weight: string, percentage: string): number => {
    return (Number(weight) * Number(percentage)) / 100;
  };

  const handleFinish = async () => {
    try {
      const results = calculateResults();
      const pdfUri = await generatePDF(formData, results);
      await sharePDF(pdfUri);

      // Reiniciar el wizard
      setCurrentStep(1);
      setFormData({
        zeroCount: '',
        mainSpan: { weight: '', count: '' },
        additionalSpans: [],
        percentageCalculations: []
      });
      setErrors({});

      Alert.alert(
        "PDF Generado",
        "El informe ha sido generado exitosamente",
        [{ text: "OK" }]
      );

    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un error al generar el PDF",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" backgroundColor={COLORS.background} />


      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View key={step.number} style={styles.stepContainer}>
            <View
              style={[
                styles.connector,
                {
                  right: index === steps.length - 1 ? '50%' : 0
                },
                currentStep > step.number && styles.connectorActive
              ]}
            />

            <TouchableOpacity
              style={[
                styles.circle,
                currentStep === step.number && styles.circleActive,
                currentStep > step.number && styles.circleCompleted
              ]}
            >
              {currentStep > step.number ? (
                <CustomCheck stroke={COLORS.text} size={20} />
              ) : (
                <Text style={styles.circleText}>{step.number}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.stepText}>
              <Text style={[
                styles.stepTitle,
                currentStep >= step.number && styles.stepTitleActive
              ]}>
                {step.title}
              </Text>
              <Text style={styles.stepDescription}>
                {step.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Content */}
      <Animated.View
        style={styles.content}
        entering={SlideInRight}
        exiting={SlideOutLeft}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* Aquí irán los Steps */}
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
                  additionalSpans: [...formData.additionalSpans, { weight: '', count: '' }]
                });
              }}
              onRemoveSpan={(index) => {
                setFormData({
                  ...formData,
                  additionalSpans: formData.additionalSpans.filter((_, i) => i !== index)
                });
              }}
              onChange={(index, field, value) => {
                const newSpans = [...formData.additionalSpans];
                newSpans[index] = { ...newSpans[index], [field]: value };
                setFormData({ ...formData, additionalSpans: newSpans });
              }}
              errors={errors.additionalSpans}
            />
          )}
          {currentStep === 4 && (
            <StepFourWizard
              results={calculateResults()}
              onCalculatePercentage={calculatePercentage}
            />
          )}
        </KeyboardAvoidingView>
      </Animated.View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentStep === 1}
          style={[
            styles.button,
            styles.buttonPrevious,
            currentStep === 1 && styles.buttonDisabled
          ]}
        >
          <CustomChevronLeft stroke={COLORS.text} size={20} />
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, styles.buttonNext]}
        >
          <Text style={styles.buttonText}>
            {currentStep === 4 ? 'Finalizar' : 'Siguiente'}
          </Text>
          <CustomChevronRight stroke={COLORS.text} size={20} />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            if (currentStep === 4) {
              handleFinish();
            } else {
              handleNext();
            }
          }}
          style={[styles.button, styles.buttonNext]}
        >
          <Text style={styles.buttonText}>
            {currentStep === 4 ? 'Finalizar' : 'Siguiente'}
          </Text>
          <CustomChevronRight stroke={COLORS.text} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CurveWizard: React.FC = () => {

  return (
    <SafeAreaProvider>
      <CurveWizardContent />
    </SafeAreaProvider>
  );
};

export default CurveWizard;