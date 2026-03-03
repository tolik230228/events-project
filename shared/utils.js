import { domElements, state } from "./constants.js";

export const renderSkeletons = () => {
  domElements.eventsGrid.innerHTML = "";

  domElements.eventsGrid.innerHTML = Array(state.size)
    .fill(0)
    .map(
      () => `
    <div class="skeleton">
  <div class="skeleton-img"></div>
  <div class="skeleton-text"></div>
  <div class="skeleton-text" style="width: 50%;"></div>
</div>
  `,
    )
    .join("");
};

export function renderEvents(events) {
  domElements.eventsGrid.innerHTM = "";

  events.forEach((event) => {
    const image =
      event.images.find((img) => img.width > 400)?.url || event.images[0].url;
      const date = event.dates.start.localDate || "No date"
      const location = event._embedded?.venues?.[0]?.name || "No venue"

      const cardHtml = `
        <div class="card">
      <div class="image-container"> 
        <img src="${image}" alt="${event.name}" class="card-img">
    </div>
    <div class="event-info">
      <h3>${event.name}</h3>
      <p class="event-date">${date}</p>
      <p class="event-venue">📍${location}</p>
    </div>
  </div>
      `

domElements.eventsGrid.insertAdjacentHTML("beforeend", cardHtml)


  });
}

export function renderPagination() {
  domElements.paginationContainer.innerHTML = ""

  if (state.total_pages <= 1) return

  const pages = []
  const range = 2

  for (let i = 0; i < state.total_pages; i++) {
    if (i === 0 || i === state.total_pages -1 || i >= state.page - range || i <= state.page + range) {
      pages.push(i)
      

    }
    else if (pages[pages.length -1] !== "...") {
      pages.push("...")
    }
  }
  

}
