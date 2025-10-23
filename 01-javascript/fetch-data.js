const container = document.querySelector('.jobs-listings')

const RESULTS_PER_PAGE = 3

const botonSiguiente = document.querySelector('#siguiente')
botonSiguiente.addEventListener('click', function (event) {
  const element = event.target
  console.log(element)
})

fetch("./data.json") /* fetch es asíncrono */
  .then((response) => {
    return response.json()
  }) 
  .then((jobs) => {
    const TOTAL_ELEMENTOS = jobs.length
    let NUM_OF_PAGES = TOTAL_ELEMENTOS / RESULTS_PER_PAGE 
    let PAGE_NUMBER = 1

    const RESULTS_TO_SKIP = (PAGE_NUMBER - 1) * RESULTS_PER_PAGE;
    const RESULTS = jobs.slice(RESULTS_TO_SKIP, RESULTS_PER_PAGE + RESULTS_TO_SKIP);
    console.log(RESULTS) 

    RESULTS.forEach(job => {
      const article = document.createElement('article')
      article.className = 'job-listing-card'

      article.dataset.modalidad = job.data.modalidad
      article.dataset.technology = job.data.technology
      article.dataset.nivel = job.data.nivel

      article.innerHTML = `<div>
          <h3>${job.titulo}</h3>
          <small>${job.empresa} | ${job.ubicacion}</small>
          <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>`

      container.appendChild(article)
      
    })
  })


