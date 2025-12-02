"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dificultadAEmojis = exports.normalizarDificultad = void 0;
/**
 * Normaliza un valor de dificultad desde la entrada del usuario
 * @param enBruto Valor ingresado por el usuario (de tipo string)
 * @returns Dificultad normalizada ("facil", "normal", "dificil")
 */
const normalizarDificultad = (enBruto) => {
    if (!enBruto)
        return "facil";
    const r = enBruto.trim().toLowerCase();
    if (r === "3" || r === "dificil" || r === "difícil")
        return "dificil";
    if (r === "2" || r === "normal")
        return "normal";
    return "facil";
};
exports.normalizarDificultad = normalizarDificultad;
/**
 * Convierte un valor de dificultad a emojis
 * @param d Dificultad de la tarea
 * @returns un String con emojis que representan la dificultad
 */
const dificultadAEmojis = (d) => {
    switch (d) {
        case "facil": return "⭐☆☆";
        case "normal": return "⭐⭐☆";
        case "dificil": return "⭐⭐⭐";
        default: return "";
    }
};
exports.dificultadAEmojis = dificultadAEmojis;
