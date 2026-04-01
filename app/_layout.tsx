import { useEffect, useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { AuthContext } from '../hooks/useAuth';
import { authenticateUser, getStoredUser, clearStoredUser } from '../lib/auth';
import type { Empleado } from '../types/database';
import { Colors } from '../lib/constants';

export default function RootLayout() {
  const [user, setUser] = useState<Empleado | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;

  useEffect(() => {
    getStoredUser().then((stored) => {
      setUser(stored);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (numeroEmpleado: string, pin: string) => {
    const result = await authenticateUser(numeroEmpleado, pin);
    if (result) {
      setUser(result);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    await clearStoredUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthContext.Provider>
  );
}
