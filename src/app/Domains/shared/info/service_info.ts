export interface Service_info{
  titulo: string;
  descripcion: string;
  foto: string;
}

export const services_info: { [key: string]: Service_info } = {
  material_laboratorio:{
    titulo: 'Material de laboratorio',
    descripcion: 'Ofrecemos una alta variedad de lmaterial de laboratorio para practicas escolares y universitárias con elementos de fabricación y extranjera de la mejor calidad',
    foto: 'assets/icons/Material_laboratorio.png'

  },
  reparacion:{
    titulo: 'Reparación de material de laboratorio',
    descripcion: 'Reparamos y damos matenimiento a materiales de laboratorio contando con calidad y mano de obra capacitadaen la manipulación y reparación de elementos fabricados en vidrio',
    foto: 'assets/icons/material_roto.png'

  },
  quimicos_rectivos: {
    titulo: 'Quimicos y reactivos',
    descripcion: 'Contamos con la venta responsable de materiales químicos y reactivos bajo los requerimientos legales y con el conocimiento necesário para dar acompañamiento a nuestrios clientes sobre sus usos y permisos.',
    foto: "assets/icons/Reactivos.png"
  },
  biologia:{
    titulo: 'Biologia',
    descripcion: 'Productos para la manipulación de material biológico en prácticas y laboratorios que emplean ingeniería',
    foto: 'assets/icons/Biologia.png'
  },
  cosmeticos_limpieza: {  
    titulo: 'Cosméticos y limpieza',
    descripcion:'Ofrecemos una amplia gama de productos cosméticos para el  contar con amplio catálogo de productos de limpieza corporal y limpieza doméstica',
    foto: 'assets/icons/Cosmeticos_limpieza.png'
  },
  bioseguridad: {  
    titulo: 'Bioseguridad y protección',
    descripcion:'Consigue los mejores equipos de protección y bioseguridad para hacer tus laboratorios de la manera mas segura, manejamos la mejor calidad y a petición y requerimiento de nuestros clientes',
    foto: 'assets/icons/Seguridad_y_proteccion.png'
  },
  prod_agricolas: {  
    titulo: 'Productos agrícolas',
    descripcion:'Pregunta por inmunizantes, perticidas, fertilizantes i demás insumos relacionados con agronomia, realizamos envios a cualquier parte del pais y damos acompañamiento',
    foto: 'assets/icons/Prod_agricola.png'
  },
  asesorias: {  
    titulo: 'Asesorias',
    descripcion:'Si necesitas acompañamiento y orientación en la elaboración de algun producto quimico o de practica de laboratorio puedes escribirnos y comentarnos cual es tu necesidad para poder echarte una mano!',
    foto: 'assets/icons/Asesorias.png'
  }
  

};