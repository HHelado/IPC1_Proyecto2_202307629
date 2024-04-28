const { list_users } = require('../dataList/Data')


function UpdateUser(req, res){
    try{
        const { carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña } = req.body  
        const UsuarioIndex= list_users.findIndex(x_user => x_user.carnet===carnet)
        if(UsuarioIndex !==-1){
            const usuarioActualizado=list_users[UsuarioIndex]
            usuarioActualizado.nombre=nombre
            usuarioActualizado.apellidos=apellidos
            usuarioActualizado.genero=genero
            usuarioActualizado.facultad=facultad
            usuarioActualizado.carrera=carrera
            usuarioActualizado.correo=correo
            usuarioActualizado.contraseña=contraseña
            res.json({
                mensaje: "Usuario actualizado correctamente"
            })
        }else{
            res.json({
                error: "El usuario no existe"
            })
        }
        }catch (error){
            console.log(error)
            return res.json(
                {
                    error: "Ocurrió un error al actualizar datos del usuario"
                }
            )
        }
    }


    module.exports = {
        UpdateUser
    };