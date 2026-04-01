import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../lib/theme';
import { MOCK_PUNTOS, getMockPuntosTotal, getMockPuntosPorSemana } from '../../../lib/mock-data';
import { getNivel } from '../../../types/database';
import { Spacing, FontSize, BorderRadius } from '../../../lib/constants';

const NIVEL_CONFIG = {
  Bronce: { color: '#CD7F32', icon: 'shield' as const, next: 150, label: 'Plata' },
  Plata: { color: '#C0C0C0', icon: 'shield' as const, next: 300, label: 'Oro' },
  Oro: { color: '#FFD700', icon: 'shield' as const, next: 500, label: 'Platino' },
  Platino: { color: '#E5E4E2', icon: 'diamond' as const, next: null, label: null },
};

const TIPO_CONFIG = {
  asistencia: { icon: 'calendar-outline' as const, color: '#16A34A' },
  puntualidad: { icon: 'time-outline' as const, color: '#0EA5E9' },
  bonus: { icon: 'trophy-outline' as const, color: '#EAB308' },
};

export default function PuntosScreen() {
  const colors = useTheme();
  const totalPuntos = getMockPuntosTotal();
  const nivel = getNivel(totalPuntos);
  const nivelConfig = NIVEL_CONFIG[nivel];
  const semanas = getMockPuntosPorSemana();
  const maxSemana = Math.max(...semanas.map((s) => s.total));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Total & Level */}
      <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Puntos acumulados</Text>
            <Text style={styles.totalNumber}>{totalPuntos}</Text>
          </View>
          <View style={[styles.nivelCircle, { borderColor: nivelConfig.color }]}>
            <Ionicons name={nivelConfig.icon} size={28} color={nivelConfig.color} />
            <Text style={[styles.nivelText, { color: nivelConfig.color }]}>{nivel}</Text>
          </View>
        </View>

        {nivelConfig.next && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: nivelConfig.color,
                    width: `${Math.min((totalPuntos / nivelConfig.next) * 100, 100)}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {nivelConfig.next - totalPuntos} puntos para nivel {nivelConfig.label}
            </Text>
          </View>
        )}
      </View>

      {/* Simple bar chart */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Puntos por semana
      </Text>
      <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        {semanas.map((semana, index) => (
          <View key={index} style={styles.chartRow}>
            <Text style={[styles.chartLabel, { color: colors.textSecondary }]}>
              {new Date(semana.semana).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
            </Text>
            <View style={styles.chartBarContainer}>
              <View
                style={[
                  styles.chartBar,
                  {
                    backgroundColor: colors.primary,
                    width: `${(semana.total / maxSemana) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.chartValue, { color: colors.text }]}>{semana.total}</Text>
          </View>
        ))}
      </View>

      {/* History */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Historial de movimientos
      </Text>
      {MOCK_PUNTOS.map((punto) => {
        const tipoConfig = TIPO_CONFIG[punto.tipo];
        return (
          <View
            key={punto.id}
            style={[styles.movimientoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          >
            <View style={[styles.movIconContainer, { backgroundColor: tipoConfig.color + '15' }]}>
              <Ionicons name={tipoConfig.icon} size={20} color={tipoConfig.color} />
            </View>
            <View style={styles.movTextContainer}>
              <Text style={[styles.movDesc, { color: colors.text }]} numberOfLines={1}>
                {punto.descripcion}
              </Text>
              <Text style={[styles.movFecha, { color: colors.textSecondary }]}>
                {new Date(punto.fecha_registro).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'short',
                })}
              </Text>
            </View>
            <Text style={[styles.movPuntos, { color: tipoConfig.color }]}>
              +{punto.cantidad}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  totalCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.base },
  totalNumber: { color: '#FFFFFF', fontSize: 48, fontWeight: '700' },
  nivelCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  nivelText: { fontSize: FontSize.xs, fontWeight: '700', marginTop: 2 },
  progressContainer: { marginTop: Spacing.md },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.sm },
  chartCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  chartRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  chartLabel: { fontSize: FontSize.xs, width: 50 },
  chartBarContainer: { flex: 1, height: 20, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4 },
  chartBar: { height: '100%', borderRadius: 4, minWidth: 4 },
  chartValue: { fontSize: FontSize.sm, fontWeight: '700', width: 30, textAlign: 'right' },
  movimientoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.xs,
  },
  movIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movTextContainer: { flex: 1 },
  movDesc: { fontSize: FontSize.sm, fontWeight: '600' },
  movFecha: { fontSize: FontSize.xs, marginTop: 2 },
  movPuntos: { fontSize: FontSize.lg, fontWeight: '700' },
});
