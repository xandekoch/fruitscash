import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { authenticatedNavLinks, unAuthenticatedNavLinks } from '../constants';
import { useAuth } from '../context/AuthProvider';


const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user: { isAdmin } } = useAuth();
  const navRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isDepositRoute = location.pathname === '/deposit';

  useEffect(() => {
    // Função para fechar a navbar quando clicar fora dela
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        event.target &&
        !navRef.current.contains(event.target) &&
        !((event.target).closest('.menu-button'))
      ) {
        setMenuOpen(false);
      }
    };

    // Adiciona o event listener quando a navbar é montada
    document.addEventListener('mousedown', handleClickOutside);

    // Remove o event listener quando a navbar é desmontada
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div
        data-collapse="small"
        data-animation="default"
        data-duration={400}
        role="banner"
        className="navbar w-nav navbar-mobile"
      >
        <div className="container w-container">
          <NavLink
            to="/"
            aria-current="page"
            className="brand w-nav-brand"
            aria-label="home"
          >
            <img
              src="/assets/home/logoapple.png"
              height={28}
              alt=""
              className="image-6"
            />
            <div className="nav-link logo">FruitsCash</div>
          </NavLink>
          <nav
            role="navigation"
            className="nav-menu w-nav-menu"
            style={{ transform: "translateY(0px) translateX(0px)" }}
          >
            {(!isAuthenticated ? unAuthenticatedNavLinks : authenticatedNavLinks).map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={link.className}
                style={{ maxWidth: "100%" }}
                onClick={(e) => {
                  if (link.label === "Sair") {
                    e.preventDefault(); // Evita o redirecionamento padrão
                    handleLogout();
                    navigate('/');
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin &&
              <NavLink
                to='/admin'
                className="button nav w-button"
                style={{ background: '#2377d3' }}
                onClick={toggleMenu}
              >
                Painel Admin
              </NavLink>
            }
            <NavLink
              to={isAuthenticated ? "/deposit" : "/sign-up"}
              className="button nav w-button"
            >
              {isAuthenticated ? "Depositar" : "Cadastrar"}
            </NavLink>
          </nav>
          {isAuthenticated && (
            <div
              className="w-nav-button"
              style={{ WebkitUserSelect: "text", paddingBlock: 0 }}
              aria-label="menu"
              role="button"
              tabIndex={0}
              aria-controls="w-nav-overlay-0"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              {!isDepositRoute && (
                <div className="" style={{ WebkitUserSelect: "text" }}>
                  <NavLink
                    to="/deposit"
                    className="menu-button w-nav-dep nav w-button"
                  >
                    DEPOSITAR
                  </NavLink>
                </div>
              )}
            </div>
          )}


          <div
            className={`menu-button w-nav-button ${menuOpen ? 'w--open' : ''}`}
            style={{ WebkitUserSelect: "text" }}
            aria-label="menu"
            role="button"
            tabIndex={0}
            aria-controls="w-nav-overlay-0"
            aria-haspopup="menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <div className="icon w-icon-nav-menu" />
          </div>
        </div>
        <div
          className="w-nav-overlay"
          data-wf-ignore=""
          id="w-nav-overlay-0"
          style={{ display: 'block', height: menuOpen ? '1500px' : '0' }}
        >
          <nav
            ref={navRef}
            role="navigation"
            className="nav-menu w-nav-menu"
            style={{
              transform: `translateY(${menuOpen ? '0px' : '-237px'}) translateX(0px)`,
              transition: "transform 400ms ease 0s"
            }}
            data-nav-menu-open=""
          >
            {(!isAuthenticated ? unAuthenticatedNavLinks : authenticatedNavLinks).map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={link.className}
                style={{ maxWidth: "100%" }}
                onClick={(e) => {
                  if (link.label === "Sair") {
                    e.preventDefault();
                    handleLogout();
                    navigate('/');
                  } else {
                    toggleMenu();
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              {isAdmin &&
                <NavLink
                  to='/admin'
                  className="button nav w-button"
                  style={{ background: '#2377d3', margin: 0 }}
                  onClick={toggleMenu}
                >
                  Painel Admin
                </NavLink>
              }
              <NavLink
                to={isAuthenticated ? "/deposit" : "/sign-up"}
                className="button nav w-button"
                style={{ margin: 0 }}
                onClick={toggleMenu}
              >
                {isAuthenticated ? "Depositar" : "Cadastrar"}
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar