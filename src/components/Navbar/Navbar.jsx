import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/icons/megamovil-logo.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [noTransition, setNoTransition] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY) {
          // Scroll hacia abajo
          if (!isScrolled) {
            // Primer instante en que pasa el límite: cambiamos a fixed pero sin animación para que no brinque
            setNoTransition(true);
            setIsScrolled(true);
            setShowNav(false);
            setIsMobileMenuOpen(false);
            setTimeout(() => setNoTransition(false), 50);
          } else {
            setShowNav(false);
            setIsMobileMenuOpen(false);
          }
        } else {
          // Scroll hacia arriba: mostrar menú con animación
          setIsScrolled(true);
          setShowNav(true);
        }
      } else {
        // En la parte superior de la página
        if (isScrolled) {
          // Cambiamos a absolute sin animación para que no brinque al llegar arriba
          setNoTransition(true);
          setIsScrolled(false);
          setShowNav(true);
          setTimeout(() => setNoTransition(false), 50);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isScrolled]);

  // Construcción de clases dinámicas
  const navbarClasses = `navbar-container ${isScrolled ? 'navbar--scrolled' : ''} ${!showNav ? 'navbar--hidden' : ''} ${noTransition ? 'navbar--no-transition' : ''}`;

  return (
    <header className={navbarClasses}>
      <div className="navbar-inner container mx-auto px-4 max-w-[1320px]">
        {/* LOGO */}
        <a href="/" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <img src={logo} alt="Mega móvil" className="h-8 md:h-10 w-auto object-contain" />
          </div>
        </a>

        {/* MENÚ DE NAVEGACIÓN */}
        <nav className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#consulta" className="nav-pill" onClick={() => setIsMobileMenuOpen(false)}>CONSULTA</a>
          <a href="#cambia" className="nav-pill nav-pill--orange" onClick={() => setIsMobileMenuOpen(false)}>CÁMBIA TU LÍNEA</a>
          <a href="#promociones" className="nav-pill" onClick={() => setIsMobileMenuOpen(false)}>PROMOCIONES</a>
          <a href="#tienda" className="nav-pill" onClick={() => setIsMobileMenuOpen(false)}>TIENDA</a>
          <a href="#esim" className="nav-pill" onClick={() => setIsMobileMenuOpen(false)}>eSIM</a>
          <a href="#ayuda" className="nav-pill" onClick={() => setIsMobileMenuOpen(false)}>AYUDA</a>
        </nav>

        {/* ACCIONES Y MENÚ MÓVIL */}
        <div className="navbar-actions">
          <a href="#ubicacion" className="location-btn">
            <FontAwesomeIcon icon={faLocationDot} />
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>
    </header>
  );
}
