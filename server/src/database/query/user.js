const user = {
    getUser: () => {
        return `SELECT * FROM usuarios`
    },

    login: (user) => {
        return `SELECT (SELECT empleados.Nombre from empleados WHERE empleados.Carnet = usuarios.fk_carnet_usr) as nombre,
		(SELECT empleados.Cargo FROM empleados WHERE empleados.Carnet = usuarios.fk_carnet_usr) as cargo, 
        usuarios.nick, usuarios.fk_carnet_usr, usuarios.idusuarios,
        (SELECT roles.Rol FROM roles WHERE roles.idRoles = usuarios.fk_roles_usr) as rol from usuarios WHERE nick = '${user.username}' AND clave= '${user.password}'`
    },
}


module.exports = user;