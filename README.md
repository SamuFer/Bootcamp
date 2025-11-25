Probando 1er push

## Explicacion del proceso de navegacion de la paginacion: 
- Proceso 1: Carga Inicial de la Aplicación
Cuando cargas la página por primera vez, React ejecuta los componentes en este orden:
App() se ejecuta por primera vez.
Ves el primer mensaje: -----> render App.
React encuentra el componente <Pagination ... /> y lo renderiza.
Pagination() se ejecuta por primera vez.
Ves el primer mensaje: -----> render Pagination.
En este punto, la interfaz está visible. Has visto los dos primeros console.log.
- Proceso 2: El Usuario Interactúa (hace clic)
Ahora, el usuario hace clic en el enlace de la "Página 2".
Se ejecuta hanleChangePage (o handleNextClick/handlePrevClick).
Se llama a onPageChange(page) (que es handlePageChange en App.jsx).
handlePageChange llama a setCurrentPage(2).
Aquí es donde ocurre la magia de React:
setCurrentPage() programa un cambio de estado.
Cuando el estado de un componente de React cambia, React sabe que ese componente y todos sus componentes hijos deben volver a renderizarse para reflejar el nuevo estado.
- Proceso 3: El Re-renderizado (La actualización)
Debido al cambio de estado, el proceso de renderizado comienza de nuevo, pero esta vez con la nueva información:
App() se ejecuta por segunda vez.
Ves el segundo mensaje: -----> render App.
currentPage ahora vale 2.
React vuelve a renderizar <Pagination ... /> pasándole currentPage={2}.
Pagination() se ejecuta por segunda vez.
Ves el segundo mensaje: -----> render Pagination.
Internamente, currentPage ahora vale 2. La clase CSS 'is-active' se mueve al enlace de la página 2.
+ ¿Por qué solo 2 y no 4?
El error conceptual está en esperar que se generen 4 mensajes en total por una sola acción de clic.
Cada vez que haces clic, el ciclo completo ocurre una sola vez:
Renderizado Inicial: Se muestran los 2 primeros logs.
Después del primer clic: Se muestran los otros 2 logs (porque se ha producido un re-renderizado completo de la aplicación y la paginación).
+ Si haces otro clic, se mostrarán otros dos logs, y así sucesivamente.

### Desde otro punto de vista:
El Flujo Circular de React
Imagina tu aplicación como un árbol, donde App es el tronco y Pagination es una rama.
       App (Tronco/Padre)
|
Pagination (Rama/Hijo)

#### 1. El Evento Nace en la Rama (haces clic)

El evento `click` ocurre en la interfaz de usuario, en el componente **hijo** (`Pagination`).

*   Se ejecuta `hanleChangePage` en `Pagination`.
*   Esta función llama a `onPageChange` (que es `handlePageChange` en `App`).
*   Aquí es donde ves tu primer debug: **`console.log("Cambio a la pagina:", page);`** (dentro de `App`).

#### 2. La Información Sube al Tronco (cambio de estado)

*   `handlePageChange` actualiza el estado (`setCurrentPage(page)`).
*   **React detecta este cambio en el tronco (`App`) y decide que debe actualizar todo el árbol.**

#### 3. La Actualización Baja por el Árbol (re-renderizado)

Este es el punto que te confunde. Para que React actualice la interfaz, **vuelve a ejecutar** las funciones de los componentes.

*   React llama a la función `App()` de nuevo.
    *   Ves el debug: **`console.log("-----> render App")`**.
*   `App` le pasa la *nueva* página actual (`currentPage` ahora es 2) a `Pagination`.
*   React llama a la función `Pagination()` de nuevo.
    *   Ves el debug: **`console.log("-----> render Pagination")`**.

### Conclusión

Sí, para ver los `console.log` de "render App" y "render Pagination", la aplicación **debe comenzar un nuevo ciclo de renderizado desde el principio del árbol**, activado por el cambio de estado que ocurrió arriba en `App`.

El `onClick` solo es el **disparador** que inicia el proceso de **re-renderizado** que luego ejecuta esos `console.log`.

**En resumen:** el clic ejecuta la lógica de la función *primero*, y la actualización del estado que ocurre *dentro* de esa lógica es lo que *después* fuerza a React a ejecutar los `console.log` de renderizado.

##

## Explicacion del proceso de navegacion interna de la pagina, SPA(Single Application Page):

Este fragmento de código define un componente de React personalizado llamado Link. Su propósito es crear un enlace (< a >) que permite la navegación de una sola página (SPA - Single Page Application) sin recargar la página completa.
A continuación, se explica en detalle cada parte del código:
1. Definición del Componente


    ```js
    export function Link({ href, children, ...props }) {
        // ...
    }
    ```
