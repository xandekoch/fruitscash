import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { authenticatedNavLinks, unAuthenticatedNavLinks } from '../constants';

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
          <a
            href="/"
            aria-current="page"
            className="brand w-nav-brand"
            aria-label="home"
          >
            <img
              src="/public/assets/home/logoapple.png"
              loading="lazy"
              height={28}
              alt=""
              className="image-6"
            />
            <div className="nav-link logo">FruitsMoney</div>
          </a>
          <nav
            role="navigation"
            className="nav-menu w-nav-menu"
            style={{ transform: "translateY(0px) translateX(0px)" }}
          >
            {(!isAuthenticated ? unAuthenticatedNavLinks : authenticatedNavLinks).map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                activeClassName="w--current"
                className={link.className}
                style={{ maxWidth: "100%" }}
                onClick={(e) => {
                  if (link.label === "Sair") {
                    e.preventDefault(); // Evita o redirecionamento padrão
                    console.log('saiu'); // Chama a função de logout
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}
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
              <div className="" style={{ WebkitUserSelect: "text" }}>
                <a
                  href="/deposit"
                  className="menu-button w-nav-dep nav w-button"
                >
                  DEPOSITAR
                </a>
              </div>
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
            role="navigation"
            className="nav-menu w-nav-menu"
            style={{
              transform: `translateY(${menuOpen ? '0px' : '-237px'}) translateX(0px)`, // Condicional para translateY
              transition: "transform 400ms ease 0s"
            }}
            data-nav-menu-open=""
          >
            {(!isAuthenticated ? unAuthenticatedNavLinks : authenticatedNavLinks).map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                activeClassName="w--current"
                className={link.className}
                style={{ maxWidth: "100%" }}
                onClick={(e) => {
                  if (link.label === "Sair") {
                    e.preventDefault(); // Evita o redirecionamento padrão
                    console.log('saiu'); // Chama a função de logout
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to={isAuthenticated ? "/deposit" : "/sign-up"}
              className="button nav w-button"
            >
              {isAuthenticated ? "Depositar" : "Cadastrar"}
            </NavLink>

          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar