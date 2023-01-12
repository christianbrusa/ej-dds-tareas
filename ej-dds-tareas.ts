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

class Integracion implements Tarea {
  constructor(responsable: Object, empleadosAsignados: Array<Object>, listadoDeSubtareas: Array<Object>) {
    this.responsable = responsable;
    this.empleadosAsignados = empleadosAsignados;
    this.listadoDeSubtareas = listadoDeSubtareas;
  }
  
  obtenerHorasNecesarias() {
    let horasTotalDeSubtareas = 0;
    this.listadoDeSubtareas.forEach(subTarea => {
      horasTotalDeSubtareas += subTarea.obtenerHorasNecesarias();
    });
    let horasDePlanificacion = Math.floor(horasTotalDeSubtareas/8);
    return horasTotalDeSubtareas + horasDePlanificacion;
  }
  
  obtenerCosto() {
    let bonusResponsable = (this.responsable.sueldoPorHora * 10 / 100) * this.obtenerHorasNecesarias();
    let costoTotalDeSubtareas = 0;
    this.listadoDeSubtareas.forEach(subTarea => {
      costoTotalDeSubtareas += subTarea.obtenerCosto();
    });
    return costoTotalDeSubtareas + bonusResponsable;
  }
}

let juancito = new Trabajador(30);
let pepito = new Trabajador(15);
let oscarsito = new Trabajador(45);

let tarea1 = new Simple(30, oscarsito, [pepito, juancito], 300);
let tarea2 = new Simple(20, oscarsito, [juancito], 150);
let tarea3 = new Integracion(oscarsito, [juancito], [tarea1, tarea2]);

tarea1.obtenerHorasNecesarias();
tarea2.obtenerHorasNecesarias();
tarea3.obtenerHorasNecesarias();

tarea1.obtenerCosto();
tarea2.obtenerCosto();
tarea3.obtenerCosto();