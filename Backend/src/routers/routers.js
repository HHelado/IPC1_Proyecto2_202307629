const express = require('express');
const router = express.Router();

const { helloWord } = require('../controladores/holamundo');
const { SignUp, GetUsers, Login, CargaMasiva } = require('../controladores/AccesoInicio');
const { UpdateUser } = require('../controladores/Update');
const { DeleteU } = require('../controladores/delete');
const { CrearPub, GetAllPost, GetReportBar, AgregarComentario, ObtenerComentarios, AgregarLike, EliminarPublicacion } = require('../controladores/Pub'); // Solo importa una vez los controladores de Pub

// Rutas existentes
router.post('/posts/:postId/like', AgregarLike);
router.delete('/publicacion/:postId', EliminarPublicacion); // Nueva ruta para eliminar publicación

router.get('/GetUsers', GetUsers);
router.get('/GetAllPost', GetAllPost);
router.get('/reportBar', GetReportBar);
router.post('/posts/:postId/comentarios', AgregarComentario); // Agregar comentario a una publicación
router.get('/posts/:postId/comentarios', ObtenerComentarios); // Obtener comentarios de una publicación
router.post('/registrar', SignUp);
router.post('/Login', Login);
router.post('/createPost', CrearPub);
router.post('/CargaMasiva', CargaMasiva);
router.put('/Update', UpdateUser);
router.delete('/Delete', DeleteU);

module.exports = router;