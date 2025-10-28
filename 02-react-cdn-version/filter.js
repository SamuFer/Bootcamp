import { state } from '../01-javascript/config.js'

state.count++

console.log(state)

const searchForm = document.querySelector('#empleos-search-form')
const searchInput = document.querySelector('#empleos-search-input')
searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    // console.log('submit')
    
    // 1. Obtener la palabra de búsqueda
    const palabraBuscada = searchInput.value.toLowerCase().trim(); // Limpiar y estandarizar la entrada
    console.log(palabraBuscada)
    // 2. Obtener todas las ofertas de trabajo
    const jobs = document.querySelectorAll('.job-listing-card');

    // 3. Recorrer cada oferta de trabajo y aplicar el filtro
    jobs.forEach(job => {
        // Seleccionar el h3 dentro de la tarjeta actual
        const jobTitleElement = job.querySelector('h3');
        // Verificar si el h3 existe antes de intentar acceder a su texto
        if (jobTitleElement) {
          const textoCompleto = jobTitleElement.textContent.toLowerCase();
          
          // 4. Lógica de filtrado: mostrar si el texto del trabajo incluye la palabra buscada        
          const isShown = textoCompleto.includes(palabraBuscada);
          
          // 5. Ocultar o mostrar la tarjeta de trabajo según el resultado
          // Si isShown es false, se añade la clase 'is-hidden'. Si es true, se elimina.
          job.classList.toggle('is-hidden', !isShown);
        }
    });
})


// Obtener el contenedor de los filtros y el párrafo de mensaje
const searchFiltersListeningDiv = document.querySelector('.search-filters');
const mensaje = document.querySelector('#filter-selected-value');

// Un solo event listener para manejar los cambios en todos los <select>
searchFiltersListeningDiv.addEventListener('change', function () {
    // 1. Obtener los valores seleccionados de cada filtro
    const selectedTechnology = document.getElementById('filter-technology').value;
    const selectedLocation = document.getElementById('filter-location').value;
    const selectedExperienceLevel = document.getElementById('filter-experience-level').value;

    // 2. Actualizar el mensaje de selección (opcional)
    
      const filtersSelected = [selectedTechnology, selectedLocation, selectedExperienceLevel].filter(valor => valor !== '');
      if (filtersSelected.length > 0) {
        mensaje.textContent = `Has seleccionado: ${filtersSelected.join(', ')}`
      } else {
        mensaje.textContent = ''
      }

    // 3. Obtener todas las ofertas de trabajo
    const jobs = document.querySelectorAll('.job-listing-card');

    // 4. Recorrer cada oferta de trabajo y aplicar el filtro
    jobs.forEach(job => {
        const jobTechnology = job.getAttribute('data-technology');
        // console.log(jobTechnology)
        const jobTechnologiesArray = jobTechnology.split(',');
        // console.log(jobTechnologiesArray)
        
        const modalidad = job.getAttribute('data-modalidad'); // Asumiendo 'data-location' en tu HTML
        const jobExperienceLevel = job.getAttribute('data-nivel');

        // Lógica de filtrado: mostrar si coincide con todos los filtros seleccionados
        const technologyMatch = selectedTechnology === '' || jobTechnologiesArray.includes(selectedTechnology);
        const locationMatch = selectedLocation === '' || selectedLocation === modalidad;
        const experienceMatch = selectedExperienceLevel === '' || selectedExperienceLevel === jobExperienceLevel;

        const isShown = technologyMatch && locationMatch && experienceMatch;
        
        job.classList.toggle('is-hidden', !isShown);
    });
});


// Falta la logica de condicion de que si yo quiero o uso un filtro, el buscador deberia buscar de acorde al filtro, 
//  y si no uso ningun filtro deberia buscar cuaquier palabra que exista.