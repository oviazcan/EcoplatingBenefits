-- Datos de prueba para la demo
-- PIN: 1234 para todos (hash bcrypt de '1234')
-- En produccion usar hash real via Edge Function

INSERT INTO empleados (id, numero_empleado, pin_hash, nombre_completo, departamento, turno, fecha_ingreso, es_admin) VALUES
  ('00000000-0000-0000-0000-000000000001', '001', '$2a$10$demo_hash_1234', 'Carlos Martinez Lopez', 'Galvanoplastia', 'Matutino', '2020-03-15', false),
  ('00000000-0000-0000-0000-000000000002', '002', '$2a$10$demo_hash_1234', 'Maria Elena Ruiz', 'Calidad', 'Matutino', '2019-08-01', false),
  ('00000000-0000-0000-0000-000000000003', '003', '$2a$10$demo_hash_1234', 'Juan Pablo Hernandez', 'Produccion', 'Vespertino', '2021-01-10', false),
  ('00000000-0000-0000-0000-000000000004', '004', '$2a$10$demo_hash_1234', 'Ana Sofia Morales', 'RRHH', 'Matutino', '2018-06-20', true),
  ('00000000-0000-0000-0000-000000000005', '005', '$2a$10$demo_hash_1234', 'Roberto Sanchez Villa', 'Galvanoplastia', 'Nocturno', '2022-02-14', false);

INSERT INTO avisos (titulo, contenido, categoria, prioridad, publicado_por) VALUES
  ('Nuevo protocolo de seguridad en banos de niquel',
   'A partir del lunes 7 de abril, se implementa el nuevo protocolo de manejo de soluciones de niquel. Todos los operadores deben portar guantes de nitrilo dobles y careta facial completa. Consulta el manual actualizado en tu area de trabajo.',
   'seguridad', 'alta', '00000000-0000-0000-0000-000000000004'),

  ('Horarios de Semana Santa 2026',
   'Les informamos los horarios especiales para Semana Santa:\n\n- Jueves 2 abril: horario normal\n- Viernes 3 abril: descanso obligatorio\n- Sabado 4 abril: descanso\n- Lunes 6 abril: horario normal\n\nLas guardias de mantenimiento se mantienen segun rol publicado.',
   'general', 'normal', '00000000-0000-0000-0000-000000000004'),

  ('Resultados de auditoria de calidad - Marzo 2026',
   'Felicidades al equipo de Galvanoplastia turno matutino por obtener 98.5% en la auditoria de calidad de marzo. El mejor resultado del trimestre. Se otorgaran puntos bonus a todos los integrantes del equipo.',
   'produccion', 'normal', '00000000-0000-0000-0000-000000000004'),

  ('Convocatoria: Platica de manejo del estres',
   'El proximo miercoles 9 de abril a las 13:00 hrs en el comedor, nuestra psicologa organizacional impartira la platica "Tecnicas para el manejo del estres laboral". La asistencia otorga 15 puntos bonus. Cupo limitado a 40 personas.',
   'rrhh', 'normal', '00000000-0000-0000-0000-000000000004'),

  ('Mantenimiento programado: Linea 3',
   'Se informa que la Linea 3 de cromado estara fuera de servicio del 10 al 12 de abril por mantenimiento preventivo. Los pedidos se redistribuiran a Lineas 1 y 2. Supervisores confirmaran asignaciones.',
   'produccion', 'alta', '00000000-0000-0000-0000-000000000004');
