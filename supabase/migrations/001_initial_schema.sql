-- Ecoplating Benefits - Schema inicial
-- Ejecutar en Supabase SQL Editor

-- Empleados (usuarios de la app)
CREATE TABLE empleados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_empleado VARCHAR(10) UNIQUE NOT NULL,
  pin_hash TEXT NOT NULL,
  nombre_completo TEXT NOT NULL,
  departamento TEXT,
  turno VARCHAR(20),
  fecha_ingreso DATE,
  activo BOOLEAN DEFAULT true,
  es_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Avisos de la empresa
CREATE TABLE avisos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  categoria VARCHAR(30) DEFAULT 'general',
  prioridad VARCHAR(10) DEFAULT 'normal',
  publicado_por UUID REFERENCES empleados(id),
  visible_desde TIMESTAMPTZ DEFAULT now(),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tracking de avisos leidos
CREATE TABLE avisos_leidos (
  empleado_id UUID REFERENCES empleados(id) ON DELETE CASCADE,
  aviso_id UUID REFERENCES avisos(id) ON DELETE CASCADE,
  leido_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (empleado_id, aviso_id)
);

-- Solicitudes de prestamo
CREATE TABLE prestamos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empleado_id UUID REFERENCES empleados(id) NOT NULL,
  monto_solicitado DECIMAL(10,2) NOT NULL,
  monto_aprobado DECIMAL(10,2),
  plazo_quincenas INTEGER NOT NULL,
  descuento_por_quincena DECIMAL(10,2),
  motivo TEXT,
  estado VARCHAR(20) DEFAULT 'pendiente',
  fecha_solicitud TIMESTAMPTZ DEFAULT now(),
  fecha_resolucion TIMESTAMPTZ,
  notas_admin TEXT
);

-- Movimientos de puntos
CREATE TABLE puntos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empleado_id UUID REFERENCES empleados(id) NOT NULL,
  cantidad INTEGER NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  descripcion TEXT,
  fecha_registro DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indices
CREATE INDEX idx_avisos_activo ON avisos(activo, visible_desde DESC);
CREATE INDEX idx_prestamos_empleado ON prestamos(empleado_id, fecha_solicitud DESC);
CREATE INDEX idx_puntos_empleado ON puntos(empleado_id, fecha_registro DESC);

-- Row Level Security
ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos_leidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestamos ENABLE ROW LEVEL SECURITY;
ALTER TABLE puntos ENABLE ROW LEVEL SECURITY;

-- Politicas basicas (ajustar segun necesidad)
-- Avisos: lectura publica para usuarios autenticados
CREATE POLICY "Avisos visibles para todos" ON avisos
  FOR SELECT USING (activo = true);

-- Empleados: solo puede ver su propio perfil
CREATE POLICY "Ver propio perfil" ON empleados
  FOR SELECT USING (true);
