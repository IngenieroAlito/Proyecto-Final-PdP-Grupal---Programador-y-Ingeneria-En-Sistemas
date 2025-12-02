"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepositorioDeTareas_1 = require("./service/RepositorioDeTareas");
const GestorTareas_1 = require("./service/GestorTareas");
const Menu_1 = require("./ui/Menu");
/** Archivo JSON donde se guardaran las tareas */
const repo = new RepositorioDeTareas_1.RepositorioTareas("tareas.json");
/** Carga las tareas desde el repositorio */
const tareas = repo.leer();
/** Inicia el gestor de tareas */
const gestor = new GestorTareas_1.GestorTareas(tareas);
/** Inicia el menu de la aplicación */
const menu = new Menu_1.Menu(gestor);
/** Inicia la aplicación interactiva */
menu.iniciar();
/** Guarda todas las tareas al finalizar */
repo.escribir(gestor.getTodas());
