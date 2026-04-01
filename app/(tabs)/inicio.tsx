import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/lib/theme';
import { getMockPuntosTotal } from '@/lib/mock-data';
import { getNivel } from '@/types/database';
import { Spacing, FontSize, BorderRadius } from '@/lib/constants';

const AVISOS_RECIENTES = [
  {
    id: '1',
    titulo: 'Nuevo protocolo de seguridad en banos de niquel',
    categoria: 'seguridad' as const,
    prioridad: 'alta' as const,
  },
  {
    id: '2',
    titulo: 'Horarios de Semana Santa 2026',
    categoria: 'general' as const,
    prioridad: 'normal' as const,
  },
];

export default function InicioScreen() {
  const { user, logout } = useAuth();
  const colors = useTheme();
  const totalPuntos = getMockPuntosTotal();
  const nivel = getNivel(totalPuntos);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos dias';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const firstName = user?.nombre_completo.split(' ')[0] || 'Empleado';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Greeting */}
      <View style={[styles.greetingCard, { backgroundColor: colors.primary }]}>
        <View style={styles.greetingRow}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingSmall}>{getGreeting()}</Text>
            <Text style={styles.greetingName}>{firstName}</Text>
            <Text style={styles.greetingDept}>
              {user?.departamento} · Turno {user?.turno}
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        {/* Puntos summary */}
        <View style={styles.puntosRow}>
          <View style={styles.puntosInfo}>
            <Ionicons name="star" size={20} color="#FACC15" />
            <Text style={styles.puntosNumber}>{totalPuntos}</Text>
            <Text style={styles.puntosLabel}>puntos</Text>
          </View>
          <View style={styles.nivelBadge}>
            <Text style={styles.nivelText}>{nivel}</Text>
          </View>
        </View>
      </View>

      {/* Quick access */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Acceso rapido
      </Text>
      <View style={styles.quickAccessGrid}>
        {[
          { icon: 'wallet' as const, label: 'Solicitar\nPrestamo', route: '/(tabs)/finanzas' },
          { icon: 'megaphone' as const, label: 'Ver\nAvisos', route: '/(tabs)/comunicacion' },
          { icon: 'heart' as const, label: 'Atencion\nPsicologica', route: '/(tabs)/bienestar' },
          { icon: 'star' as const, label: 'Mis\nPuntos', route: '/(tabs)/puntos' },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.quickAccessItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
          >
            <Ionicons name={item.icon} size={28} color={colors.primary} />
            <Text style={[styles.quickAccessLabel, { color: colors.text }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Latest announcements */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Avisos recientes
      </Text>
      {AVISOS_RECIENTES.map((aviso) => (
        <TouchableOpacity
          key={aviso.id}
          style={[styles.avisoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          onPress={() => router.push('/(tabs)/comunicacion')}
          activeOpacity={0.7}
        >
          <View style={styles.avisoRow}>
            <View
              style={[
                styles.categoriaBadge,
                { backgroundColor: colors.badge[aviso.categoria] + '20' },
              ]}
            >
              <Text style={[styles.categoriaText, { color: colors.badge[aviso.categoria] }]}>
                {aviso.categoria.toUpperCase()}
              </Text>
            </View>
            {aviso.prioridad === 'alta' && (
              <Ionicons name="alert-circle" size={16} color={colors.error} />
            )}
          </View>
          <Text style={[styles.avisoTitulo, { color: colors.text }]} numberOfLines={2}>
            {aviso.titulo}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { paddingBottom: Spacing.xl },
  greetingCard: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingTextContainer: { flex: 1 },
  greetingSmall: { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.base },
  greetingName: { color: '#FFFFFF', fontSize: FontSize.xxxl, fontWeight: '700' },
  greetingDept: { color: 'rgba(255,255,255,0.7)', fontSize: FontSize.sm, marginTop: 2 },
  logoutButton: { padding: Spacing.sm },
  puntosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  puntosInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  puntosNumber: { color: '#FFFFFF', fontSize: FontSize.xl, fontWeight: '700' },
  puntosLabel: { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.sm },
  nivelBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  nivelText: { color: '#FFFFFF', fontSize: FontSize.sm, fontWeight: '700' },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  quickAccessItem: {
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  quickAccessLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  avisoCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  avisoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  categoriaBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  categoriaText: { fontSize: FontSize.xs, fontWeight: '700' },
  avisoTitulo: { fontSize: FontSize.base, fontWeight: '500' },
});
