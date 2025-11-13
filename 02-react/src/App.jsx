import { useState } from "react";

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Pagination from  './components/Pagination.jsx'
import JobListings from './components/JobListings.jsx'
import SearchFormSection from "./components/SearchFormSection.jsx";

import jobsData from './data.json'

// ¿Cómo podría renderizar una lista de elementos/componentes para mostrarlos en la UI?

const RESULT_PER_PAGE = 4;

function App() {
  const [filters, setFilters] = useState({
      technology: '',
      location: '',
      experienceLevel: ''
    })

  const [textToFilter, setTextToFilter] = useState('')

  const [currentPage, setCurrentPage] = useState(1);

  const jobsFilteredByFilters = jobsData.filter(job => {
    return (
      (filters.technology === '' || job.data.technology === filters.technology) // cuando filters.technology === '' es verdadero, la condición completa se evalúa como true para todos los trabajos, y el resultado es una copia completa del array original, sin filtrar.

    )
  })

  
  const jobsWithTextFilter = textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    })
  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULT_PER_PAGE);

  const pagedResults = jobsWithTextFilter.slice( 
    (currentPage - 1) * RESULT_PER_PAGE, // Pagina 1 -> 0, Pagina 2 -> 5,  Pagina 3 -> 10
    currentPage * RESULT_PER_PAGE        // Pagina 1 -> 5, Pagina 2 -> 10, Pagina 3 -> 15
  );

  console.log("-----> render App")

  const handlePageChange = (page) => {
    console.log("Cambio a la pagina:", page);
    setCurrentPage(page);
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  return (
    <>
    <Header />
    <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <section>
            <JobListings jobs={pagedResults} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
    </main>
    <Footer />
    </>
  )
}

export default App
