import axios from 'axios';

export default {
    user: {
        signin: credentials =>
            axios.post('/api/user/signin', { credentials }).then(res => res.data),
        signup: data =>
            axios.post('/api/user/signup', { data }).then(res => res.data),
        confirm: token =>
            axios.post('/api/user/confirmation', { token }).then(res => res.data),
    },

    workshop: {
        task: data =>
            axios.post('/api/workshop/task/list', data).then(res => res.data),

        coverage: idregws =>
            axios.post('/api/workshop/coverage/list', idregws).then(res => res.data),

        parts: idregws =>
            axios.post('/api/workshop/parts/list', idregws).then(res => res.data),

        tasksEqp: idregws =>
            axios.post('/api/workshop/tasks/eqp/list', idregws).then(res => res.data),

        pendientesRevision: data =>
            axios.post('/api/workshop/pendientes/revision', { data }).then(res => res.data),

        registrarAtencionTaller: data =>
            axios.post('/api/workshop/registrar-atencion-taller', { data }).then(res => res.data),

        pausarAtencion: data =>
            axios.post('/api/workshop/pausar-atencion-eqp', data).then(res => res.data),

        reiniciarAtencion: data =>
            axios.post('/api/workshop/reiniciar-atencion-eqp', data).then(res => res.data),

        reasignarAtencion: data =>
            axios.post('/api/workshop/reasignar-atencion-eqp', data).then(res => res.data),
    },

    staff: {
        empleadosActivos: () =>
            axios.get('/api/staff/lista-empleados-activos').then(res => res.data),

        tecnicosActivos: () =>
            axios.get('/api/staff/lista-tecnicos-activos').then(res => res.data),
    },

    workload: {
        crearAsistencia: data =>
            axios.post('/api/workload/crear-asignacion', { data }).then(res => res.data),

        cerrarAsistencia: data =>
            axios.post('/api/workload/cerrar-asignacion', { data }).then(res => res.data),

        aprobar: data =>
            axios.post('/api/workload/aprobar-asignacion', { data }).then(res => res.data),

        denegar: data =>
            axios.post('/api/workload/denegar-cierre-asignacion', data).then(res => res.data),

        edicion: data =>
            axios.post('/api/workload/habilitar-edicion-asignacion', data).then(res => res.data),

        restaurarSeguimiento: data =>
            axios.post('/api/workload/restaurar-seguimiento-asignacion', data).then(res => res.data),

        crearAtencionTecnico: data =>
            axios.post('/api/workload/crear-atencion-externa-taller', { data }).then(res => res.data),

    },

    reports: {
        eqp: () =>
            axios.get('/api/export/pdf', { responseType: 'arraybuffer', headers: { 'Accept': 'application/pdf' } }),

        desempeno: data =>
            axios.post('/api/reporte/desempeno-tecnicos', data).then(res => res.data),

        distribucionTiempo: data =>
            axios.post('/api/reporte/distribucion-tiempo', data).then(res => res.data),

        edicionInventario: data =>
            axios.post('/api/reporte/edicion-inventario', data).then(res => res.data),

    },

    eqp: {
        inventarioActivo: id =>
            axios.post('/api/tool/eqp-active-list', id).then(res => res.data),

        catalogoEquipos: () =>
            axios.get('/api/tool/catalogoeqp-list').then(res => res.data),

        actualizarIngresoEqp: data =>
            axios.post('/api/tools/set-eqp-regin', { data }).then(res => res.data),

        actualizarIngresoUsr: data =>
            axios.post('/api/tools/set-usr-regin', data).then(res => res.data),

        actualizarTareas: data =>
            axios.post('/api/tools/upd-tareas-eqp', { data }).then(res => res.data),

        actualizarRepuestos: data =>
            axios.post('/api/tools/upd-repuestos-eqp', { data }).then(res => res.data),

    },

    tasks: {
        listar: idregws =>
            axios.post('/api/tools/tareas-eqp-list', idregws).then(res => res.data),
    },

    spares: {
        listar: idequipo =>
            axios.post('/api/tools/list-repuestos-eqp', idequipo).then(res => res.data),
    },

    cvg: {
        cobertura: data =>
            axios.post('/api/tools/upd-cvg-eqp', { data }).then(res => res.data),
    },

    notificacion: {
        revisar: data =>
            axios.post('/api/tools/review-changes-user-notifications', data).then(res => res.data),

        actualizar: data =>
            axios.post('/api/tools/update-user-notification-status', data).then(res => res.data),
    }
}
