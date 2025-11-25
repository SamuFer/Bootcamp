import {useRouter} from "../hooks/useRouter.jsx";

// sirve para crear enlaces de navegacion internos en la aplicacion sin recargar la pagina (single page application)

export function Link({ href, children, ...props }) { // ...props para recibir cualquier otro atributo que se le quiera pasar al componente
  const { navigateTo } = useRouter();  
  const handleClick = (event) => {
        // evitar el comportamiento por defecto del navegador
        event.preventDefault();
        // cambiar la URL sin recargar la pagina
        
        // disparar un evento para notificar a la aplicacion que la URL ha cambiado
        navigateTo(href);
    }

    return(
    <a href={href} {...props} onClick={handleClick}>
      {children}     {/* children -> es el contenido que se le pase entre las etiquetas <Link> ... </Link> */}
    </a>
  );        
}