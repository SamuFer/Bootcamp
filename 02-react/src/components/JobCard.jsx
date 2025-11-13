import { useState } from "react";
export default function JobCard({ job }) {
    
    const [isApplied, setIsApplied] = useState(false);
    const handleApplyClick = () => {
        setIsApplied(true);
    }

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job';
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar';

    return (
        <article 
            className="job-listing-card"
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-technology={job.data.technology}
        >   
            <div>
                <h3>{job.titulo}</h3>
                <small>{job.empresa} - {job.ubicacion}</small>
                <p>{job.descripcion}</p>
            </div>
            <button 
                // disabled={isApplied}
                className={buttonClasses} onClick={handleApplyClick} //si isApplied es true agrega la clase is-applied y button-apply-job siempre esta activa hasta que se haga click
                >
                {buttonText}
            </button>
        </article>         
    )
} 
