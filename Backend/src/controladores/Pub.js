const { list_users, list_post } = require('../dataList/Data')

const Object_Post =require('../object/Post')

var id_pub =0
function CrearPub(req, res) {
    try {
        const carnet = req.body.carnet;
        const descripcion = req.body.descripcion;
        const imagen = req.body.imagen;
        const categoria = req.body.categoria;
        const anonimo = req.body.anonimo || false; 
        const usuario = list_users.find(user => user.carnet === carnet); // Busca el usuario por su carnet

        if (!usuario) {
            return res.json({ error: "Usuario no encontrado" });
        }

        id_pub = id_pub + 1;
        const newPost = new Object_Post(id_pub, carnet, descripcion, imagen, categoria);

        if (anonimo) {
            newPost.user = ''; 
            newPost.anonimo = true; 
        } else {
            newPost.anonimo = false; 
        }

        newPost.comentarios = [];
        newPost.carrera = usuario.carrera; 
        newPost.facultad = usuario.facultad; 

        list_post.push(newPost);

        res.json({
            mensaje: "Post publicado"
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: "Error Pub"
        });
    }
}
function EliminarPublicacion(req, res) {
    try {
        const postId = parseInt(req.params.postId);

        // Busca la publicación por su ID
        const index = list_post.findIndex(post => post.id === postId);

        if (index === -1) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        // Elimina la publicación de la lista de publicaciones
        list_post.splice(index, 1);

        res.status(200).json({ mensaje: "Publicación eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la publicación" });
    }
}

function GetAllPost(req, res) {
    try {
        const posts_con_usuario = [];

        for (const post of list_post) {
            const usuario = list_users.find(user => user.carnet === post.user);

            if (usuario) {
                const post_con_usuario = {
                    id: post.id,
                    descripcion: post.descripcion,
                    imagen: post.imagen,
                    fechaHora: post.fechaHora,
                    user: usuario.nombre,
                    carrera: usuario.carrera, 
                    facultad: usuario.facultad, 
                    categoria: post.categoria 
                };

                posts_con_usuario.push(post_con_usuario);
            }
        }

        posts_con_usuario.reverse();
        res.json({ publicaciones: posts_con_usuario });
    } catch (error) {
        console.log(error);
        res.json({ error: "Error al obtener las publicaciones" });
    }
}

function AgregarLike(req, res) {
    try {
        const postId = parseInt(req.params.postId);

        const post = list_post.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        post.likes = (post.likes || 0) + 1;

        const likes = post.likes;

        return res.status(200).json({ mensaje: "Like agregado correctamente", likes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al agregar like" });
    }
}


function GetReportBar(req, res){

    try{ 
        const postCountByUser={}
        for(const post of list_post){
            if (post.user in  postCountByUser){
                postCountByUser[post.user]++
            }else{
                postCountByUser[post.user]=1
            }
             
        }
        const objects_userPost= Object.keys(postCountByUser).map(user=>({
            user,
            post: postCountByUser[user]
        }))
        objects_userPost.sort((a,b)=>b.post -a.post)
        const topuserPost=objects_userPost.slice(0, 10)
        res.json({topBar:topuserPost })


    }catch (error){
        console.log(error)

        res.json({
            error:"Error al obtener los reportes"
        })
    }
}
function AgregarComentario(req, res) {
    try {
        const postId = parseInt(req.params.postId);
        const { comentario, usuario } = req.body;

        const post = list_post.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        post.comentarios.push({ comentario, usuario });

        const comentarios = post.comentarios;

        return res.status(200).json({ mensaje: "Comentario agregado correctamente", comentarios });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al agregar comentario" });
    }
}

function ObtenerComentarios(req, res) {
    try {
        const postId = parseInt(req.params.postId);

        const post = list_post.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        const comentarios = post.comentarios || [];

        return res.status(200).json({ comentarios });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener comentarios" });
    }
}

module.exports={
    CrearPub, 
    GetAllPost,
    GetReportBar,
    ObtenerComentarios,
    AgregarComentario,
    AgregarLike,
    EliminarPublicacion
}