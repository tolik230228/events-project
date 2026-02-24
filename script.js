const API_KEY = "KjCTevbr1TmkGZ2vBNgkzB8Kyo798G8i";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

const state = {
    page: 0,
    size: 15,
    total_pages: 0,
    keyword: "",
    country_code: ""
}

const countries = [
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

const searchInput = document.getElementById("search-input")
const countrySelect = document.getElementById("country-select")
const sizeSelect = document.getElementById("size-select")
const loader = document.getElementById("loaded")
const eventsGrid = document.getElementById("events-container")
const paginationContainer = document.getElementById("pagination")
