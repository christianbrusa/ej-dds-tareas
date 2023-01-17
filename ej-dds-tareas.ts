import _ from "lodash";

class Trabajador {
  constructor(sueldoPorHora: Number) {
    if(sueldoPorHora <= 0){
      throw new Error("El sueldo por hora de un trabajador debe ser positivo");
    }
    this.sueldoPorHora = sueldoPorHora;
  }
}

interface Tarea {
  obtenerHorasNecesarias(): Number;
  obtenerCosto(): Number;
}

class Simple implements Tarea {
  constructor(cantidadEstimadaHoras: Number, responsable: Trabajador, empleadosAsignados: Array<Trabajador>, costoDeInfraestructura: Number) {
    this.cantidadEstimadaHoras = cantidadEstimadaHoras;
    this.responsable = responsable;
    this.empleadosAsignados = empleadosAsignados;
    this.costoDeInfraestructura = costoDeInfraestructura;
  }
  
  obtenerHorasNecesarias() {
    return this.cantidadEstimadaHoras / this.empleadosAsignados.length;
  }
  
  obtenerCosto() {
    let sueldoTotalEmpleados = (this.cantidadEstimadaHoras / this.empleadosAsignados.length) * _.sumBy(this.empleadosAsignados, empleado => empleado.sueldoPorHora);
    let sueldoTotalResponsable = this.cantidadEstimadaHoras * this.responsable.sueldoPorHora;
    return sueldoTotalEmpleados + sueldoTotalResponsable + this.costoDeInfraestructura;
  }
}

class Integracion implements Tarea {
  constructor(responsable: Trabajador, listadoDeSubtareas: Array<Trabajador>) {
    this.responsable = responsable;
    this.listadoDeSubtareas = listadoDeSubtareas;
  }
  
  obtenerHorasNecesarias() {
    let horasTotalDeSubtareas = _.sumBy(this.listadoDeSubtareas, subTarea => subTarea.obtenerHorasNecesarias());
    let horasDePlanificacion = Math.floor(horasTotalDeSubtareas/8);
    return horasTotalDeSubtareas + horasDePlanificacion;
  }
  
  obtenerCosto() {
    let bonusResponsable = (this.responsable.sueldoPorHora * 10 / 100) * this.obtenerHorasNecesarias();
    let costoTotalDeSubtareas = _.sumBy(this.listadoDeSubtareas, subTarea => subTarea.obtenerCosto());
    return costoTotalDeSubtareas + bonusResponsable;
  }
}

module.exports = { Trabajador, Simple, Integracion };