import { v4 as uuidv4 } from "uuid";
import { Estado, normalizarEstado } from "./Estado";
import { Dificultad, normalizarDificultad, dificultadAEmojis } from "./Dificultad";
/**
 * es una clase que representa una tarea individual
 */
export class Tarea {
  public readonly ID: string;
  public Titulo: string;
  public Descripcion: string;
  public Estado: Estado;
  public Creacion: string;
  public UltimaEdicion: string | null;
  public Vencimiento: string;
  public Dificultad: Dificultad;
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
  constructor(
    titulo: string,
    descripcion = "",
    estado: Estado = "pendiente",
    vencimiento = "",
    dificultad: Dificultad = "facil",
    id?: string,
    creacion?: string,
    ultimaEdicion?: string
  ) {
    if (!titulo || titulo.trim() === "") throw new Error("El titulo no puede estar vacio");
    if (titulo.length > 100) throw new Error("El titulo no puede superar las 100 letras");
    if (descripcion.length > 500) throw new Error("El descripcion no puede superar las 500 letras");
    if (vencimiento !== "" && isNaN(Date.parse(vencimiento))) throw new Error("La fecha de vencimiento no es valida");
    const fechaActual = new Date().toISOString();
    this.ID = id ?? uuidv4();
    this.Titulo = titulo.trim();
    this.Descripcion = descripcion.trim();
    this.Estado = normalizarEstado(estado);
    this.Creacion = creacion ?? fechaActual;
    this.UltimaEdicion = ultimaEdicion ?? fechaActual;
    this.Vencimiento = vencimiento;
    this.Dificultad = normalizarDificultad(dificultad);
  }
  /**
   * Muestra la informacion completa de la tarea en la consola
   */
  public mostrar(): void {
    console.log(`ID: ${this.ID}`);
    console.log(`Titulo: ${this.Titulo}`);
    console.log(`Descripcion: ${this.Descripcion || ""}`);
    console.log(`Estado: ${this.Estado}`);
    console.log(`Creacion: ${this.Creacion}`);
    console.log(`Ultima edicion: ${this.UltimaEdicion ?? ""}`);
    console.log(`Vencimiento: ${this.Vencimiento || ""}`);
    console.log(`Dificultad: ${this.Dificultad} ${dificultadAEmojis(this.Dificultad)}`);
  }
  /**
   * Edita los campos de la tarea, excepto ID y Creacion
   * @param cambios Campos a modificar (descripcion, estado, vencimiento, dificultad)
   */
public editar(cambios: Partial<Omit<Tarea, "ID" | "Creacion">>) {
  if (cambios.Descripcion !== undefined) this.Descripcion = cambios.Descripcion;
  if (cambios.Estado) this.Estado = normalizarEstado(cambios.Estado);
  if (cambios.Vencimiento !== undefined) {
    if (cambios.Vencimiento !== "" && isNaN(Date.parse(cambios.Vencimiento))) {
      throw new Error("La fecha de vencimiento no es valida");
    }
    this.Vencimiento = cambios.Vencimiento;
  }
  if (cambios.Dificultad) this.Dificultad = normalizarDificultad(cambios.Dificultad);
  this.UltimaEdicion = new Date().toISOString();
}
  /**
   * Verifica si la tarea esta vencida
   * @returns true si la fecha de vencimiento es menor que la fecha actual
   */
  public esVencida(): boolean {
    return this.Vencimiento !== "" && Date.parse(this.Vencimiento) < Date.now();
  }
  /**
   * Verifica si la tarea está relacionada con una palabra clave
   * @param palabra Palabra clave a buscar en titulo o descripcion
   * @returns true si la palabra esta presente
   */
  public esRelacionada(palabra: string): boolean {
    const clave = palabra.toLowerCase();
    return this.Titulo.toLowerCase().includes(clave) || this.Descripcion.toLowerCase().includes(clave);
  }
}
