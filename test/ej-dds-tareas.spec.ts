const { Trabajador, Simple, Integracion } = require("../ej-dds-tareas.ts");
require("should");

//Fixture
let juancito = new Trabajador(30);
let oscarsito = new Trabajador(45);
let tarea1 = new Simple(30, oscarsito, [juancito], 300);
let tarea2 = new Integracion(oscarsito, [tarea1]);

//Tests de requerimientos
describe("Se desea saber las horas necesarias para finalizar una tarea", () => {
    describe("- Si es una tarea simple, deberia ser las horas/hombre dividido la cantidad de empleados (sin contar al responsable)", () => {
        it("Las horas necesarias para la tarea1 deberian ser: 30", () => {
            tarea1.obtenerHorasNecesarias().should.be.eql(30);
        });
    });
    describe("- Si es una tarea de integración, deberia ser la suma de lo que tardan sus subtareas mas una hora por planificación por cada 8 horas de trabajo", () => {
        it("Las horas necesarias para la tarea2 (que contiene como subtarea unicamente la tarea1) deberian ser: 33", () => {
            tarea2.obtenerHorasNecesarias().should.be.eql(33);
        });
    });
});