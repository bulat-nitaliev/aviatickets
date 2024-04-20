import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favoritesUi from "./store/favorites";

document.addEventListener("DOMContentLoaded", (e) => {
  const form = formUI.form;
  const favorite_container = document.getElementById("dropdown1");

  // Events
  initApp();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  const favorite = document.querySelector(".tickets-sections .row");
  favorite.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.closest(".add-favorite")) return;
    const parent = e.target.closest(".add-favorite").parentElement;

    const value = favoritesUi.getValueParent(parent);

    const values = favoritesUi.favoriteTemplate(value);
    const container = document.getElementById("dropdown1");

    favoritesUi.addCard(container, values);
  });

  favorite_container.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.closest(".delete-favorite")) return;
    const el = e.target.closest(".delete-favorite");
    const remove_el = el.parentElement.parentElement;
    const container = document.getElementById("dropdown1");
    container.removeChild(remove_el);
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
