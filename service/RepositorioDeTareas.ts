import fs from "fs";
import { Tarea } from "../model/Tarea";
/**
 * Clase encargada de persistir las tareas en un archivo JSON
 */
export class RepositorioTareas {
  private ruta: string;
  /**
   * @param ruta Ruta del archivo JSON donde se guardaran las tareas
   */
  constructor(ruta: string) {
    this.ruta = ruta;
  }
  /**
   * Lee las tareas desde el archivo
   * @returns devuelve un Array de instancias Tarea
   */
  public leer(): Tarea[] {
    try {
      if (!fs.existsSync(this.ruta)) return [];
      const enBruto2 = fs.readFileSync(this.ruta, "utf8");
      const data = JSON.parse(enBruto2) as any[];
      return data.map(
        (p) => new Tarea(
          p.Titulo,
          p.Descripcion,
          p.Estado,
          p.Vencimiento,
          p.Dificultad,
          p.ID,
          p.Creacion,
          p.UltimaEdicion
        )
      );
    } catch (e) {
      console.error("No se pudo leer las tareas", e);
      return [];
    }
  }
  /**
   * Escribe las tareas en el archivo JSON
   * @param tareas es un Array de instancias Tarea
   */
  public escribir(tareas: Tarea[]): void {
    try {
      fs.writeFileSync(this.ruta, JSON.stringify(tareas, null, 2), "utf8");
    } catch (e) {
      console.error("No se pudo guardar las tareas", e);
    }
  }
}
