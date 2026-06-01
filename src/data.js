const DATA = {
  org: {
    name: "SNTSS",
    section: "Sección VI · Yucatán",
    full: "Sindicato Nacional de Trabajadores del Seguro Social",
    afiliados: "11,480",
    delegaciones: 9,
    hospitales: 14,
    secretarias: 8,
  },

  secretarias: [
    { id: "igualdad", nombre: "Igualdad Sustantiva", titular: "Romy Casanova", color: "var(--rose)", icon: "heart",
      desc: "Día de las Madres, Día del Niño, Día del Padre, cursos de verano y apoyo a la familia derechohabiente." },
    { id: "prevision", nombre: "Previsión Social", titular: "Cecilia Burgos", color: "var(--purple)", icon: "shield",
      desc: "Eventos contractuales, validación de derechos y control de asistencia para ~3,600 trabajadores." },
    { id: "educacion", nombre: "Acción Educativa", titular: "Jorge Mena", color: "var(--teal)", icon: "book",
      desc: "Becas, capacitación y convocatorias académicas para agremiados y sus hijos." },
    { id: "deportes", nombre: "Deportes y Cultura", titular: "Iván Pech", color: "var(--gold)", icon: "award",
      desc: "Torneos, activación física y eventos culturales de la sección." },
  ],

  delegados: [
    { nombre: "Lic. Manuel Couoh", role: "Secretario General", unit: "Sección VI", img: "https://picsum.photos/seed/sntss-m4/400/400" },
    { nombre: "Romy Casanova", role: "Sría. de Igualdad Sustantiva", unit: "Comité Ejecutivo", img: "https://picsum.photos/seed/sntss-f1/400/400" },
    { nombre: "C. Felipe Tamayo", role: "Secretario del Interior", unit: "Comité Ejecutivo", img: "https://picsum.photos/seed/sntss-m1/400/400" },
    { nombre: "C. Diego Sansores", role: "Sría. de Previsión Social", unit: "Comité Ejecutivo", img: "https://picsum.photos/seed/sntss-m3/400/400" },
  ],

  eventos: [
    { id: "madres-2026", titulo: "Festejo Día de las Madres 2026", secretaria: "Igualdad Sustantiva", tag: "Inscripciones abiertas", tagType: "rose",
      fecha: "10 de mayo, 2026", hora: "11:00 h", lugar: "Salón Los Pinos, Mérida", img: "https://picsum.photos/seed/sntss-e1/800/450",
      cupo: 800, inscritos: 512, icon: "heart",
      requisitos: ["Credencial sindical vigente", "Acta de nacimiento", "Comprobante de afiliación", "CURP"] },
    { id: "ninos-2026", titulo: "Día del Niño · Entrega de juguetes", secretaria: "Igualdad Sustantiva", tag: "Próximamente", tagType: "gold",
      fecha: "30 de abril, 2026", hora: "10:00 h", lugar: "Unidad Deportiva SNTSS", img: "https://picsum.photos/seed/sntss-e2/800/450",
      cupo: 1200, inscritos: 940, icon: "gift",
      requisitos: ["Credencial sindical vigente", "CURP del menor"] },
    { id: "becas-2026", titulo: "Convocatoria de Becas 2026", secretaria: "Acción Educativa", tag: "Abierta", tagType: "purple",
      fecha: "Cierre 15 de junio, 2026", hora: "—", lugar: "En línea", img: "https://picsum.photos/seed/sntss-e3/800/450",
      cupo: 600, inscritos: 218, icon: "book",
      requisitos: ["Boleta de calificaciones", "Comprobante de afiliación", "CURP"] },
  ],

  noticias: [
    { id: "n1", titulo: "Firma del nuevo Contrato Colectivo beneficia a más de 11 mil agremiados", cat: "Contractual",
      fecha: "24 may 2026", img: "https://picsum.photos/seed/sntss-n1/800/450", autor: "Comité Ejecutivo",
      extracto: "La Sección VI concretó mejoras salariales y prestaciones para el personal de las 14 unidades médicas del estado." },
    { id: "n2", titulo: "Arrancan los cursos de verano para hijos de trabajadores", cat: "Igualdad Sustantiva",
      fecha: "18 may 2026", img: "https://picsum.photos/seed/sntss-n4/800/450", autor: "Romy Casanova",
      extracto: "Talleres deportivos, artísticos y de regularización académica durante todo el periodo vacacional." },
    { id: "n3", titulo: "Resultados de la jornada de salud preventiva en Mérida", cat: "Previsión Social",
      fecha: "12 may 2026", img: "https://picsum.photos/seed/sntss-n6/800/450", autor: "Previsión Social",
      extracto: "Más de 600 derechohabientes participaron en chequeos gratuitos durante el fin de semana." },
    { id: "n4", titulo: "Convocatoria abierta: becas académicas ciclo 2026-2027", cat: "Acción Educativa",
      fecha: "5 may 2026", img: "https://picsum.photos/seed/sntss-e3/800/450", autor: "Acción Educativa",
      extracto: "Apoyos económicos para nivel básico, medio superior y superior. Consulta requisitos y fechas." },
  ],

  inscritos: [
    { folio: "IS-1042", nombre: "María Tun Canché", unidad: "HGZ No. 1", matricula: "98213445", fecha: "20 abr", docs: "Completos", estado: "Validado", asistio: true },
    { folio: "IS-1043", nombre: "Guadalupe Pérez Uc", unidad: "UMF No. 57", matricula: "77412098", fecha: "20 abr", docs: "Completos", estado: "Validado", asistio: true },
    { folio: "IS-1044", nombre: "Rosa Interián May", unidad: "HGR Mérida", matricula: "66120934", fecha: "21 abr", docs: "Falta CURP", estado: "Pendiente", asistio: false },
    { folio: "IS-1045", nombre: "Ana Couoh Dzib", unidad: "UMF No. 12", matricula: "55021348", fecha: "21 abr", docs: "Completos", estado: "Validado", asistio: true },
    { folio: "IS-1046", nombre: "Leticia Poot Ek", unidad: "HGZ No. 2", matricula: "44893021", fecha: "22 abr", docs: "Completos", estado: "Validado", asistio: false },
    { folio: "IS-1047", nombre: "Juana Chí Balam", unidad: "UMF No. 57", matricula: "33781204", fecha: "22 abr", docs: "Formato .png", estado: "Revisar", asistio: false },
  ],

  worker: {
    nombre: "María Tun Canché",
    matricula: "98213445",
    adscripcion: "HGZ No. 1 · Enfermería",
    curp: "TUCM850612MYNNNC04",
    categoria: "Enfermera General",
    antiguedad: "12 años",
    img: "https://picsum.photos/seed/sntss-w1/400/400",
    qrId: "SNTSS-VI-98213445",
  },

  hospitales: ["HGZ No. 1", "HGZ No. 2", "HGR Mérida", "UMF No. 12", "UMF No. 57", "Hospital O'Horán", "UMAA Valladolid", "UMF Tizimín"],
};

export default DATA;
