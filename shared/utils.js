import { domElements, state } from "./constants.js";
import { fetchEvents } from "../api/api.js"

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
  domElements.eventsGrid.innerHTML = "";

  events.forEach((event) => {
    const image =
      event.images.find((img) => img.width > 400)?.url || event.images[0].url;
    const date = event.dates.start.localDate || "No date"
    const location = event._embedded?.venues?.[0]?.name || "No venue"

    const cardHtml = `
        <div class="card" onclick="openModal('${event.id}')">
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
    if (i === 0 || i === state.total_pages - 1 || (i >= state.page - range && i <= state.page + range)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...")
    }
  }

  domElements.paginationContainer.appendChild(createPageBtn('Prev', state.page - 1, state.page > 0))
  pages.forEach(page => {
    if (page === '...') {
      domElements.paginationContainer.appendChild(createDots())
    } else {
      const btn = createPageBtn(page + 1, page, true)
      if (page === state.page) {
        btn.classList.add('active');
        btn.disabled = true;
      }

      domElements.paginationContainer.appendChild(btn)
    }
  })
  domElements.paginationContainer.appendChild(createPageBtn('Next', state.page + 1, state.page < state.total_pages - 1))
}

function createPageBtn(text, targetPage, isEnabled) {
  const pageBtn = document.createElement('button')
  pageBtn.innerText = text
  pageBtn.className = 'page-btn'
  pageBtn.disabled = !isEnabled
  if (isEnabled) {
    pageBtn.onclick = () => {
      state.page = targetPage
      fetchEvents()
    }
  }

  return pageBtn
}

function createDots() {
  const span = document.createElement('span')
  span.innerText = '...'
  span.style.alignSelf = 'center'
  return span
}

window.openModal = function(id) {
    const event = state.current_events.find(event => event.id === id)

    if(!event) return

    const bigImg = event.images.sort((a, b) => b.width - a.width)[0]?.url
    domElements.modalImg.src = bigImg

    domElements.modalTitle.textContent = event.name 
    domElements.modalDate.textContent = event.dates.start.localDate || "No date"
    domElements.modalTime.textContent = event.dates.start.localTime || "No time"
    domElements.modalVenue.textContent = event._embedded.venues[0].name
    domElements.modalDesc.textContent = event.info || "No description"
    domElements.modalLink.href = event.url 


    domElements.backdrop.classList.add("open")
    document.body.style.overflow = "hidden"
}