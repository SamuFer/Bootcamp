import styles from './Pagination.module.css';
export function Pagination({currentPage = 1, totalPages = 10, onPageChange}) { // valores prederminados en currentPage y totalPages, solo funcionan si no se les pasa ningun valor desde el componente padre App.jsx
    
    

    //generar un array de paginas a mostrar
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const stylePrevButton = isFirstPage ? { pointerEvents: 'none', opacity: 0.5} : {}
    const styleNextButton = isLastPage ? { pointerEvents: 'none', opacity: 0.5} : {}

    const handlePrevClick = (event) => {
        event.preventDefault();
        if (isFirstPage === false) {
            onPageChange(currentPage - 1);
        }
    }
    
    const handleNextClick = (event) => {
        event.preventDefault();
        if (isLastPage === false) {
            onPageChange(currentPage + 1);
        }
    }

    const hanleChangePage = (event, page) => {
        event.preventDefault();
        onPageChange(page);
    }

    const buildPageUrl = (page) => { // funcion para construir la url con el numero de pagina
        const url = new URL(window.location) // obtenemos la url actual
        url.searchParams.set('page', page) // actualizamos el parametro page en la url para que sea el numero de pagina que queremos
        return `${url.pathname}?${url.searchParams.toString()}` // devolvemos la url completa con el pathname y los parametros de busqueda actualizados
    }

    // const hanleChangePage = (event) => {
    //     const page = Number(event.target.dataset.page);
    //     event.preventDefault();
    //     onPageChange(page);
    // }

    return (
        <nav className={styles.pagination}>
            <a  id="atras" href={buildPageUrl(currentPage - 1)} style={stylePrevButton} onClick={handlePrevClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>
           {pages.map(page => (
            <a 
                key={page}
                // data-page={page}
                href={buildPageUrl(page)} // llamo a la funcion buildPageUrl para construir la url con el numero de pagina
                className={currentPage === page ? styles.isActive : ''} //final del proceso para cambiar de pagina
                onClick={(event) => hanleChangePage(event, page)} // uso una funcion onClick para pasarle el parametro page a la funcion hanleChangePage  
                // onClick={hanleChangePage}
            >   
                {page}
            </a>
           ))
           }
            <a id="siguiente" href={buildPageUrl(currentPage + 1)} style={styleNextButton} onClick={handleNextClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>
            </a>
        </nav>
    )
}