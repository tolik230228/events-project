import { API_KEY, BASE_URL, state, domElements } from "../shared/constants.js";
import { renderSkeletons,renderEvents, renderPagination } from "../shared/utils.js";

domElements.sizeSelect.addEventListener("change", (event) => {
  state.size = parseInt(event.target.value)
  state.page = 0 
  fetchEvents("")
})

domElements.searchInput.addEventListener("keypress", (event) => {
  if(event.key === "Enter") handleSearch() 
})

domElements.searchBtn.addEventListener("click", handleSearch)

export async function fetchEvents() {
  renderSkeletons();
  
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&size=${state.size}&page=${state.page}`;

    if (state.keyword) {
      url += `&keyword=${encodeURIComponent(state.keyword)}`;
    }

    if (state.country_code) {
      url += `&countryCode=${state.country_code}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data._embedded && data._embedded.events) {
      const apiTotalPages = data.page.totalPages;
      const maxAllowedPages = Math.floor(1000 / state.size);
      state.total_pages = Math.min(apiTotalPages, maxAllowedPages)

      state.current_events = data._embedded.events
      renderEvents(data._embedded.events)
      renderPagination()
    } else {
        state.total_pages = 0
        state.current_events = []
        domElements.eventsGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center'>The data has no events</p>"
        domElements.paginationContainer.innerHTML=""
    }
  } catch (error) {
    console.error(error);
  }
}

function handleSearch() {
  state.country_code = domElements.countrySelect.value
  state.keyword = domElements.searchInput.value
  state.page = 0 
  fetchEvents()
}