const employee = {
    listEmployee: (estado = 1) => {
        return `SELECT 
        empleados.Id_Empleado as idempleado,
        empleados.Cedula as cedula,
		empleados.Carnet as carnet,
        empleados.Nombre as full_name,
        empleados.Cargo as cargo,
        empleados.Ccosto as centro_costo,
        (SELECT estructura.Nombre from estructura WHERE estructura.Estructura_id = empleados.fk_ubicacion_emp) as ubicacion,
        if(empleados.Estado = 1, "Activo", 'Inactivo') as estado
        FROM empleados WHERE empleados.Estado = ${estado} ORDER BY idempleado ASC`
    },

    listTechnicians: (estado = 1) => {
        return `SELECT 
        usuarios.idusuarios as idusuario,
        usuarios.nick as username,
        (SELECT empleados.Nombre from empleados WHERE empleados.Carnet = usuarios.fk_carnet_usr) as full_name,
        usuarios.fk_carnet_usr as fk_empleado,
        if(usuarios.Estado = 1, 'Activo', 'Inactivo')as estado
        
        FROM usuarios WHERE usuarios.Estado = ${estado} ORDER BY username ASC`
    }
}

module.exports = employee;