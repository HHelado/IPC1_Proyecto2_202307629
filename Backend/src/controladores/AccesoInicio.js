const { list_users } = require('../dataList/Data')
const Usuario = require('../object/Users')

function CargaMasiva(req, res){
    try{
        const userArray=req.body

        for(const userData of userArray){
            const { carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña } = userData
            const newUser = new Usuario(carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña)
            list_users.push(newUser)   

        }
        res.json({
    
            mensaje: "Usuarios agregados!"
            
        })
        }catch (error){
            console.log(error)
            return res.json(
                {
                    error: "Ocurrió un error con la carga masiva"
                }
            )
        }
    }


function SignUp(req, res) {

    try {
        const { carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña } = req.body  
        const usuarioExiste = list_users.find(x_user => x_user.carnet === carnet)
        
        if (usuarioExiste) {
            return res.json({ error: 'El carnet ya está registrado.' });
        }   
        const newUser = new Usuario(carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña)
        list_users.push(newUser)  

        return res.json({ mensaje: 'Usuario agregado correctamente :D' });

    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "Ocurrió un error en el registro de Usuario"
            }
        )
    }
}

function GetUsers(req, res){
try{
    res.json({

        usuarios: list_users
    })
    }catch (error){
        console.log(error)
        return res.json(
            {
                error: "Ocurrió un error al obtener todos los usuarios"
            }
        )
    }
}
function Login(req, res){
    try{
       const carnet1=req.body.carnet
       const password1=req.body.contraseña
       const usuarioEncontrado = list_users.find(x_user => x_user.carnet === carnet1 && x_user.contraseña===password1)
        if(usuarioEncontrado){
            const userFound={
                carnet: usuarioEncontrado.carnet,
                nombre: usuarioEncontrado.nombre,
                apellidos: usuarioEncontrado.apellidos,
                genero: usuarioEncontrado.genero,
                facultad: usuarioEncontrado.facultad,
                carrera: usuarioEncontrado.carrera,
                correo: usuarioEncontrado.correo
            }
            res.json({
                encontrado:true,
                datos:userFound
            })
        }else{
            res.json({
                encontrado:false,

                error: "Carnet o contraseña incorrecta papu"
            })
        }
        }catch (error){
            console.log(error)
            return res.json(
                {
                    error: "Ocurrió un error en el login"
                }
            )
        }   
        
}
module.exports = {
    SignUp,
    GetUsers,
    Login,
    CargaMasiva
};