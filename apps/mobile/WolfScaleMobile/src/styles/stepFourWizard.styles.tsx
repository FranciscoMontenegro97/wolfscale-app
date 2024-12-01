import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#222831',
  surface: '#30475E',
  primary: '#F05454',
  text: '#DDDDDD',
  error: '#F05454'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100, // Más espacio para el scroll
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.8,
  },
  resultsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    color: COLORS.text,
    opacity: 0.8,
    fontSize: 14,
  },
  resultValue: {
    color: COLORS.text,
    fontWeight: '500',
    fontSize: 14,
  },
  percentageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.surface,
    borderRadius: 8,
    color: COLORS.text,
    fontSize: 16,
    padding: 12,
  },
  calculateButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  percentageResult: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  percentageResultText: {
    color: COLORS.text,
    fontSize: 14,
  },
  info: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    gap: 12,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 14,
  },
});