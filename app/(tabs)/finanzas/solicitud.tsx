import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/theme';
import { Spacing, FontSize, BorderRadius } from '@/lib/constants';

const MONTOS = [1000, 2000, 3000, 5000];
const PLAZOS = [4, 8, 12];

export default function SolicitudScreen() {
  const colors = useTheme();
  const [montoSeleccionado, setMontoSeleccionado] = useState<number | null>(null);
  const [plazoSeleccionado, setPlazoSeleccionado] = useState<number | null>(null);
  const [motivo, setMotivo] = useState('');
  const [enviado, setEnviado] = useState(false);

  const descuento =
    montoSeleccionado && plazoSeleccionado
      ? Math.ceil(montoSeleccionado / plazoSeleccionado)
      : null;

  const handleEnviar = () => {
    if (!montoSeleccionado || !plazoSeleccionado) {
      Alert.alert('Datos incompletos', 'Selecciona monto y plazo para continuar.');
      return;
    }
    setEnviado(true);
  };

  if (enviado) {
    return (
      <>
        <Stack.Screen
          options={{ headerShown: true, headerTitle: 'Solicitud enviada', headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }}
        />
        <View style={[styles.successContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.successIcon, { backgroundColor: colors.success + '15' }]}>
            <Ionicons name="checkmark-circle" size={80} color={colors.success} />
          </View>
          <Text style={[styles.successTitle, { color: colors.text }]}>
            Solicitud enviada
          </Text>
          <Text style={[styles.successSubtitle, { color: colors.textSecondary }]}>
            Tu solicitud de prestamo por ${montoSeleccionado?.toLocaleString('es-MX')} ha sido
            registrada. Te notificaremos cuando sea revisada.
          </Text>
          <Text style={[styles.folio, { color: colors.textSecondary }]}>
            Folio: ECO-{Date.now().toString().slice(-6)}
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Volver a Finanzas</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, headerTitle: 'Solicitar Prestamo', headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        {/* Monto */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Monto del prestamo
        </Text>
        <View style={styles.optionsGrid}>
          {MONTOS.map((monto) => (
            <TouchableOpacity
              key={monto}
              style={[
                styles.optionButton,
                { borderColor: colors.border, backgroundColor: colors.card },
                montoSeleccionado === monto && {
                  borderColor: colors.primary,
                  backgroundColor: colors.primary + '10',
                },
              ]}
              onPress={() => setMontoSeleccionado(monto)}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: colors.text },
                  montoSeleccionado === monto && { color: colors.primary, fontWeight: '700' },
                ]}
              >
                ${monto.toLocaleString('es-MX')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plazo */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Plazo de pago
        </Text>
        <View style={styles.optionsRow}>
          {PLAZOS.map((plazo) => (
            <TouchableOpacity
              key={plazo}
              style={[
                styles.plazoButton,
                { borderColor: colors.border, backgroundColor: colors.card },
                plazoSeleccionado === plazo && {
                  borderColor: colors.primary,
                  backgroundColor: colors.primary + '10',
                },
              ]}
              onPress={() => setPlazoSeleccionado(plazo)}
            >
              <Text
                style={[
                  styles.plazoNumber,
                  { color: colors.text },
                  plazoSeleccionado === plazo && { color: colors.primary },
                ]}
              >
                {plazo}
              </Text>
              <Text
                style={[
                  styles.plazoLabel,
                  { color: colors.textSecondary },
                  plazoSeleccionado === plazo && { color: colors.primary },
                ]}
              >
                quincenas
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calculo en tiempo real */}
        {descuento !== null && (
          <View style={[styles.calculoCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
            <Text style={[styles.calculoLabel, { color: colors.primary }]}>
              Descuento quincenal estimado
            </Text>
            <Text style={[styles.calculoValue, { color: colors.primary }]}>
              ${descuento.toLocaleString('es-MX')}
            </Text>
            <Text style={[styles.calculoDetail, { color: colors.textSecondary }]}>
              ${montoSeleccionado?.toLocaleString('es-MX')} / {plazoSeleccionado} quincenas
            </Text>
          </View>
        )}

        {/* Motivo */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Motivo (opcional)
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Describe brevemente el motivo del prestamo"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={3}
          value={motivo}
          onChangeText={setMotivo}
          textAlignVertical="top"
        />

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: colors.primary },
            (!montoSeleccionado || !plazoSeleccionado) && styles.submitDisabled,
          ]}
          onPress={handleEnviar}
          disabled={!montoSeleccionado || !plazoSeleccionado}
          activeOpacity={0.8}
        >
          <Text style={styles.submitText}>Enviar solicitud</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.sm, marginTop: Spacing.md },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  optionButton: {
    width: '47%',
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 2,
  },
  optionText: { fontSize: FontSize.xl, fontWeight: '600' },
  optionsRow: { flexDirection: 'row', gap: Spacing.sm },
  plazoButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
  },
  plazoNumber: { fontSize: FontSize.xxl, fontWeight: '700' },
  plazoLabel: { fontSize: FontSize.xs },
  calculoCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  calculoLabel: { fontSize: FontSize.sm, fontWeight: '600' },
  calculoValue: { fontSize: 36, fontWeight: '700', marginVertical: Spacing.xs },
  calculoDetail: { fontSize: FontSize.sm },
  textArea: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSize.base,
    minHeight: 80,
  },
  submitButton: {
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  submitDisabled: { opacity: 0.5 },
  submitText: { color: '#FFFFFF', fontSize: FontSize.lg, fontWeight: '700' },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  successTitle: { fontSize: FontSize.xxl, fontWeight: '700', marginBottom: Spacing.sm },
  successSubtitle: { fontSize: FontSize.base, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.sm },
  folio: { fontSize: FontSize.sm, fontWeight: '600', marginBottom: Spacing.xl },
  backButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  backButtonText: { color: '#FFFFFF', fontSize: FontSize.base, fontWeight: '700' },
});
