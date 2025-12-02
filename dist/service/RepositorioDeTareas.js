"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioTareas = void 0;
const fs_1 = __importDefault(require("fs"));
const Tarea_1 = require("../model/Tarea");
/**
 * Clase encargada de persistir las tareas en un archivo JSON
 */
class RepositorioTareas {
    /**
     * @param ruta Ruta del archivo JSON donde se guardaran las tareas
     */
    constructor(ruta) {
        this.ruta = ruta;
    }
    /**
     * Lee las tareas desde el archivo
     * @returns devuelve un Array de instancias Tarea
     */
    leer() {
        try {
            if (!fs_1.default.existsSync(this.ruta))
                return [];
            const raw = fs_1.default.readFileSync(this.ruta, "utf8");
            const data = JSON.parse(raw);
            return data.map((p) => new Tarea_1.Tarea(p.Titulo, p.Descripcion, p.Estado, p.Vencimiento, p.Dificultad, p.ID, p.Creacion, p.UltimaEdicion));
        }
        catch (e) {
            console.error("No se pudo leer las tareas", e);
            return [];
        }
    }
    /**
     * Escribe las tareas en el archivo JSON
     * @param tareas es un Array de instancias Tarea
     */
    escribir(tareas) {
        try {
            fs_1.default.writeFileSync(this.ruta, JSON.stringify(tareas, null, 2), "utf8");
        }
        catch (e) {
            console.error("No se pudo guardar las tareas", e);
        }
    }
}
exports.RepositorioTareas = RepositorioTareas;
