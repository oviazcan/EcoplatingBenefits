import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/theme';
import { Spacing, FontSize, BorderRadius } from '@/lib/constants';

const AVISOS_DETALLE: Record<string, { titulo: string; contenido: string; categoria: string; prioridad: string; fecha: string }> = {
  '1': {
    titulo: 'Nuevo protocolo de seguridad en banos de niquel',
    contenido: 'A partir del lunes 7 de abril, se implementa el nuevo protocolo de manejo de soluciones de niquel.\n\nTodos los operadores deben portar:\n\n- Guantes de nitrilo dobles\n- Careta facial completa\n- Mandil resistente a quimicos\n\nConsulta el manual actualizado en tu area de trabajo. Los supervisores realizaran verificacion de cumplimiento durante la primera semana.\n\nEn caso de dudas, acude con el Ing. Martinez en el area de Seguridad Industrial.',
    categoria: 'seguridad',
    prioridad: 'alta',
    fecha: '1 de abril, 2026',
  },
  '2': {
    titulo: 'Horarios de Semana Santa 2026',
    contenido: 'Les informamos los horarios especiales para Semana Santa:\n\n- Jueves 2 abril: horario normal\n- Viernes 3 abril: descanso obligatorio\n- Sabado 4 abril: descanso\n- Lunes 6 abril: horario normal\n\nLas guardias de mantenimiento se mantienen segun rol publicado.\n\nRecuerden que el pago quincenal del 15 de abril se mantiene sin cambios.',
    categoria: 'general',
    prioridad: 'normal',
    fecha: '28 de marzo, 2026',
  },
  '3': {
    titulo: 'Resultados de auditoria de calidad - Marzo 2026',
    contenido: 'Felicidades al equipo de Galvanoplastia turno matutino por obtener 98.5% en la auditoria de calidad de marzo.\n\nEste es el mejor resultado del trimestre.\n\nSe otorgaran 25 puntos bonus a todos los integrantes del equipo como reconocimiento a su excelente desempeno.\n\nSigan asi, su compromiso con la calidad hace la diferencia.',
    categoria: 'produccion',
    prioridad: 'normal',
    fecha: '25 de marzo, 2026',
  },
  '4': {
    titulo: 'Convocatoria: Platica de manejo del estres',
    contenido: 'El proximo miercoles 9 de abril a las 13:00 hrs en el comedor, nuestra psicologa organizacional impartira la platica:\n\n"Tecnicas para el manejo del estres laboral"\n\nTemas a tratar:\n- Identificacion de senales de estres\n- Tecnicas de respiracion y relajacion\n- Manejo de conflictos en equipo\n\nLa asistencia otorga 15 puntos bonus.\n\nCupo limitado a 40 personas. Confirma tu asistencia con tu supervisor directo.',
    categoria: 'rrhh',
    prioridad: 'normal',
    fecha: '24 de marzo, 2026',
  },
  '5': {
    titulo: 'Mantenimiento programado: Linea 3',
    contenido: 'Se informa que la Linea 3 de cromado estara fuera de servicio del 10 al 12 de abril por mantenimiento preventivo.\n\nAcciones:\n- Los pedidos asignados a Linea 3 se redistribuiran a Lineas 1 y 2\n- Supervisores confirmaran nuevas asignaciones a mas tardar el 8 de abril\n- Personal de Linea 3 apoyara en areas asignadas por su supervisor\n\nAgradecemos su comprension y flexibilidad.',
    categoria: 'produccion',
    prioridad: 'alta',
    fecha: '22 de marzo, 2026',
  },
};

export default function AvisoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();
  const aviso = AVISOS_DETALLE[id || '1'];

  if (!aviso) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 40 }}>
          Aviso no encontrado
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Detalle', headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }} />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
        <View style={styles.metaRow}>
          <View
            style={[
              styles.categoriaBadge,
              { backgroundColor: colors.badge[aviso.categoria as keyof typeof colors.badge] + '20' },
            ]}
          >
            <Text style={[styles.categoriaText, { color: colors.badge[aviso.categoria as keyof typeof colors.badge] }]}>
              {aviso.categoria.toUpperCase()}
            </Text>
          </View>
          {aviso.prioridad === 'alta' && (
            <View style={[styles.prioridadBadge, { backgroundColor: colors.error + '15' }]}>
              <Ionicons name="alert-circle" size={14} color={colors.error} />
              <Text style={[styles.prioridadText, { color: colors.error }]}>URGENTE</Text>
            </View>
          )}
        </View>

        <Text style={[styles.titulo, { color: colors.text }]}>{aviso.titulo}</Text>
        <Text style={[styles.fecha, { color: colors.textSecondary }]}>{aviso.fecha}</Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.contenido, { color: colors.text }]}>{aviso.contenido}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  metaRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  categoriaBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoriaText: { fontSize: FontSize.xs, fontWeight: '700', letterSpacing: 0.5 },
  prioridadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  prioridadText: { fontSize: FontSize.xs, fontWeight: '700' },
  titulo: { fontSize: FontSize.xxl, fontWeight: '700', lineHeight: 30 },
  fecha: { fontSize: FontSize.sm, marginTop: Spacing.sm },
  divider: { height: 1, marginVertical: Spacing.lg },
  contenido: { fontSize: FontSize.base, lineHeight: 26 },
});
