"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const uuid_1 = require("uuid");
const Estado_1 = require("./Estado");
const Dificultad_1 = require("./Dificultad");
/**
 * es una clase que representa una tarea individual
 */
class Tarea {
    /**
     * Crea una nueva tarea
     * @param titulo Titulo de la tarea (obligatorio)
     * @param descripcion Descripción opcional
     * @param estado Estado inicial de la tarea
     * @param vencimiento Fecha de vencimiento en formato ISO string
     * @param dificultad Nivel de dificultad
     * @param id genera UUID
     * @param creacion Fecha de creacion opcional
     * @param ultimaEdicion Fecha de ultima edicion opcional
     */
    constructor(titulo, descripcion = "", estado = "pendiente", vencimiento = "", dificultad = "facil", id, creacion, ultimaEdicion) {
        if (!titulo || titulo.trim() === "")
            throw new Error("El titulo no puede estar vacio");
        if (titulo.length > 100)
            throw new Error("El titulo no puede superar las 100 letras");
        if (descripcion.length > 500)
            throw new Error("El descripcion no puede superar las 500 letras");
        const now = new Date().toISOString();
        this.ID = id ?? (0, uuid_1.v4)();
        this.Titulo = titulo.trim();
        this.Descripcion = descripcion.trim();
        this.Estado = (0, Estado_1.normalizarEstado)(estado);
        this.Creacion = creacion ?? now;
        this.UltimaEdicion = ultimaEdicion ?? now;
        this.Vencimiento = vencimiento;
        this.Dificultad = (0, Dificultad_1.normalizarDificultad)(dificultad);
    }
    /**
     * Muestra la informacion completa de la tarea en la consola
     */
    mostrar() {
        console.log(`ID: ${this.ID}`);
        console.log(`Titulo: ${this.Titulo}`);
        console.log(`Descripcion: ${this.Descripcion || ""}`);
        console.log(`Estado: ${this.Estado}`);
        console.log(`Creacion: ${this.Creacion}`);
        console.log(`Ultima edicion: ${this.UltimaEdicion ?? ""}`);
        console.log(`Vencimiento: ${this.Vencimiento || ""}`);
        console.log(`Dificultad: ${this.Dificultad} ${(0, Dificultad_1.dificultadAEmojis)(this.Dificultad)}`);
    }
    /**
     * Edita los campos de la tarea, excepto ID y Creacion
     * @param cambios Campos a modificar (descripcion, estado, vencimiento, dificultad)
     */
    editar(cambios) {
        if (cambios.Descripcion !== undefined)
            this.Descripcion = cambios.Descripcion;
        if (cambios.Estado)
            this.Estado = (0, Estado_1.normalizarEstado)(cambios.Estado);
        if (cambios.Vencimiento !== undefined)
            this.Vencimiento = cambios.Vencimiento;
        if (cambios.Dificultad)
            this.Dificultad = (0, Dificultad_1.normalizarDificultad)(cambios.Dificultad);
        this.UltimaEdicion = new Date().toISOString();
    }
    /**
     * Verifica si la tarea esta vencida
     * @returns true si la fecha de vencimiento es menor que la fecha actual
     */
    esVencida() {
        return this.Vencimiento !== "" && Date.parse(this.Vencimiento) < Date.now();
    }
    /**
     * Verifica si la tarea está relacionada con una palabra clave
     * @param palabra Palabra clave a buscar en titulo o descripcion
     * @returns true si la palabra esta presente
     */
    esRelacionada(palabra) {
        const clave = palabra.toLowerCase();
        return this.Titulo.toLowerCase().includes(clave) || this.Descripcion.toLowerCase().includes(clave);
    }
}
exports.Tarea = Tarea;
