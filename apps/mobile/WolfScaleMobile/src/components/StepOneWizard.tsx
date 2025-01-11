import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { InfoIcon, AlertCircle } from 'lucide-react-native';
import { styles, COLORS } from '../styles/stepOneWizard.styles';

interface StepOneProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const StepOneWizard: React.FC<StepOneProps> = ({ value, onChange, error }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Conteo Base</Text>
            <Text style={styles.description}>
              Ingresa el conteo de cero de la balanza para comenzar el proceso de calibración.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Conteo de Cero</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    error ? styles.inputError : null
                  ]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Ej: 186540"
                  placeholderTextColor={COLORS.surface}
                  keyboardType="numeric"
                />
                {error && (
                  <View style={styles.errorIcon}>
                    <AlertCircle stroke={COLORS.error} size={20} />
                  </View>
                )}
              </View>
              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
          </View>

          <View style={styles.info}>
            <InfoIcon stroke={COLORS.text} size={20} />
            <Text style={styles.infoText}>
              El conteo de cero es el valor que muestra la balanza cuando no tiene peso.
              Este valor es esencial para calcular correctamente los spans de calibración.
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default StepOneWizard;