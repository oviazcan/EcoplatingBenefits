import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/lib/theme';
import { Spacing, FontSize, BorderRadius } from '@/lib/constants';

export default function LoginScreen() {
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const colors = useTheme();

  const handleLogin = async () => {
    if (!numeroEmpleado.trim()) {
      setError('Ingresa tu numero de empleado');
      return;
    }
    if (pin.length < 4) {
      setError('El PIN debe ser de 4 digitos');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const success = await login(numeroEmpleado.trim(), pin);
      if (success) {
        router.replace('/(tabs)/inicio');
      } else {
        setError('Numero de empleado o PIN incorrecto');
      }
    } catch {
      setError('Error de conexion. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Logo area */}
        <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.logoText}>e</Text>
          <Text style={styles.logoTitle}>ECOPLATING</Text>
          <Text style={styles.logoSubtitle}>EXPERTOS EN ACABADOS</Text>
        </View>

        {/* Form */}
        <View style={[styles.form, { backgroundColor: colors.surface }]}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Bienvenido
          </Text>
          <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
            Ingresa con tu numero de empleado y PIN
          </Text>

          {error ? (
            <View style={[styles.errorBox, { backgroundColor: colors.error + '15' }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>
                {error}
              </Text>
            </View>
          ) : null}

          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Numero de empleado
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surfaceVariant,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Ej: 001"
            placeholderTextColor={colors.textSecondary}
            keyboardType="number-pad"
            maxLength={5}
            value={numeroEmpleado}
            onChangeText={(text) => {
              setNumeroEmpleado(text);
              setError('');
            }}
          />

          <Text style={[styles.label, { color: colors.textSecondary }]}>
            PIN
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surfaceVariant,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="4 digitos"
            placeholderTextColor={colors.textSecondary}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={4}
            value={pin}
            onChangeText={(text) => {
              setPin(text);
              setError('');
            }}
          />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.primary },
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.helpText, { color: colors.textSecondary }]}>
            PIN de demo: 1234
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingTop: 60,
  },
  logoText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  logoTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginTop: Spacing.xs,
  },
  logoSubtitle: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
    marginTop: Spacing.xs,
  },
  form: {
    flex: 1,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  welcomeText: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  instructionText: {
    fontSize: FontSize.base,
    marginBottom: Spacing.lg,
  },
  errorBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  errorText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.lg,
    fontWeight: '600',
    letterSpacing: 2,
  },
  button: {
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  helpText: {
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
