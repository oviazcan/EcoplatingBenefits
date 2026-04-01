export interface Empleado {
  id: string;
  numero_empleado: string;
  nombre_completo: string;
  departamento: string | null;
  turno: string | null;
  fecha_ingreso: string | null;
  activo: boolean;
  es_admin: boolean;
  created_at: string;
}

export interface Aviso {
  id: string;
  titulo: string;
  contenido: string;
  categoria: 'general' | 'seguridad' | 'rrhh' | 'produccion';
  prioridad: 'alta' | 'normal' | 'baja';
  publicado_por: string | null;
  visible_desde: string;
  activo: boolean;
  created_at: string;
}

export interface AvisoLeido {
  empleado_id: string;
  aviso_id: string;
  leido_at: string;
}

export interface Prestamo {
  id: string;
  empleado_id: string;
  monto_solicitado: number;
  monto_aprobado: number | null;
  plazo_quincenas: number;
  descuento_por_quincena: number | null;
  motivo: string | null;
  estado: 'pendiente' | 'aprobado' | 'rechazado' | 'pagado';
  fecha_solicitud: string;
  fecha_resolucion: string | null;
  notas_admin: string | null;
}

export interface PuntoMovimiento {
  id: string;
  empleado_id: string;
  cantidad: number;
  tipo: 'asistencia' | 'puntualidad' | 'bonus';
  descripcion: string | null;
  fecha_registro: string;
  created_at: string;
}

export type NivelPuntos = 'Bronce' | 'Plata' | 'Oro' | 'Platino';

export function getNivel(totalPuntos: number): NivelPuntos {
  if (totalPuntos >= 500) return 'Platino';
  if (totalPuntos >= 300) return 'Oro';
  if (totalPuntos >= 150) return 'Plata';
  return 'Bronce';
}
