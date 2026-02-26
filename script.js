import { API_KEY, BASE_URL, countries, domElements, state } from "./shared/constants.js"

countries.forEach(country => {
    const option = document.createElement("option")
    option.value = country.code 
    option.innerText = country.name 
    domElements.countrySelect.appendChild(option)
})