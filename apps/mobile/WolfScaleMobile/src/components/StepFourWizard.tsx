import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard
} from 'react-native';
import { InfoIcon, Calculator } from 'lucide-react-native';
import { styles, COLORS } from '../styles/stepFourWizard.styles';

interface CalculationResult {
  weight: number;
  netCount: number;
  countsPerKg: number;
  adjustmentValue: number;
  finalValue: number;
}

interface StepFourProps {
  results: CalculationResult[];
  onCalculatePercentage: (weight: string, percentage: string) => number;
}

const StepFourWizard: React.FC<StepFourProps> = ({ results, onCalculatePercentage }) => {
  const [percentageCalc, setPercentageCalc] = useState({ weight: '', percentage: '' });
  const [percentageResult, setPercentageResult] = useState<number | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // const handleCalculate = () => {
  //   if (percentageCalc.weight && percentageCalc.percentage) {
  //     const result = onCalculatePercentage(percentageCalc.weight, percentageCalc.percentage);
  //     setPercentageResult(result);
  //   }
  // };
  const handleCalculate = () => {
    if (percentageCalc.weight && percentageCalc.percentage) {
      const result = onCalculatePercentage(percentageCalc.weight, percentageCalc.percentage);
      setPercentageResult(result);
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Resultados</Text>
              <Text style={styles.description}>
                Revisa los resultados y calcula porcentajes adicionales
              </Text>
            </View>

            <ScrollView
              style={styles.resultsContainer}
              nestedScrollEnabled={true}
            >
              {results.map((result, index) => (
                <View key={index} style={styles.resultCard}>
                  <Text style={styles.resultTitle}>Span {index + 1}</Text>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Peso:</Text>
                    <Text style={styles.resultValue}>{result.weight} kg</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Conteo Neto:</Text>
                    <Text style={styles.resultValue}>{result.netCount}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Cuentas/kg:</Text>
                    <Text style={styles.resultValue}>{result.countsPerKg.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Valor Ajuste:</Text>
                    <Text style={styles.resultValue}>{result.adjustmentValue}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Valor Final:</Text>
                    <Text style={styles.resultValue}>{result.finalValue}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.percentageSection}>
              <Text style={styles.sectionTitle}>Calcular Porcentaje</Text>
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Peso (kg)</Text>
                  <TextInput
                    style={styles.input}
                    value={percentageCalc.weight}
                    onChangeText={(value) => setPercentageCalc({ ...percentageCalc, weight: value })}
                    placeholder="Ej: 8000"
                    placeholderTextColor={COLORS.surface}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Porcentaje (%)</Text>
                  <TextInput
                    style={styles.input}
                    value={percentageCalc.percentage}
                    onChangeText={(value) => setPercentageCalc({ ...percentageCalc, percentage: value })}
                    placeholder="Ej: 5"
                    placeholderTextColor={COLORS.surface}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity
                  style={styles.calculateButton}
                  onPress={handleCalculate}
                >
                  <Calculator stroke={COLORS.text} size={24} />
                </TouchableOpacity>
              </View>
              {percentageResult !== null && (
                <View style={styles.percentageResult}>
                  <Text style={styles.percentageResultText}>
                    El {percentageCalc.percentage}% de {percentageCalc.weight}kg es: {percentageResult}kg
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.info}>
              <InfoIcon stroke={COLORS.text} size={20} />
              <Text style={styles.infoText}>
                Revisa los resultados de calibración para cada span y utiliza la
                calculadora de porcentaje si necesitas cálculos adicionales.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StepFourWizard;