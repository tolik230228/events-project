import { countries, domElements, state } from "./shared/constants.js"
import { fetchEvents } from "./api/api.js"

countries.forEach(country => {
    const option = document.createElement("option")
    option.value = country.code 
    option.innerText = country.name 
    domElements.countrySelect.appendChild(option)
})

fetchEvents()