import type { Prestamo, PuntoMovimiento } from '@/types/database';

export const MOCK_PRESTAMOS: Prestamo[] = [
  {
    id: 'p1',
    empleado_id: 'emp1',
    monto_solicitado: 3000,
    monto_aprobado: 3000,
    plazo_quincenas: 8,
    descuento_por_quincena: 375,
    motivo: 'Reparacion de vivienda',
    estado: 'aprobado',
    fecha_solicitud: '2025-11-15T10:00:00Z',
    fecha_resolucion: '2025-11-18T14:30:00Z',
    notas_admin: null,
  },
  {
    id: 'p2',
    empleado_id: 'emp1',
    monto_solicitado: 5000,
    monto_aprobado: null,
    plazo_quincenas: 12,
    descuento_por_quincena: null,
    motivo: 'Gastos medicos',
    estado: 'pendiente',
    fecha_solicitud: '2026-03-20T08:00:00Z',
    fecha_resolucion: null,
    notas_admin: null,
  },
];

export const MOCK_PUNTOS: PuntoMovimiento[] = [
  {
    id: 'pt1',
    empleado_id: 'emp1',
    cantidad: 10,
    tipo: 'asistencia',
    descripcion: 'Asistencia completa semana 12',
    fecha_registro: '2026-03-22',
    created_at: '2026-03-22T06:00:00Z',
  },
  {
    id: 'pt2',
    empleado_id: 'emp1',
    cantidad: 5,
    tipo: 'puntualidad',
    descripcion: 'Puntualidad perfecta lunes a viernes',
    fecha_registro: '2026-03-22',
    created_at: '2026-03-22T06:00:00Z',
  },
  {
    id: 'pt3',
    empleado_id: 'emp1',
    cantidad: 20,
    tipo: 'bonus',
    descripcion: 'Reto: Semana sin rechazos',
    fecha_registro: '2026-03-15',
    created_at: '2026-03-15T06:00:00Z',
  },
  {
    id: 'pt4',
    empleado_id: 'emp1',
    cantidad: 10,
    tipo: 'asistencia',
    descripcion: 'Asistencia completa semana 11',
    fecha_registro: '2026-03-15',
    created_at: '2026-03-15T06:00:00Z',
  },
  {
    id: 'pt5',
    empleado_id: 'emp1',
    cantidad: 5,
    tipo: 'puntualidad',
    descripcion: 'Puntualidad perfecta lunes a viernes',
    fecha_registro: '2026-03-15',
    created_at: '2026-03-15T06:00:00Z',
  },
  {
    id: 'pt6',
    empleado_id: 'emp1',
    cantidad: 10,
    tipo: 'asistencia',
    descripcion: 'Asistencia completa semana 10',
    fecha_registro: '2026-03-08',
    created_at: '2026-03-08T06:00:00Z',
  },
  {
    id: 'pt7',
    empleado_id: 'emp1',
    cantidad: 15,
    tipo: 'bonus',
    descripcion: 'Reto: Eficiencia quimica',
    fecha_registro: '2026-03-08',
    created_at: '2026-03-08T06:00:00Z',
  },
  {
    id: 'pt8',
    empleado_id: 'emp1',
    cantidad: 10,
    tipo: 'asistencia',
    descripcion: 'Asistencia completa semana 9',
    fecha_registro: '2026-03-01',
    created_at: '2026-03-01T06:00:00Z',
  },
  {
    id: 'pt9',
    empleado_id: 'emp1',
    cantidad: 5,
    tipo: 'puntualidad',
    descripcion: 'Puntualidad perfecta lunes a viernes',
    fecha_registro: '2026-03-01',
    created_at: '2026-03-01T06:00:00Z',
  },
  {
    id: 'pt10',
    empleado_id: 'emp1',
    cantidad: 25,
    tipo: 'bonus',
    descripcion: 'Liga de equipos: Equipo ganador mes de febrero',
    fecha_registro: '2026-03-01',
    created_at: '2026-03-01T06:00:00Z',
  },
];

export function getMockPuntosTotal(): number {
  return MOCK_PUNTOS.reduce((sum, p) => sum + p.cantidad, 0);
}

export function getMockPuntosPorSemana(): { semana: string; total: number }[] {
  const semanas: Record<string, number> = {};
  for (const p of MOCK_PUNTOS) {
    const semana = p.fecha_registro;
    semanas[semana] = (semanas[semana] || 0) + p.cantidad;
  }
  return Object.entries(semanas)
    .map(([semana, total]) => ({ semana, total }))
    .sort((a, b) => a.semana.localeCompare(b.semana));
}
