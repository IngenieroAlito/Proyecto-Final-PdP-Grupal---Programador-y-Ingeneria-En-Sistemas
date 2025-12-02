"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizarEstado = void 0;
/**
 * Normaliza un valor de estado desde entrada de usuario
 * @param enBruto Valor ingresado por el usuario (d tipo string)
 * @returns Estado normalizado ("pendiente", "en curso", "terminada")
 */
const normalizarEstado = (enBruto) => {
    if (!enBruto)
        return "pendiente";
    const r = enBruto.trim().toLowerCase();
    if (r === "en curso" || r === "encurso" || r === "en-curso")
        return "en curso";
    if (r === "terminada" || r === "terminado")
        return "terminada";
    return "pendiente";
};
exports.normalizarEstado = normalizarEstado;
