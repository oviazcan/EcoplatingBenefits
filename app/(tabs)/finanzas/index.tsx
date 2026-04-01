import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useTheme } from '@/lib/theme';
import { MOCK_PRESTAMOS } from '@/lib/mock-data';
import { Spacing, FontSize, BorderRadius } from '@/lib/constants';

const ESTADO_CONFIG = {
  pendiente: { icon: 'time' as const, color: '#EAB308', label: 'Pendiente' },
  aprobado: { icon: 'checkmark-circle' as const, color: '#16A34A', label: 'Aprobado' },
  rechazado: { icon: 'close-circle' as const, color: '#DC2626', label: 'Rechazado' },
  pagado: { icon: 'checkmark-done-circle' as const, color: '#6B7280', label: 'Pagado' },
};

export default function FinanzasScreen() {
  const colors = useTheme();

  const formatMoney = (amount: number) =>
    `$${amount.toLocaleString('es-MX', { minimumFractionDigits: 0 })}`;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* CTA */}
      <TouchableOpacity
        style={[styles.ctaCard, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/(tabs)/finanzas/solicitud')}
        activeOpacity={0.8}
      >
        <View style={styles.ctaContent}>
          <Ionicons name="cash-outline" size={40} color="#FFFFFF" />
          <View style={styles.ctaText}>
            <Text style={styles.ctaTitle}>Solicitar Prestamo</Text>
            <Text style={styles.ctaSubtitle}>
              Descuento directo por nomina. Sin intermediarios.
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.7)" />
      </TouchableOpacity>

      {/* Info card */}
      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="information-circle-outline" size={20} color={colors.info} />
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Los prestamos se descuentan directamente de tu nomina quincenal. Sin intereses en la fase piloto.
        </Text>
      </View>

      {/* Mis solicitudes */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Mis solicitudes
      </Text>

      {MOCK_PRESTAMOS.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Ionicons name="document-text-outline" size={48} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Aun no tienes solicitudes de prestamo
          </Text>
        </View>
      ) : (
        MOCK_PRESTAMOS.map((prestamo) => {
          const estado = ESTADO_CONFIG[prestamo.estado];
          return (
            <View
              key={prestamo.id}
              style={[styles.prestamoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            >
              <View style={styles.prestamoHeader}>
                <View style={styles.prestamoEstado}>
                  <Ionicons name={estado.icon} size={20} color={estado.color} />
                  <Text style={[styles.estadoText, { color: estado.color }]}>
                    {estado.label}
                  </Text>
                </View>
                <Text style={[styles.prestamoFecha, { color: colors.textSecondary }]}>
                  {new Date(prestamo.fecha_solicitud).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>

              <View style={styles.prestamoMontos}>
                <View>
                  <Text style={[styles.montoLabel, { color: colors.textSecondary }]}>Solicitado</Text>
                  <Text style={[styles.montoValue, { color: colors.text }]}>
                    {formatMoney(prestamo.monto_solicitado)}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.montoLabel, { color: colors.textSecondary }]}>Plazo</Text>
                  <Text style={[styles.montoValue, { color: colors.text }]}>
                    {prestamo.plazo_quincenas} quincenas
                  </Text>
                </View>
                {prestamo.descuento_por_quincena && (
                  <View>
                    <Text style={[styles.montoLabel, { color: colors.textSecondary }]}>Descuento</Text>
                    <Text style={[styles.montoValue, { color: colors.text }]}>
                      {formatMoney(prestamo.descuento_por_quincena)}/qna
                    </Text>
                  </View>
                )}
              </View>

              {prestamo.motivo && (
                <Text style={[styles.motivo, { color: colors.textSecondary }]}>
                  Motivo: {prestamo.motivo}
                </Text>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  ctaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  ctaContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  ctaText: { flex: 1 },
  ctaTitle: { color: '#FFFFFF', fontSize: FontSize.xl, fontWeight: '700' },
  ctaSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.sm, marginTop: 2 },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  infoText: { fontSize: FontSize.sm, flex: 1, lineHeight: 20 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.sm },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.md,
  },
  emptyText: { fontSize: FontSize.base, textAlign: 'center' },
  prestamoCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  prestamoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  prestamoEstado: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  estadoText: { fontSize: FontSize.sm, fontWeight: '700' },
  prestamoFecha: { fontSize: FontSize.xs },
  prestamoMontos: { flexDirection: 'row', justifyContent: 'space-between' },
  montoLabel: { fontSize: FontSize.xs, marginBottom: 2 },
  montoValue: { fontSize: FontSize.base, fontWeight: '700' },
  motivo: { fontSize: FontSize.sm, marginTop: Spacing.sm, fontStyle: 'italic' },
});
