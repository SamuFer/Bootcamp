import { useState, useEffect, Children } from "react";
import { useParams,useNavigate } from "react-router"
import { Link } from "../components/Link" // importamos el componente Link para la navegacion interna mediante enlaces a diferencia de useNavigate que es para navegacion programatica

import snarkdown from "snarkdown";
import styles from './Detail.module.css'
import { useAuthStore } from "../store/AuthStore";
import { useFavoritesStore } from "../store/FavoritesStore";

function JobSection({title, content}){
    const html = snarkdown(content); // snarkdown -> convierte markdown a HTML
    return(
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
                {title}
            </h2>
            <div className={`${styles.sectionContent} prose`} dangerouslySetInnerHTML={{__html: html}}
            />  
        </section>
    )
}
function DetailPageBreadcrumbs({job}){  // Breadcrumbs -> migas de pan, ayuda a la navegacion, muestra la ruta de navegacion actual y permite volver a rutas anteriores
    return(
        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <Link
                    href="/search"
                    className={styles.breadcrumbButton}
                >
                    Empleos
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
            </nav>
        </div>
    )
}
function DetailPageHeader({ job }){ // Header -> encabezado de la pagina de detalle del trabajo , muestra el titulo del trabajo, la empresa, la ubicacion y el boton de aplicar; puede estar este bloque de codigo en otro archivo para mayor organizacion como DetailHeader.jsx
    return(
        <>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    {job.titulo}
                </h1>
                <p className={styles.meta}>
                    {job.empresa} · {job.ubicacion}
                </p>
            </header>
            <DetailApplyButton />
            <DetailFavoriteButton jobId={job.id} />
        </>    
    )
}
function DetailApplyButton(){ 
    const { isLoggedIn } = useAuthStore();
    return(
        <button disabled={!isLoggedIn} className={styles.applyButton}>
            {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
        </button>
    )
}

function DetailFavoriteButton({jobId}){
    const { isLoggedIn } = useAuthStore();
    const {toggleFavorite, isFavorite} = useFavoritesStore();
    return(
        <button
            disabled={!isLoggedIn}
            onClick={() => toggleFavorite(jobId)}
            aria-label={isFavorite(jobId) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
            {isFavorite(jobId) ? '❤️' : '🤍'}
        </button>
    )
}
export default function JobDetail() {
    const {jobId} = useParams(); // useParams -> hook que nos permite acceder a los parametros de la URL dinamica  
    const navigate = useNavigate(); // useNavigate -> hook que nos permite navegar programaticamente, es decir, redirigir al usuario a otra ruta

    const [job, setJob] = useState (null);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState (null);

    useEffect (()=>{
        fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
        .then((response) => {
            if (!response.ok) throw new Error ('Job not found');
            return response.json();
        })
        .then(json => {
            setJob (json);  
        })
        .catch((err) => {
            setError (err.message);
        })
        .finally(() => {
            setLoading (false);
        })
    }, [jobId])
    if (loading) {
        return <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div className={styles.loading}>
                <p className={styles.loadingText}>Cargando...</p>
            </div>
        </div>
    }
    if (error || !job) {
        return (
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>
                        Oferta no encontrada
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className={styles.errorButton}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        )
    }
    return(
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>

            <DetailPageBreadcrumbs job={job} /> 
            <DetailPageHeader job={job} />
            
            
            <JobSection title="Descripción del puesto" content={job.content.description} />
            <JobSection title="Responsabilidades" content={job.content.responsibilities} />
            <JobSection title="Requisitios" content={job.content.requirements} />
            <JobSection title="Acerca de la empresa" content={job.content.about} />
        </div>
    )
}