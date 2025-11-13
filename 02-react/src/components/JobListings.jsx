import JobCard from '../components/JobCard.jsx'


// console.log(jobsData)

export default function JobListings({jobs}) {
    return (
        <> 
            <div>
                <h2>Resultados de busqueda</h2>
            </div>

            <div className="jobs-listings">
                {/* Aquí se insertan los empleos dinámicamente */}
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </div>
        </>
    )
}