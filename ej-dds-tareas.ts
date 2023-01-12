
class Trabajador {
  constructor(sueldoPorHora: Number) {
    this.sueldoPorHora = sueldoPorHora;
  }
}

interface Tarea {
  obtenerHorasNecesarias(): Number;
  obtenerCosto(): Number;
}