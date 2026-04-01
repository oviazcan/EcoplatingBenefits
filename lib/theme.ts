import { useColorScheme } from 'react-native';
import { Colors, type ColorScheme } from './constants';

export function useTheme(): ColorScheme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? Colors.dark : Colors.light;
}
