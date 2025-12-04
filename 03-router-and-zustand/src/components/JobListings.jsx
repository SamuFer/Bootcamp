import {JobCard} from '../components/JobCard.jsx'


// console.log(jobsData)

export function JobListings({jobs}) {
    return (
        <> 
            
           
            
            <div className="jobs-listings">

                {
                    jobs.length === 0 && (
                        <p style={{textAlign: 'center', padding: '1rem', textWrap: 'balance'}}>No se han encontrado empleos que
                        coinciden con los criterios de busqueda</p>
                    )
                }

                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </div>
        </>
    )
}