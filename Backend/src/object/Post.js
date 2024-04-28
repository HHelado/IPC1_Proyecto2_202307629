class Object_Post {
  constructor(id, user, descripcion, imagen, categoria, carrera, facultad) { 
      this.id = id;
      this.user = user; 
      this.descripcion = descripcion;
      this.imagen = imagen;
      this.fechaHora = new Date();
      this.categoria = categoria; 
      this.carrera = carrera; 
      this.facultad = facultad; 
      this.comentarios = [];
  }
}

module.exports = Object_Post;