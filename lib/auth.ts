import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Empleado } from '../types/database';

const USER_KEY = '@ecoplating_user';

// Para la demo: usuarios hardcodeados hasta conectar Supabase
const DEMO_USERS: Empleado[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    numero_empleado: '001',
    nombre_completo: 'Carlos Martinez Lopez',
    departamento: 'Galvanoplastia',
    turno: 'Matutino',
    fecha_ingreso: '2020-03-15',
    activo: true,
    es_admin: false,
    created_at: '2020-03-15T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    numero_empleado: '002',
    nombre_completo: 'Maria Elena Ruiz',
    departamento: 'Calidad',
    turno: 'Matutino',
    fecha_ingreso: '2019-08-01',
    activo: true,
    es_admin: false,
    created_at: '2019-08-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    numero_empleado: '003',
    nombre_completo: 'Juan Pablo Hernandez',
    departamento: 'Produccion',
    turno: 'Vespertino',
    fecha_ingreso: '2021-01-10',
    activo: true,
    es_admin: false,
    created_at: '2021-01-10T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    numero_empleado: '004',
    nombre_completo: 'Ana Sofia Morales',
    departamento: 'RRHH',
    turno: 'Matutino',
    fecha_ingreso: '2018-06-20',
    activo: true,
    es_admin: true,
    created_at: '2018-06-20T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    numero_empleado: '005',
    nombre_completo: 'Roberto Sanchez Villa',
    departamento: 'Galvanoplastia',
    turno: 'Nocturno',
    fecha_ingreso: '2022-02-14',
    activo: true,
    es_admin: false,
    created_at: '2022-02-14T00:00:00Z',
  },
];

const DEMO_PIN = '1234';

export async function authenticateUser(
  numeroEmpleado: string,
  pin: string
): Promise<Empleado | null> {
  // Demo: validar contra usuarios locales con PIN fijo
  // En produccion: llamar a Supabase Edge Function
  if (pin !== DEMO_PIN) return null;

  const user = DEMO_USERS.find(
    (u) => u.numero_empleado === numeroEmpleado.padStart(3, '0')
  );

  if (!user || !user.activo) return null;

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function getStoredUser(): Promise<Empleado | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  if (!data) return null;
  return JSON.parse(data) as Empleado;
}

export async function clearStoredUser(): Promise<void> {
  await AsyncStorage.removeItem(USER_KEY);
}
