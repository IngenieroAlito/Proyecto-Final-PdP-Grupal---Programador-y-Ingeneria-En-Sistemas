import { Tarea } from "../model/Tarea";
import { Estado } from "../model/Estado";
import { Dificultad } from "../model/Dificultad";
/** 
 * Atributos posibles para ordenar tareas
 */
export type AtributoOrden = "Titulo" | "Vencimiento" | "Creacion" | "Dificultad";
/**
 * Estructura de estadisticas de tareas
 */
export type Estadisticas = {
  total: number;
  pendientes: number;
  pendientesPct: number;
  enCurso: number;
  enCursoPct: number;
  terminadas: number;
  terminadasPct: number;
  facil: number;
  facilPct: number;
  normal: number;
  normalPct: number;
  dificil: number;
  dificilPct: number;
};
/**
 * Clase que gestiona la coleccion de tareas
 */
export class GestorTareas {
  private tareas: Tarea[];
  /**
   * Crea un gestor de tareas
   * @param tareas Lista inicial de tareas
   */
  constructor(tareas: Tarea[] = []) {
    this.tareas = tareas;
  }
  /** Retorna todas las tareas */
  public getTodas(): Tarea[] { return this.tareas; }
  /** Agrega una tarea a la lista */
  public agregar(t: Tarea): void { this.tareas.push(t); }
  /** Elimina tareas por titulo*/
  public eliminarPorTitulo(titulo: string): void {
    this.tareas = this.tareas.filter((t) => t.Titulo !== titulo);
  }
  /** Edita una tarea buscando por titulo */
  public editar(titulo: string, cambios: Partial<Omit<Tarea, "ID" | "Creacion">>): void {
    const t = this.tareas.find((t) => t.Titulo === titulo);
    if (t) t.editar(cambios);
  }
  /** Busca tarea por titulo exacto */
  public buscarPorTituloExacto(titulo: string): Tarea | undefined {
    return this.tareas.find((t) => t.Titulo === titulo);
  }
  /** Busca tareas cuyo titulo contiene la palabra clave (no le afectan las mayusculas) */
  public buscarPorTituloInsensitive(titulo: string): Tarea[] {
    const clave = titulo.toLowerCase();
    return this.tareas.filter((t) => t.Titulo.toLowerCase().includes(clave));
  }
  /** Filtra tareas por estado */
  public filtrarPorEstado(estado: Estado): Tarea[] {
    return this.tareas.filter((t) => t.Estado === estado);
  }
  /** Obtiene todas las tareas vencidas */
  public tareasVencidas(): Tarea[] {
    return this.tareas.filter((t) => t.esVencida());
  }
  /** Obtiene todas las tareas de prioridad alta (dificil) */
  public tareasPrioridadAlta(): Tarea[] {
    return this.tareas.filter((t) => t.Dificultad === "dificil");
  }
  /** Busca tareas relacionadas con palabra clave */
  public tareasRelacionadas(palabra: string): Tarea[] {
    return this.tareas.filter((t) => t.esRelacionada(palabra));
  }
  /** Ordena tareas segun atributo */
  public ordenar(atributo: AtributoOrden): Tarea[] {
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
          const map: Record<Dificultad, number> = { facil: 1, normal: 2, dificil: 3 };
          return map[a.Dificultad] - map[b.Dificultad];
        }
        default: return 0;
      }
    });
  }
  /** Calcula estadísticas de tareas (cantidad y porcentaje por estado y dificultad) */
  public calcularEstadisticas(): Estadisticas {
    const activas = this.tareas;
    const total = activas.length || 1;
    const contar = (pred: (t: Tarea) => boolean) => activas.filter(pred).length;
    const pct = (n: number) => Number(((n / total) * 100).toFixed(2));
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