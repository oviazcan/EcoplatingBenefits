import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/lib/theme';
import { Spacing, FontSize, BorderRadius } from '@/lib/constants';
import type { Aviso } from '@/types/database';

// Demo data - en produccion viene de Supabase
const AVISOS: (Aviso & { leido: boolean })[] = [
  {
    id: '1',
    titulo: 'Nuevo protocolo de seguridad en banos de niquel',
    contenido: 'A partir del lunes 7 de abril...',
    categoria: 'seguridad',
    prioridad: 'alta',
    publicado_por: null,
    visible_desde: '2026-04-01T08:00:00Z',
    activo: true,
    created_at: '2026-04-01T08:00:00Z',
    leido: false,
  },
  {
    id: '2',
    titulo: 'Horarios de Semana Santa 2026',
    contenido: 'Les informamos los horarios especiales...',
    categoria: 'general',
    prioridad: 'normal',
    publicado_por: null,
    visible_desde: '2026-03-28T10:00:00Z',
    activo: true,
    created_at: '2026-03-28T10:00:00Z',
    leido: true,
  },
  {
    id: '3',
    titulo: 'Resultados de auditoria de calidad - Marzo 2026',
    contenido: 'Felicidades al equipo de Galvanoplastia...',
    categoria: 'produccion',
    prioridad: 'normal',
    publicado_por: null,
    visible_desde: '2026-03-25T14:00:00Z',
    activo: true,
    created_at: '2026-03-25T14:00:00Z',
    leido: false,
  },
  {
    id: '4',
    titulo: 'Convocatoria: Platica de manejo del estres',
    contenido: 'El proximo miercoles 9 de abril...',
    categoria: 'rrhh',
    prioridad: 'normal',
    publicado_por: null,
    visible_desde: '2026-03-24T09:00:00Z',
    activo: true,
    created_at: '2026-03-24T09:00:00Z',
    leido: true,
  },
  {
    id: '5',
    titulo: 'Mantenimiento programado: Linea 3',
    contenido: 'Se informa que la Linea 3 de cromado...',
    categoria: 'produccion',
    prioridad: 'alta',
    publicado_por: null,
    visible_desde: '2026-03-22T11:00:00Z',
    activo: true,
    created_at: '2026-03-22T11:00:00Z',
    leido: true,
  },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} dias`;
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

export default function ComunicacionScreen() {
  const colors = useTheme();

  const renderAviso = ({ item }: { item: (typeof AVISOS)[0] }) => (
    <TouchableOpacity
      style={[styles.avisoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => router.push(`/(tabs)/comunicacion/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.avisoHeader}>
        <View style={styles.avisoHeaderLeft}>
          {!item.leido && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
          <View
            style={[
              styles.categoriaBadge,
              { backgroundColor: colors.badge[item.categoria] + '20' },
            ]}
          >
            <Text style={[styles.categoriaText, { color: colors.badge[item.categoria] }]}>
              {item.categoria.toUpperCase()}
            </Text>
          </View>
          {item.prioridad === 'alta' && (
            <View style={[styles.prioridadBadge, { backgroundColor: colors.error + '15' }]}>
              <Ionicons name="alert-circle" size={12} color={colors.error} />
              <Text style={[styles.prioridadText, { color: colors.error }]}>URGENTE</Text>
            </View>
          )}
        </View>
        <Text style={[styles.fecha, { color: colors.textSecondary }]}>
          {formatDate(item.created_at)}
        </Text>
      </View>

      <Text
        style={[
          styles.avisoTitulo,
          { color: colors.text },
          !item.leido && styles.avisoTituloUnread,
        ]}
        numberOfLines={2}
      >
        {item.titulo}
      </Text>

      <View style={styles.avisoFooter}>
        <Text style={[styles.leerMas, { color: colors.primary }]}>Leer mas</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={AVISOS}
        renderItem={renderAviso}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.md, gap: Spacing.sm },
  avisoCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  avisoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avisoHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  categoriaBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  categoriaText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  prioridadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  prioridadText: { fontSize: 10, fontWeight: '700' },
  fecha: { fontSize: FontSize.xs },
  avisoTitulo: { fontSize: FontSize.base, lineHeight: 22 },
  avisoTituloUnread: { fontWeight: '700' },
  avisoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  leerMas: { fontSize: FontSize.sm, fontWeight: '600' },
});
