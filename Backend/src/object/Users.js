class Users{

constructor(carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña){
    this.carnet=carnet
    this.nombre=nombre
    this.apellidos=apellidos
    this.genero=genero
    this.facultad=facultad
    this.carrera=carrera
    this.correo=correo 
    this.contraseña=contraseña


}
saludar() {
    console.log(`¡Hola! Soy ${this.nombre} y estudio en la facultad de ${this.facultad}.`);
  }

}
module.exports=Users
