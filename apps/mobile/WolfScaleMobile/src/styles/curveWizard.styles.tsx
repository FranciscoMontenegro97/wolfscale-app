import { StyleSheet } from 'react-native';

// Constantes de colores
export const COLORS = {
  background: '#222831',
  surface: '#30475E',
  primary: '#F05454',
  text: '#DDDDDD',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
  },
  connector: {
    position: 'absolute',
    top: '50%',
    left: 25,
    right: 0,
    height: 2,
    backgroundColor: COLORS.surface,
  },
  connectorActive: {
    backgroundColor: COLORS.primary,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  circleActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  circleCompleted: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  circleText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    marginLeft: 15,
    flex: 1,
  },
  stepTitle: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  stepTitleActive: {
    color: COLORS.text,
  },
  stepDescription: {
    color: COLORS.surface,
    fontSize: 12,
    paddingTop: 2, // Añadido para separar de la línea
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  buttonPrevious: {
    backgroundColor: COLORS.surface,
  },
  buttonNext: {
    backgroundColor: COLORS.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    marginHorizontal: 8,
  },
});