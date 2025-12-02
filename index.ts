import { RepositorioTareas } from "./service/RepositorioDeTareas";
import { GestorTareas } from "./service/GestorTareas";
import { Menu } from "./ui/Menu";
/** Archivo JSON donde se guardaran las tareas */
const repo = new RepositorioTareas("tareas.json");
/** Carga las tareas desde el repositorio */
const tareas = repo.leer();
/** Inicia el gestor de tareas */
const gestor = new GestorTareas(tareas);
/** Inicia el menu de la aplicación */
const menu = new Menu(gestor);
/** Inicia la aplicación interactiva */
menu.iniciar();
/** Guarda todas las tareas al finalizar */
repo.escribir(gestor.getTodas());