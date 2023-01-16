const { Trabajador, Simple, Integracion } = require("../ej-dds-tareas.ts");
require("should");

//Fixture
let juancito = new Trabajador(30);
let oscarsito = new Trabajador(45);
let tarea1 = new Simple(30, oscarsito, [juancito], 300);
let tarea2 = new Integracion(oscarsito, [tarea1]);