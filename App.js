class App {
  constructor(hoteles) {
    this.hoteles = hoteles;
    this.selectedHotel = null;
  }

  getHoteles() {
    return this.hoteles;
  }

  findHotelByName(hotelName) {
    return this.hoteles.find(
      (hotel) => hotel.nombre.toLowerCase() === hotelName.toLowerCase()
    );
  }

  selectHotel(hotel) {
    this.selectedHotel = hotel;
  }

  calculadorDePrecioFinal(noches, huespedes) {
    return noches * huespedes * this.selectedHotel.precioNoche;
  }

  reservaDeHabitaciones() {
    swal({
      title: "Confirmacion",
      text: "Usted esta por reservar una habitación en palma",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirmar) => {
      if (confirmar) {
        swal(
          `La reserva en ${this.selectedHotel.nombre} se ha realizado con éxito`,
          {
            icon: "success",
          }
        );
        setTimeout(reloadPage, 2000);
      } else {
        swal("Proceso cancelado", { icon: "error" });
      }
    });

    const habitacionLibre = this.selectedHotel.habitaciones.find(
      (habitacion) => habitacion.ocupada === false
    );
    habitacionLibre.ocupar();
  }
}

function reloadPage() {
  location.reload();
}

export default App;
