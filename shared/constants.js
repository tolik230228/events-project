export const API_KEY = "KjCTevbr1TmkGZ2vBNgkzB8Kyo798G8i";
export const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

export const state = {
    page: 0,
    size: 15,
    total_pages: 0,
    keyword: "",
    country_code: ""
}

export const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "Great Britain" },
    { code: "DE", name: "Germany" },
    { code: "ES", name: "Spain" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "AU", name: "Australia" },
    { code: "PL", name: "Poland" },
    { code: "UA", name: "Ukraine" },
]

export const domElements = {
    searchInput: document.getElementById("search-input"),
    countrySelect: document.getElementById("country-select"),
    sizeSelect: document.getElementById("size-select"),
    loader: document.getElementById("loaded"),
    eventsGrid: document.getElementById("events-container"),
    paginationContainer: document.getElementById("pagination"),
}

