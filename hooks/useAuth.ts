import { createContext, useContext } from 'react';
import type { Empleado } from '@/types/database';

export interface AuthState {
  user: Empleado | null;
  isLoading: boolean;
  login: (numeroEmpleado: string, pin: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
});

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
