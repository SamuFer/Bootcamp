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