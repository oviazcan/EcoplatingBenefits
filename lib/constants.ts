export const Colors = {
  light: {
    primary: '#043A8E',
    primaryLight: '#1A5FC9',
    primaryDark: '#032B6A',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    surfaceVariant: '#EEF1F6',
    text: '#1A1A2E',
    textSecondary: '#5A6178',
    textOnPrimary: '#FFFFFF',
    border: '#D1D9E6',
    success: '#16A34A',
    warning: '#EAB308',
    error: '#DC2626',
    info: '#0EA5E9',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E7EB',
    tabBarActive: '#043A8E',
    tabBarInactive: '#9CA3AF',
    card: '#FFFFFF',
    cardBorder: '#E5E7EB',
    badge: {
      general: '#6B7280',
      seguridad: '#EF4444',
      rrhh: '#8B5CF6',
      produccion: '#F59E0B',
    },
  },
  dark: {
    primary: '#3B7DDD',
    primaryLight: '#5A9AEE',
    primaryDark: '#043A8E',
    background: '#0D1117',
    surface: '#161B22',
    surfaceVariant: '#21262D',
    text: '#E6EDF3',
    textSecondary: '#8B949E',
    textOnPrimary: '#FFFFFF',
    border: '#30363D',
    success: '#22C55E',
    warning: '#FACC15',
    error: '#EF4444',
    info: '#38BDF8',
    tabBar: '#161B22',
    tabBarBorder: '#30363D',
    tabBarActive: '#3B7DDD',
    tabBarInactive: '#8B949E',
    card: '#161B22',
    cardBorder: '#30363D',
    badge: {
      general: '#8B949E',
      seguridad: '#F87171',
      rrhh: '#A78BFA',
      produccion: '#FBBF24',
    },
  },
};

export type ColorScheme = typeof Colors.light;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
