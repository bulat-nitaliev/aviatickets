class Favorites {
    constructor() {
      this.addFavorites = document.querySelector(".add-favorite");
      // this.parent = this.addFavorites.parentElement;
    }
    getContainer() {
      const container = document.getElementById("dropdown1");
      return container;
    }
    addCard(container, parent) {
      container.insertAdjacentHTML("afterbegin", parent);
    }
    getParent() {
      const addfav = document.querySelector(".add-favorite");
  
      return addfav.parentElement;
    }
    getValueParent(parent) {
      const img = parent.querySelector("img").src;
      const value = parent.textContent
        .split("\n")
        .map((x) => x.trim())
        .filter((x) => x.length > 2);
      const [, origin, , , destination, departure, price, count_per, num_air] =
        value;
      return { img, origin, destination, departure, price, count_per, num_air };
    }
  
    favoriteTemplate(values) {
      return `
      <div class="favorite-item d-flex align-items-start">
      <img
        src=${values.img}
        class="favorite-item-airline-img"
      />
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex align-items-center"
        >
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${values.origin} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${values.destination}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${values.departure}</span>
          <span class="ticket-price ml-auto">${values.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">${values.count_per}</span>
          <span class="ticket-flight-number">${values.num_air}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
          >Delete</a
        >
      </div>
    </div>
      `;
    }
  }
  
  const favoritesUi = new Favorites();
  export default favoritesUi;