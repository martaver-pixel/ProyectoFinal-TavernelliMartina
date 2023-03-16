//PLANTILLA HOTELES

import Hotel from "./Hotel.js";
import App from "./App.js";

async function getData() {
  if (localStorage.getItem("hotels"))
    return JSON.parse(localStorage.getItem("hotels"));
  const response = await fetch("./data.json");

  const json = await response.json();
  console.log(json);
  return json;
}

const hotelsData = await getData();
//HOTELES DISPONIBLES
const listaDeHoteles = hotelsData.map(
  (hotel) =>
    new Hotel(
      hotel.id,
      hotel.nombre,
      hotel.precioNoche,
      hotel.rating,
      hotel.desayunoIncluido,
      hotel.habitaciones
    )
);

//INICIO
const app = new App(listaDeHoteles);

// DOM
const CONSTANTS = {
  HOTELES_WRAPPER: "hoteles-wrapper",
  PREFIX_HOTEL_ID: "hotel-",
  FORM_WRAPPER_ID: "book-form",
};
const nodeFormTitle = document.createElement("h3");
const hotelesWrapper = document.getElementById(CONSTANTS.HOTELES_WRAPPER);
const formBookWrapper = document.getElementById(CONSTANTS.FORM_WRAPPER_ID);
const form = formBookWrapper.querySelector("form");

const handleOnSubmit = (e) => {
  app.reservaDeHabitaciones();
  localStorage.setItem("hotels", JSON.stringify(app.getHoteles()));
  e.preventDefault();
};

form.addEventListener("submit", handleOnSubmit);
const handleOnClick = (selectedHotel) => {
  const hotelNodes = document.querySelectorAll(".hotel-wrapper");
  hotelNodes.forEach((hotelNode) => {
    if (hotelNode.id === `${CONSTANTS.PREFIX_HOTEL_ID}${selectedHotel.id}`) {
      hotelNode.classList.add("selectedHotel");
    } else {
      hotelNode.classList.remove("selectedHotel");
    }
  });
  formBookWrapper.classList.remove("hidden");
  app.selectHotel(selectedHotel);
  nodeFormTitle.innerHTML = `Formulario para reservar en ${app.selectedHotel.nombre}`;
  formBookWrapper.prepend(nodeFormTitle);
};

app.getHoteles().forEach((hotel) => {
  const hotelWrapper = document.createElement("div");
  hotelWrapper.className = "hotel-wrapper col-xs-4";
  hotelWrapper.id = `${CONSTANTS.PREFIX_HOTEL_ID}${hotel.id}`;
  hotelWrapper.innerHTML = `  
   <h1 class="hotel-name">${hotel.nombre}</h1>
   <div class="hotel-desc">
   <p>Precio por noche es $${hotel.precioNoche}.</p>
   <p> Es un hotel de ${hotel.rating}.</p>
   <p> ${
     hotel.desayunoIncluido ? "Desayuno incluido" : "Desayuno no incluido"
   }.</p>
  <p> Habitaciones disponibles: ${hotel.getHabitacionesDisponibles()}</p>
   </div>
 `;
  hotelesWrapper.appendChild(hotelWrapper);
  hotelWrapper.addEventListener("click", () => handleOnClick(hotel));
});
