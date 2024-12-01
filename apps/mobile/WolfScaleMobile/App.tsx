import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CurveWizard from './src/components/CurveWizard';

export default function App() {
  return (
    <SafeAreaProvider>
      <CurveWizard />
    </SafeAreaProvider>
  );
}