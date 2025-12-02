/**
 * Tipo de dificultad de una tarea
 */
export type Dificultad = "facil" | "normal" | "dificil";
/**
 * Normaliza un valor de dificultad desde la entrada del usuario
 * @param enBruto Valor ingresado por el usuario (de tipo string)
 * @returns Dificultad normalizada ("facil", "normal", "dificil")
 */
export const normalizarDificultad = (enBruto?: string): Dificultad => {
  if (!enBruto) return "facil";
  const r = enBruto.trim().toLowerCase();
  if (r === "3" || r === "dificil" || r === "difícil") return "dificil";
  if (r === "2" || r === "normal") return "normal";
  return "facil";
};
/**
 * Convierte un valor de dificultad a emojis
 * @param d Dificultad de la tarea
 * @returns un String con emojis que representan la dificultad
 */
export const dificultadAEmojis = (d: Dificultad): string => {
  switch (d) {
    case "facil": return "⭐☆☆";
    case "normal": return "⭐⭐☆";
    case "dificil": return "⭐⭐⭐";
    default: return "";
  }
};