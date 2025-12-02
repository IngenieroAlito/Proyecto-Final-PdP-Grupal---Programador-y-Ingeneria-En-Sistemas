"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
const Tarea_1 = require("../model/Tarea");
/**
 * Clase que representa el menu de la aplicación ToDo List
 */
class Menu {
    constructor(gestor) {
        this.gestor = gestor;
    }
    /**
     * Muestra tareas en consola
     * @param tareas es un Array de tareas a mostrar
     */
    mostrarTareas(tareas) {
        if (!Array.isArray(tareas) || tareas.length === 0) {
            console.log("No hay tareas para mostrar");
            return;
        }
        tareas.forEach((t, i) => {
            console.log(`Tarea numero: ${i + 1}`);
            t.mostrar();
        });
    }
    /**
     * Lee los datos de una tarea desde la consola
     * @returns devuelve Partial<Tarea> con los campos ingresados
     */
    leerDatosDeTarea() {
        const datos = {};
        datos.Descripcion = readline_sync_1.default.question("Descripcion: ");
        datos.Estado = readline_sync_1.default.question("Estado: ");
        const rawFecha = readline_sync_1.default.question("Fecha de vencimiento: ");
        datos.Vencimiento = rawFecha.trim();
        datos.Dificultad = readline_sync_1.default.question("Dificultad: ");
        return datos;
    }
    /**
     * Inicia el menu
     */
    iniciar() {
        let salir = false;
        while (!salir) {
            console.log("Proyecto Final - ToDo List");
            console.log("1- Ver tareas");
            console.log("2- Buscar tarea");
            console.log("3- Agregar tarea");
            console.log("4- Editar tarea");
            console.log("5- Eliminar tarea");
            console.log("6- Ver tareas vencidas");
            console.log("7- Ver tareas de prioridad alta");
            console.log("8- Buscar tareas relacionadas");
            console.log("9- Ordenar tareas");
            console.log("10- Ver Estadisticas");
            console.log("11- Salir");
            const opcion = readline_sync_1.default.questionInt("Elige una opcion: ");
            switch (opcion) {
                case 1:
                    this.mostrarTareas(this.gestor.getTodas());
                    break;
                case 2: {
                    const titulo = readline_sync_1.default.question("Ingrese titulo exacto: ");
                    const t = this.gestor.buscarPorTituloExacto(titulo);
                    t ? t.mostrar() : console.log("No se encontro");
                    break;
                }
                case 3: {
                    const titulo = readline_sync_1.default.question("Titulo: ");
                    const datos = this.leerDatosDeTarea();
                    const nueva = new Tarea_1.Tarea(titulo, datos.Descripcion, datos.Estado, datos.Vencimiento, datos.Dificultad);
                    this.gestor.agregar(nueva);
                    console.log("Tarea agregada!");
                    break;
                }
                case 4: {
                    const titulo = readline_sync_1.default.question("Titulo a editar: ");
                    const cambios = this.leerDatosDeTarea();
                    this.gestor.editar(titulo, cambios);
                    console.log("Tarea editada!");
                    break;
                }
                case 5: {
                    const titulo = readline_sync_1.default.question("Titulo a eliminar: ");
                    this.gestor.eliminarPorTitulo(titulo);
                    console.log("Tarea eliminada!");
                    break;
                }
                case 6:
                    this.mostrarTareas(this.gestor.tareasVencidas());
                    break;
                case 7:
                    this.mostrarTareas(this.gestor.tareasPrioridadAlta());
                    break;
                case 8: {
                    const clave = readline_sync_1.default.question("Palabra clave: ");
                    this.mostrarTareas(this.gestor.tareasRelacionadas(clave));
                    break;
                }
                case 9: {
                    console.log("Ordenar por: 1-Titulo 2-Vencimiento 3-Creacion 4-Dificultad");
                    const op = readline_sync_1.default.questionInt("Elige una opcion: ");
                    let attr = "Titulo";
                    switch (op) {
                        case 1:
                            attr = "Titulo";
                            break;
                        case 2:
                            attr = "Vencimiento";
                            break;
                        case 3:
                            attr = "Creacion";
                            break;
                        case 4:
                            attr = "Dificultad";
                            break;
                    }
                    this.mostrarTareas(this.gestor.ordenar(attr));
                    break;
                }
                case 10: {
                    const stats = this.gestor.calcularEstadisticas();
                    console.log(stats);
                    break;
                }
                case 11:
                    salir = true;
                    break;
                default:
                    console.log("Opcion invalida");
            }
        }
    }
}
exports.Menu = Menu;
