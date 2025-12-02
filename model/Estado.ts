/**
 * Tipo de estado de una tarea
 */
export type Estado = "pendiente" | "en curso" | "terminada";
/**
 * Normaliza un valor de estado desde entrada de usuario
 * @param enBruto Valor ingresado por el usuario (d tipo string)
 * @returns Estado normalizado ("pendiente", "en curso", "terminada")
 */
export const normalizarEstado = (enBruto?: string): Estado => {
  if (!enBruto) return "pendiente";
  const r = enBruto.trim().toLowerCase();
  if (r === "en curso" || r === "encurso" || r === "en-curso") return "en curso";
  if (r === "terminada" || r === "terminado") return "terminada";
  return "pendiente";
};