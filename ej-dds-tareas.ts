
class Trabajador {
  constructor(sueldoPorHora: Number) {
    this.sueldoPorHora = sueldoPorHora;
  }
}

interface Tarea {
  obtenerHorasNecesarias(): Number;
  obtenerCosto(): Number;
}

class Simple implements Tarea {
  constructor(cantidadEstimadaHoras: Number, responsable: Object, empleadosAsignados: Array<Object>, costoDeInfraestructura: Number) {
    this.cantidadEstimadaHoras = cantidadEstimadaHoras;
    this.responsable = responsable;
    this.empleadosAsignados = empleadosAsignados;
    this.costoDeInfraestructura = costoDeInfraestructura;
  }
  
  obtenerHorasNecesarias() {

  }
  
  obtenerCosto() {
    
  }
}