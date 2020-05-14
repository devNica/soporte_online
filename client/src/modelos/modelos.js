import { modelo_empleados } from './empleados'
import { modelo_asignaciones } from './asignaciones'
import { modelo_desempeno } from './desempeno'
import { modelo_repuestos } from './repuestos'
import { modelo_tareas } from './tareas'
import { modelo_recepcion } from './recepcion'
import { modelo_equipos } from './equipos'
import { modelo_cobertura } from './cobertura'
import { modelo_distribucion_tiempo } from './distribucionTiempo';
import { modelo_edicion_inventario } from './edicionInventario';


export const modelos = {
    empleados: modelo_empleados,
    asignaciones: modelo_asignaciones,
    desempeno: modelo_desempeno,
    repuestos: modelo_repuestos,
    tareas: modelo_tareas,
    recepcion: modelo_recepcion,
    equipos: modelo_equipos,
    cobertura: modelo_cobertura,
    distribucion: modelo_distribucion_tiempo,
    edicion: modelo_edicion_inventario,
}



