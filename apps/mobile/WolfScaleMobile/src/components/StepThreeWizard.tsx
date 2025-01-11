import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView, TouchableOpacity,
  Keyboard
} from 'react-native';
import { InfoIcon, AlertCircle, Plus, X } from 'lucide-react-native';
import { styles, COLORS } from '../styles/stepThreeWizard.styles';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface SpanData {
  weight: string;
  count: string;
}

interface StepThreeProps {
  spans: SpanData[];
  onAddSpan: () => void;
  onRemoveSpan: (index: number) => void;
  onChange: (index: number, field: 'weight' | 'count', value: string) => void;
  errors?: Array<{
    weight?: string;
    count?: string;
  }>;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const StepThreeWizard: React.FC<StepThreeProps> = ({

  spans,
  onAddSpan,
  onRemoveSpan,
  onChange,
  errors = []
}) => {
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
          scrollEnabled={true} // Siempre habilitado
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.container}>
            {/* Header y botón de agregar */}
            <View style={styles.header}>
              <Text style={styles.title}>Spans Adicionales</Text>
              <Text style={styles.description}>
                Agrega spans adicionales para puntos de calibración extra (opcional)
              </Text>
            </View>

            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={[styles.addButton, spans.length >= 4 && styles.addButtonDisabled]}
                onPress={onAddSpan}
                disabled={spans.length >= 4}
              >
                <Plus stroke={COLORS.text} size={20} />
                <Text style={styles.addButtonText}>Agregar Span</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.spansContainer}>
              <ScrollView nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                scrollEnabled={spans.length > 2} // Scroll solo si hay más de 2 spans 
              >
                {spans.map((span, index) => (
                  <AnimatedTouchableOpacity
                    key={index}
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={styles.spanCard}
                  >
                    <View style={styles.spanHeader}>
                      <Text style={styles.spanTitle}>Span {index + 1}</Text>
                      <TouchableOpacity
                        onPress={() => onRemoveSpan(index)}
                        style={styles.removeButton}
                      >
                        <X stroke={COLORS.error} size={20} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Peso del Span (kg)</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={[
                            styles.input,
                            errors[index]?.weight ? styles.inputError : null
                          ]}
                          value={span.weight}
                          onChangeText={(value) => onChange(index, 'weight', value)}
                          placeholder="Ej: 5000"
                          placeholderTextColor={COLORS.surface}
                          keyboardType="numeric"
                        />
                        {errors[index]?.weight && (
                          <View style={styles.errorIcon}>
                            <AlertCircle stroke={COLORS.error} size={20} />
                          </View>
                        )}
                      </View>
                      {errors[index]?.weight && (
                        <Text style={styles.errorText}>{errors[index].weight}</Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Conteo del Span</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={[
                            styles.input,
                            errors[index]?.count ? styles.inputError : null
                          ]}
                          value={span.count}
                          onChangeText={(value) => onChange(index, 'count', value)}
                          placeholder="Opcional"
                          placeholderTextColor={COLORS.surface}
                          keyboardType="numeric"
                        />
                        {errors[index]?.count && (
                          <View style={styles.errorIcon}>
                            <AlertCircle stroke={COLORS.error} size={20} />
                          </View>
                        )}
                      </View>
                      {errors[index]?.count && (
                        <Text style={styles.errorText}>{errors[index].count}</Text>
                      )}
                    </View>
                  </AnimatedTouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.info}>
              <InfoIcon stroke={COLORS.text} size={20} />
              <Text style={styles.infoText}>
                Los spans adicionales son opcionales y se calculan automáticamente
                basándose en el span principal. Puedes agregar hasta 4 spans adicionales.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

export default StepThreeWizard;