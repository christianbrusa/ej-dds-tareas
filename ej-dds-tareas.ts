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

let juancito = new Trabajador(30);
let pepito = new Trabajador(15);
let oscarsito = new Trabajador(45);

let tarea1 = new Simple(30, oscarsito, [pepito, juancito], 300);
let tarea2 = new Simple(20, oscarsito, [juancito], 150);
let tarea3 = new Integracion(oscarsito, [tarea1, tarea2]);

tarea1.obtenerHorasNecesarias();
tarea2.obtenerHorasNecesarias();
tarea3.obtenerHorasNecesarias();

tarea1.obtenerCosto();
tarea2.obtenerCosto();
tarea3.obtenerCosto();