- **export function Link(...)**: Define un componente funcional de JavaScript/React llamado Link y lo exporta para que pueda ser utilizado en otras partes de la aplicación.
- **({ href, children, ...props })**: El componente recibe propiedades (props) de su padre.
    - **href**: La URL de destino a la que debe apuntar el enlace (por ejemplo, "/about").

    - **children**: El contenido que se coloca dentro de las etiquetas del componente (por ejemplo, el texto "Acerca de" en <Link href="/about">Acerca de</Link>).

    - **...props**: Utiliza el operador de spread (...) para recopilar cualquier otra propiedad adicional que se le pase al componente (como className, target, title, etc.) y las almacena en un objeto llamado props.

2. La Función handleClick
    ```js
    const handleClick = (event) => {

    // evitar el comportamiento por defecto del navegador
    event.preventDefault();

    // cambiar la URL sin recargar la pagina
    window.history.pushState({}, '', href); 

    // disparar un evento para notificar a la aplicacion que la URL ha cambiado
    window.dispatchEvent(new PopStateEvent('popstate'));
    }
    ```
    Esta función se ejecuta cuando el usuario hace clic en el enlace.

- **event.preventDefault();**: Esta es la clave del comportamiento SPA. Detiene la acción predeterminada del navegador cuando se hace clic en un enlace (que normalmente es navegar a la nueva URL y recargar toda la página).

- **window.history.pushState({}, '', href)**;: Manipula la API del historial del navegador.
    - **Cambia la URL visible** en la barra de direcciones del navegador a la especificada en href sin realizar una recarga de página completa.
    - **{}** y **' '** son parámetros requeridos para el estado y el título (que a menudo se dejan vacíos o con valores predeterminados en este contexto).
- **window.dispatchEvent(new PopStateEvent('popstate'));**: Dispara manualmente un evento popstate. En una SPA típica, el código principal de la aplicación escucha este evento para detectar cambios de URL y renderizar el componente de vista correcto sin recargar.

3. El Resultado (Renderizado)

```js
return(
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
);
```
El componente Link renderiza finalmente un elemento HTML < a > -> (enlace):
- **href={href}**: Establece el atributo href estándar del enlace con la URL proporcionada. Esto es bueno para la accesibilidad y el SEO (motores de búsqueda).

- **{...props}**: Aplica cualquier propiedad adicional que se haya pasado al componente al elemento < a > subyacente.

- **onClick={handleClick}**: Asigna la función handleClick definida anteriormente como el manejador de eventos para el clic.

- **{children}**: Renderiza el contenido que el usuario puso dentro de las etiquetas < Link >...< /Link >.

***En Resumen***
```
Este código es la implementación básica de un router o sistema de navegación personalizado en React. 
Permite a la aplicación cambiar de "página" (o vista) sin recargar la página completa, 
proporcionando una experiencia de usuario más fluida, similar a una aplicación de escritorio.
```
##
## Expliacion sencilla sobre que es un *CUSTOM HOOK*
Un "custom hook" es una función en React que te permite extraer y reutilizar lógica con estado o efectos secundarios entre varios componentes. La convención es que su nombre empiece por "use", como useCounter o useFetch, y se crea para organizar y compartir el código que no es de presentación, facilitando que los componentes se centren solo en la interfaz visual. 
- Características clave:
    - **{Reutilización de lógica}**: Evita copiar y pegar el mismo código una y otra vez. Puedes mover la lógica común a un "custom hook" y usarla en cualquier otro componente.

    - **{Separación de responsabilidades}**: Permite separar la lógica (como la obtención de datos o el manejo de estado) de la parte visual del componente, haciendo que el código sea más limpio y fácil de leer.

    - **{Convención de nomenclatura}**: Se deben nombrar con el prefijo use, por ejemplo, useMiLogica.

    - **{Encapsulación de estado}**: Pueden usar otros hooks (como useState o useEffect) y encapsular su lógica dentro de una función. 

### Ejemplo sencillo
Imagina que tienes que gestionar el estado de un contador en varios componentes. En lugar de escribir useState y la lógica de incremento/decremento en cada componente, podrías crear un "custom hook" llamado ***useCounter***:
```js
import { useState } from 'react';

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}
```
Luego, en cualquier componente, simplemente lo llamas para tener la lógica del contador lista:
```js
function MiComponente() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```
Este es un ejemplo básico que ilustra cómo la lógica del contador se puede reutilizar sin tener que repetirla en cada componente.

