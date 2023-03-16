import Habitacion from "./Habitaciones.js";

class Hotel {
  constructor(id, nombre, precioNoche, rating, desayunoIncluido, habitaciones) {
    this.id = id;
    this.nombre = nombre;
    this.precioNoche = precioNoche;
    this.rating = rating;
    this.desayunoIncluido = desayunoIncluido;

    this.generarHabitaciones(habitaciones);
  }

  generarHabitaciones(habitaciones) {
    this.habitaciones = [];
    for (let i = 0; i < 20; i++) {
      const currentHabitacion = habitaciones?.[i];
      const habitacion = new Habitacion(
        i,
        currentHabitacion ? Boolean(currentHabitacion.ocupada) : false
      );
      this.habitaciones.push(habitacion);
    }
  }

  getHabitacionesDisponibles() {
    return this.habitaciones.filter(
      (habitacion) => habitacion.ocupada === false
    ).length;
  }
}

export default Hotel;
