import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Keyboard
} from 'react-native';
import { InfoIcon, AlertCircle } from 'lucide-react-native';
import { styles, COLORS } from '../styles/stepTwoWizard.styles';

//Iterfaces
interface SpanData {
  weight: string;
  count: string;
}

interface StepTwoProps {
  data: SpanData;
  onChange: (field: 'weight' | 'count', value: string) => void;
  errors?: {
    weight?: string;
    count?: string;
  };
}


const StepTwoWizard: React.FC<StepTwoProps> = ({ data, onChange, errors }) => {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isKeyboardVisible}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Span Principal</Text>
              <Text style={styles.description}>
                Configura los valores del span principal para la calibración
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Peso del Span (kg)</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      errors?.weight ? styles.inputError : null
                    ]}
                    value={data.weight}
                    onChangeText={(value) => onChange('weight', value)}
                    placeholder="Ej: 22000"
                    placeholderTextColor={COLORS.surface}
                    keyboardType="numeric"
                  />
                  {errors?.weight && (
                    <View style={styles.errorIcon}>
                      <AlertCircle stroke={COLORS.error} size={20} />
                    </View>
                  )}
                </View>
                {errors?.weight && (
                  <Text style={styles.errorText}>{errors.weight}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Conteo del Span</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      errors?.count ? styles.inputError : null
                    ]}
                    value={data.count}
                    onChangeText={(value) => onChange('count', value)}
                    placeholder="Ej: 284317"
                    placeholderTextColor={COLORS.surface}
                    keyboardType="numeric"
                  />
                  {errors?.count && (
                    <View style={styles.errorIcon}>
                      <AlertCircle stroke={COLORS.error} size={20} />
                    </View>
                  )}
                </View>
                {errors?.count && (
                  <Text style={styles.errorText}>{errors.count}</Text>
                )}
              </View>
            </View>

            <View style={styles.info}>
              <InfoIcon stroke={COLORS.text} size={20} />
              <Text style={styles.infoText}>
                El span principal es el valor de referencia para la calibración.
                Ingresa el peso de las masas patrón utilizadas y el conteo que muestra
                la balanza con ese peso.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StepTwoWizard;