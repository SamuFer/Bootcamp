import { NavLink } from "react-router" // NavLink nos permite saber si la ruta está activa o no
import { Link } from "./Link"
import { useAuthStore } from "../store/AuthStore";
import { useFavoritesStore } from "../store/FavoritesStore";

export default function Header () {
  const {isLoggedIn} = useAuthStore();
  const { countFavorites } = useFavoritesStore();
  const numberOfFavorites = countFavorites();

  const HeaderUserButton = () => {
    const { isLoggedIn, login, logout } = useAuthStore()
    const {clearFavorites} = useFavoritesStore();

  const handleLogout = () => {
      logout();
      clearFavorites();
    }
  return isLoggedIn
    ? <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
    : <button onClick={login} className="btn-login">Iniciar sesión</button>
  }

  return (
    <header>
        <Link href="/" style={{textDecoration:'none'}}>
          <h1 style={{color:'white'}}>
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              DevJobs
          </h1>
        </Link>
        <nav>
            <NavLink 
              className={({ isActive }) => isActive ? 'nav-link-active' : ''}
              to="/">Inicio</NavLink>
            <NavLink 
              className={({ isActive }) => isActive ? 'nav-link-active' : ''}
              to="/search">Empleos</NavLink>
            {isLoggedIn && (  
              <NavLink 
                className={({ isActive }) => isActive ? 'nav-link-active' : ''}
                to="/profile">
                  Profile ❤️ {numberOfFavorites}
              </NavLink>
            )}
        </nav> 
        <HeaderUserButton />
    </header>
  )
}
