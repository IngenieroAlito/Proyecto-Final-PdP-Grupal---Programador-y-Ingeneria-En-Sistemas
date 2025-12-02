"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorTareas = void 0;
/**
 * Clase que gestiona la coleccion de tareas
 */
class GestorTareas {
    /**
     * Crea un gestor de tareas
     * @param tareas Lista inicial de tareas
     */
    constructor(tareas = []) {
        this.tareas = tareas;
    }
    /** Retorna todas las tareas */
    getTodas() { return this.tareas; }
    /** Agrega una tarea a la lista */
    agregar(t) { this.tareas.push(t); }
    /** Elimina tareas por titulo*/
    eliminarPorTitulo(titulo) {
        this.tareas = this.tareas.filter((t) => t.Titulo !== titulo);
    }
    /** Edita una tarea buscando por titulo */
    editar(titulo, cambios) {
        const t = this.tareas.find((t) => t.Titulo === titulo);
        if (t)
            t.editar(cambios);
    }
    /** Busca tarea por titulo exacto */
    buscarPorTituloExacto(titulo) {
        return this.tareas.find((t) => t.Titulo === titulo);
    }
    /** Busca tareas cuyo titulo contiene la palabra clave (no le afectan las mayusculas) */
    buscarPorTituloInsensitive(titulo) {
        const clave = titulo.toLowerCase();
        return this.tareas.filter((t) => t.Titulo.toLowerCase().includes(clave));
    }
    /** Filtra tareas por estado */
    filtrarPorEstado(estado) {
        return this.tareas.filter((t) => t.Estado === estado);
    }
    /** Obtiene todas las tareas vencidas */
    tareasVencidas() {
        return this.tareas.filter((t) => t.esVencida());
    }
    /** Obtiene todas las tareas de prioridad alta (dificil) */
    tareasPrioridadAlta() {
        return this.tareas.filter((t) => t.Dificultad === "dificil");
    }
    /** Busca tareas relacionadas con palabra clave */
    tareasRelacionadas(palabra) {
        return this.tareas.filter((t) => t.esRelacionada(palabra));
    }
    /** Ordena tareas segun atributo */
    ordenar(atributo) {
        const copia = [...this.tareas];
        return copia.sort((a, b) => {
            switch (atributo) {
                case "Titulo": return a.Titulo.localeCompare(b.Titulo);
                case "Vencimiento": {
                    const fA = a.Vencimiento ? Date.parse(a.Vencimiento) : Infinity;
                    const fB = b.Vencimiento ? Date.parse(b.Vencimiento) : Infinity;
                    return fA - fB;
                }
                case "Creacion": return Date.parse(a.Creacion) - Date.parse(b.Creacion);
                case "Dificultad": {
                    const map = { facil: 1, normal: 2, dificil: 3 };
                    return map[a.Dificultad] - map[b.Dificultad];
                }
                default: return 0;
            }
        });
    }
    /** Calcula estadísticas de tareas (cantidad y porcentaje por estado y dificultad) */
    calcularEstadisticas() {
        const activas = this.tareas;
        const total = activas.length || 1;
        const contar = (pred) => activas.filter(pred).length;
        const pct = (n) => Number(((n / total) * 100).toFixed(2));
        const pendientes = contar((t) => t.Estado === "pendiente");
        const enCurso = contar((t) => t.Estado === "en curso");
        const terminadas = contar((t) => t.Estado === "terminada");
        const facil = contar((t) => t.Dificultad === "facil");
        const normal = contar((t) => t.Dificultad === "normal");
        const dificil = contar((t) => t.Dificultad === "dificil");
        return {
            total,
            pendientes,
            pendientesPct: pct(pendientes),
            enCurso,
            enCursoPct: pct(enCurso),
            terminadas,
            terminadasPct: pct(terminadas),
            facil,
            facilPct: pct(facil),
            normal,
            normalPct: pct(normal),
            dificil,
            dificilPct: pct(dificil),
        };
    }
}
exports.GestorTareas = GestorTareas;
