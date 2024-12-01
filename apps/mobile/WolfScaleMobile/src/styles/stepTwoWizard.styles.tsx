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
  form: {
    marginBottom: 20,
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.surface,
    borderRadius: 8,
    color: COLORS.text,
    fontSize: 16,
    padding: 12,
    paddingRight: 40,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorIcon: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: 4,
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