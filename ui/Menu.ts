import readlineSync from "readline-sync";
import { Tarea } from "../model/Tarea";
import { GestorTareas, AtributoOrden } from "../service/GestorTareas";
/**
 * Clase que representa el menu de la aplicación ToDo List
 */
export class Menu {
  private gestor: GestorTareas;
  constructor(gestor: GestorTareas) {
    this.gestor = gestor;
  }
  /**
   * Muestra tareas en consola
   * @param tareas es un Array de tareas a mostrar
   */
  private mostrarTareas(tareas: Tarea[]) {
    if (!Array.isArray(tareas) || tareas.length === 0) {
      console.log("No hay tareas para mostrar");
      return;
    }
    tareas.forEach((t, i) => {
      console.log(`Tarea numero: ${i + 1}`);
      t.mostrar();
    });
  }
  /**
   * Lee los datos de una tarea desde la consola
   * @returns devuelve Partial<Tarea> con los campos ingresados
   */
  private leerDatosDeTarea(): Partial<Tarea> {
    const datos: Partial<Tarea> = {};
    datos.Descripcion = readlineSync.question("Descripcion: ");
    datos.Estado = readlineSync.question("Estado: ") as any;
    const rawFecha = readlineSync.question("Fecha de vencimiento: ");
    datos.Vencimiento = rawFecha.trim();
    datos.Dificultad = readlineSync.question("Dificultad: ") as any;
    return datos;
  }
  /**
   * Inicia el menu
   */
  public iniciar(): void {
    let salir = false;
    while (!salir) {
      console.log("Proyecto Final - ToDo List");
      console.log("1- Ver tareas");
      console.log("2- Buscar tarea");
      console.log("3- Agregar tarea");
      console.log("4- Editar tarea");
      console.log("5- Eliminar tarea");
      console.log("6- Ver tareas vencidas");
      console.log("7- Ver tareas de prioridad alta");
      console.log("8- Buscar tareas relacionadas");
      console.log("9- Ordenar tareas");
      console.log("10- Ver Estadisticas");
      console.log("11- Salir");
      const opcion = readlineSync.questionInt("Elige una opcion: ");
      switch (opcion) {
        case 1: this.mostrarTareas(this.gestor.getTodas()); break;
        case 2: {
          const titulo = readlineSync.question("Ingrese titulo exacto: ");
          const t = this.gestor.buscarPorTituloExacto(titulo);
          t ? t.mostrar() : console.log("No se encontro");
          break;
        }
        case 3: {
          const titulo = readlineSync.question("Titulo: ");
          const datos = this.leerDatosDeTarea();
          const nueva = new Tarea(
            titulo,
            datos.Descripcion,
            datos.Estado,
            datos.Vencimiento,
            datos.Dificultad
          );
          this.gestor.agregar(nueva);
          console.log("Tarea agregada!");
          break;
        }
        case 4: {
          const titulo = readlineSync.question("Titulo a editar: ");
          const cambios = this.leerDatosDeTarea();
          this.gestor.editar(titulo, cambios);
          console.log("Tarea editada!");
          break;
        }
        case 5: {
          const titulo = readlineSync.question("Titulo a eliminar: ");
          this.gestor.eliminarPorTitulo(titulo);
          console.log("Tarea eliminada!");
          break;
        }
        case 6:
          this.mostrarTareas(this.gestor.tareasVencidas());
          break;
        case 7:
          this.mostrarTareas(this.gestor.tareasPrioridadAlta());
          break;
        case 8: {
          const clave = readlineSync.question("Palabra clave: ");         this.mostrarTareas(this.gestor.tareasRelacionadas(clave));
          break;
        }
        case 9: {
          console.log("Ordenar por: 1-Titulo 2-Vencimiento 3-Creacion 4-Dificultad");
          const op = readlineSync.questionInt("Elige una opcion: ");
          let attr: AtributoOrden = "Titulo";
          switch (op) {
            case 1: attr = "Titulo"; break;
            case 2: attr = "Vencimiento"; break;
            case 3: attr = "Creacion"; break;
            case 4: attr = "Dificultad"; break;
          }
          this.mostrarTareas(this.gestor.ordenar(attr));
          break;
        }
        case 10: {
          const stats = this.gestor.calcularEstadisticas();
          console.log(stats);
          break;
        }
        case 11:
          salir = true;
          break;
        default:
          console.log("Opcion invalida");
      }
    }
  }
}