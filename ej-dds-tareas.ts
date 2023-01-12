import _ from "lodash";

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
    return this.cantidadEstimadaHoras / this.empleadosAsignados.length;
  }
  
  obtenerCosto() {
    let sueldoTotalEmpleados = (this.cantidadEstimadaHoras / this.empleadosAsignados.length) * _.sum(this.empleadosAsignados.map(empleado => empleado.sueldoPorHora));
    let sueldoTotalResponsable = this.cantidadEstimadaHoras * this.responsable.sueldoPorHora;
    return sueldoTotalEmpleados + sueldoTotalResponsable + this.costoDeInfraestructura;
  }
}