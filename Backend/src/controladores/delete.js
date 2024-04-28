const { list_users } = require('../dataList/Data')


function DeleteU(req, res){
    try{
       const EliminarCarnet=req.body.carnet
       const UsuarioIndex= list_users.findIndex(x_user => x_user.carnet===EliminarCarnet)
        if(UsuarioIndex!==-1){

            list_users.splice(UsuarioIndex, 1)
            res.json({
                mensaje: "Usuario eliminado"
            })
        }else{
            res.json({
                error: "Error al eliminar al usuario"
            })
        }
        }catch (error){
            console.log(error)
            return res.json(
                {
                    error: "Ocurrió un error al eliminar al usuario"
                }
            )
        }
    }


    module.exports = {
        DeleteU
    };