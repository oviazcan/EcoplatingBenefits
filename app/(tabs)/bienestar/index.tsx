import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/theme';
import { Spacing, FontSize, BorderRadius } from '@/lib/constants';

const TIPS = [
  {
    icon: 'moon-outline' as const,
    titulo: 'Descansa bien',
    descripcion: 'Dormir 7-8 horas mejora tu concentracion y reduce el riesgo de accidentes.',
  },
  {
    icon: 'water-outline' as const,
    titulo: 'Hidratate',
    descripcion: 'Toma al menos 2 litros de agua al dia, especialmente en areas de alta temperatura.',
  },
  {
    icon: 'people-outline' as const,
    titulo: 'Habla con alguien',
    descripcion: 'Si algo te preocupa, compartirlo con un companero o profesional siempre ayuda.',
  },
  {
    icon: 'fitness-outline' as const,
    titulo: 'Muevete',
    descripcion: '10 minutos de estiramiento al dia pueden reducir el dolor muscular y el estres.',
  },
];

export default function BienestarScreen() {
  const colors = useTheme();

  const handleContacto = () => {
    // En produccion: numero real de la linea de atencion
    Linking.openURL('tel:+525500000000');
  };

  const handleWhatsApp = () => {
    // En produccion: numero real del psicologo
    Linking.openURL('https://wa.me/525500000000?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20cita%20de%20atenci%C3%B3n%20psicol%C3%B3gica');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Main CTA */}
      <View style={[styles.mainCard, { backgroundColor: colors.primary }]}>
        <Ionicons name="heart-circle" size={48} color="#FFFFFF" />
        <Text style={styles.mainTitle}>Atencion Psicologica</Text>
        <Text style={styles.mainSubtitle}>
          Servicio gratuito y confidencial para todos los colaboradores de Ecoplating.
          Cumplimiento NOM-035-STPS-2018.
        </Text>

        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={handleWhatsApp}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
          <Text style={styles.whatsappText}>Solicitar cita por WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.phoneButton}
          onPress={handleContacto}
          activeOpacity={0.8}
        >
          <Ionicons name="call-outline" size={20} color="#FFFFFF" />
          <Text style={styles.phoneText}>Llamar a linea de atencion</Text>
        </TouchableOpacity>
      </View>

      {/* Confidentiality notice */}
      <View style={[styles.noticeCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="shield-checkmark" size={24} color={colors.success} />
        <View style={styles.noticeTextContainer}>
          <Text style={[styles.noticeTitle, { color: colors.text }]}>
            100% Confidencial
          </Text>
          <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
            Tu informacion es privada. Ni tu supervisor ni RRHH tendran acceso a los detalles de tu consulta.
          </Text>
        </View>
      </View>

      {/* Tips */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Tips de bienestar
      </Text>
      {TIPS.map((tip, index) => (
        <View
          key={index}
          style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        >
          <View style={[styles.tipIconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name={tip.icon} size={24} color={colors.primary} />
          </View>
          <View style={styles.tipTextContainer}>
            <Text style={[styles.tipTitle, { color: colors.text }]}>{tip.titulo}</Text>
            <Text style={[styles.tipDesc, { color: colors.textSecondary }]}>
              {tip.descripcion}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  mainCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  mainTitle: { color: '#FFFFFF', fontSize: FontSize.xxl, fontWeight: '700', marginTop: Spacing.sm },
  mainSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    width: '100%',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  whatsappText: { fontSize: FontSize.base, fontWeight: '700', color: '#1A1A2E' },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    width: '100%',
    justifyContent: 'center',
  },
  phoneText: { color: '#FFFFFF', fontSize: FontSize.base, fontWeight: '600' },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  noticeTextContainer: { flex: 1 },
  noticeTitle: { fontSize: FontSize.base, fontWeight: '700', marginBottom: 2 },
  noticeText: { fontSize: FontSize.sm, lineHeight: 20 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.sm },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTextContainer: { flex: 1 },
  tipTitle: { fontSize: FontSize.base, fontWeight: '700', marginBottom: 2 },
  tipDesc: { fontSize: FontSize.sm, lineHeight: 20 },
});
