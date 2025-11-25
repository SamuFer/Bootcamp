import { use, useEffect, useState } from "react";

import Pagination from  '../components/Pagination.jsx'
import JobListings from '../components/JobListings.jsx'
import SearchFormSection from "../components/SearchFormSection.jsx";

import jobsData from '../data.json'

 
const RESULT_PER_PAGE = 4;

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })

  const [textToFilter, setTextToFilter] = useState('')

  const [currentPage, setCurrentPage] = useState(1);

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        

        const params = new URLSearchParams()

        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology) 
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)  

        const offset = (currentPage -1) * RESULT_PER_PAGE // calcular el offset para la paginacion que es el numero de resultados a saltar
        params.append('limit', RESULT_PER_PAGE) // numero de resultados por pagina
        params.append('offset', offset) // numero de resultados a saltar segun la pagina actual

        const queryParams = params.toString()
        

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data) 
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, textToFilter, currentPage]) // array vacio para que solo se ejecute una vez al montar el componente, porque todavia no hay dependencias que vigilar o filtrar

  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  const handlePageChange = (page) => {

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

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter 
  }

}

export function SearchPage() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters()  



  const title = loading ? `Cargando... - DevJobs`:`Resultados: ${total}, Pagina ${currentPage} - DevJobs`

  return (
    <main>
        <title>{title}</title>
        <meta name="description" content="Explora miles oportunidades laborales en el sector
        tecnologico. Encuentra tu proximo empleo en DevJobs." />
        
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
        
        <section>
           <h2 style={{ textAlign: 'center'}}>Resultados de busqueda</h2> 
          {
            loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />
          }
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
    </main> 
  )
}


