import { API_KEY, BASE_URL, state, domElements } from "../shared/constants.js";

export async function fetchEvents() {
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
    } else {
        state.total_pages = 0
        state.current_events = []
        domElements.paginationContainer.innerHTML=""
    }
  } catch (error) {
    console.error(error);
  }
}
