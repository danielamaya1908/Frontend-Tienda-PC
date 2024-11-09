
import React, { useState, useEffect, useRef } from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import logo from '../../img/Logo_Tienda_PC.png';
import LoginUser from '../Login/LoginUser';
import UserInfo from '../Login/UserInfo';
import Search from './Search'; // Cambia la ruta según tu estructura de carpetas


const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const searchInputRef = useRef(null);

  const [showLoginUser, setShowLoginUser] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showIPhoneMenu, setShowIPhoneMenu] = useState(false);
  const [showIPadMenu, setShowIPadMenu] = useState(false);
  const [showcomputadoresMenu, setShowcomputadoresMenu] = useState(false);
  const [showAirPodsMenu, setShowAirPodsMenu] = useState(false);
  const [showAppleWatchMenu, setShowAppleWatchMenu] = useState(false);
  const [showAppleTvMenu, setShowAppleTvMenu] = useState(false);
  const [showAccessoriesMenu, setShowAccessoriesMenu] = useState(false);
  const [showCreditMenu, setShowCreditMenu] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [showOferMenu, setShowOferMenu] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleUserClick = () => {
    if (user) {
      setShowUserInfo(!showUserInfo);
    } else {
      setShowLoginForm(!showLoginForm);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSupportClick = () => {
    navigate('/soporte-tecnico-client');
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowSearch(false);
      setShowLoginForm(false);
      setShowUserInfo(false);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleDropdownMouseEnter = (dropdownName) => {
    if (!showMobileMenu) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!showMobileMenu) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdownName) => {
    if (showMobileMenu) {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }
  };

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowUserInfo(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <BootstrapNavbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        fixed="top"
        className={`navbar-custom ${isAtTop ? 'navbar-at-top' : 'navbar-scrolled'}`}
      >
        <Container fluid className="container-fluid-custom navbar-container-fluid">
          <BootstrapNavbar.Brand href="/">
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo"
              onClick={() => window.location.href = '/'}
            />
          </BootstrapNavbar.Brand>
          <div className="d-flex order-lg-3">
            <div className="d-flex align-items-center ms-3 me-3">
              <FontAwesomeIcon
                icon={faShoppingBag}
                onClick={handleCartClick}
                style={{ cursor: 'pointer', color: 'black' }}
              />
            </div>
            <div className="d-flex align-items-center me-3" style={{ position: 'relative' }}>
              <FontAwesomeIcon
                icon={faUser}
                onClick={handleUserClick}
                style={{ cursor: 'pointer', color: 'black' }}
              />
              {showLoginForm && <LoginUser onClose={() => setShowLoginForm(false)} onLoginSuccess={handleLoginSuccess} />}
              {showUserInfo && user && (
                <UserInfo
                  user={user}
                  onLogout={handleLogout}
                  onClose={() => setShowUserInfo(false)}
                  className="user-info-container"
                />
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <span className="nav-link d-flex align-items-center me-3" style={{ color: 'black' }} onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              {showSearch && (
                <div ref={searchInputRef} className="search-container">
                  <Search onClose={() => setShowSearch(false)} />
                </div>
              )}
            </div>
          </div>
          <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleMobileMenu} />
          <BootstrapNavbar.Collapse id="responsive-navbar-nav" className={showMobileMenu ? 'show' : ''}>
            <Nav className="mr-auto ">
              {/*  <Nav.Link>Descubre lo nuevo</Nav.Link> */}
              <NavDropdown
                title="Computadores"
                id="computadores-dropdown"
                className="no-caret"
                show={activeDropdown === 'computadores'}
                onClick={() => toggleDropdown('computadores')}
                onMouseEnter={() => handleDropdownMouseEnter('computadores')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="/TodosComputadores">Todos los Computadores</NavDropdown.Item>
                <NavDropdown.Item href="computadoresAll">Equipos de Escritorio</NavDropdown.Item>
                <NavDropdown.Item href="portatiles">Portátiles</NavDropdown.Item>
                <NavDropdown.Item href="">Gamer</NavDropdown.Item>
                <NavDropdown.Item href="computadoresMini">Monitores</NavDropdown.Item>
                <NavDropdown.Item href="computadoresStudio">Usados</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParacomputadores">Accesorios</NavDropdown.Item>
              </NavDropdown>
               <NavDropdown
                title="Celulares"
                id="celulares-dropdown"
                className="no-caret"
                show={activeDropdown === 'celulares'}
                onClick={() => toggleDropdown('celulares')}
                onMouseEnter={() => handleDropdownMouseEnter('celulares')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="iphone">iPhone</NavDropdown.Item>
                <NavDropdown.Item href="">Samsung</NavDropdown.Item>
                <NavDropdown.Item href="">Xiaomi</NavDropdown.Item>
                <NavDropdown.Item href="">Poco</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaCelulares">Accesorios parar Celulares</NavDropdown.Item>
                <NavDropdown.Item href="">Usados</NavDropdown.Item>
                <NavDropdown.Item href="">Ofertas</NavDropdown.Item>
              </NavDropdown>
               <NavDropdown
                title="Tablets"
                id="tablets-dropdown"
                className="no-caret"
                show={activeDropdown === 'tablets'}
                onClick={() => toggleDropdown('tablets')}
                onMouseEnter={() => handleDropdownMouseEnter('tablets')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="ipad">Apple</NavDropdown.Item>
                <NavDropdown.Item href="iphone15pro">Samsung</NavDropdown.Item>
                <NavDropdown.Item href="/TodaslasTablets">Todas las Tablets</NavDropdown.Item>
                <NavDropdown.Item href="iphone14pro">Xiaomi</NavDropdown.Item>
                <NavDropdown.Item href="">Lenovo</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaTablets">Accesorios para Tablets</NavDropdown.Item>
                <NavDropdown.Item href="iphone13">Usados</NavDropdown.Item>
                <NavDropdown.Item href="iphone12">Ofertas</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="SmartWatch"
                id="ipads-dropdown"
                className="no-caret"
                show={activeDropdown === 'ipads'}
                onClick={() => toggleDropdown('ipads')}
                onMouseEnter={() => handleDropdownMouseEnter('ipads')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="ipadAll">Todos los Smartwatch</NavDropdown.Item>
                <NavDropdown.Item href="ipadPro">Gaming</NavDropdown.Item>
                <NavDropdown.Item href="ipadAir">Samsung</NavDropdown.Item>
                <NavDropdown.Item href="ipad">Xiaomi</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatch">Apple</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaiPad">Accesorios parar Smartwatch</NavDropdown.Item>
                <NavDropdown.Item href="ipadUsed">Usados</NavDropdown.Item>
                <NavDropdown.Item href="ipadUsed">Ofertas</NavDropdown.Item>
              </NavDropdown>
               <NavDropdown
                title="Sonido"
                id="sonido-dropdown"
                className="no-caret"
                show={activeDropdown === 'sonido'}
                onClick={() => toggleDropdown('sonido')}
                onMouseEnter={() => handleDropdownMouseEnter('sonido')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="SonidoAll">Todo de Sonido</NavDropdown.Item>
                <NavDropdown.Item href="Jbl">Parlantes</NavDropdown.Item>
                <NavDropdown.Item href="Bose">Audífonos</NavDropdown.Item>
                <NavDropdown.Item href="Harman">Diademas</NavDropdown.Item>
              </NavDropdown>
               <NavDropdown
                title="Cámaras"
                id="ofertas-dropdown"
                className="no-caret"
                show={activeDropdown === 'ofertas'}
                onClick={() => toggleDropdown('ofertas')}
                onMouseEnter={() => handleDropdownMouseEnter('ofertas')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="#">Camaras de Videovigilancia</NavDropdown.Item>
                <NavDropdown.Item href="#">Camaras Inalámbricas</NavDropdown.Item>
                <NavDropdown.Item href="#">DVR</NavDropdown.Item>
                <NavDropdown.Item href="#">Ofertas</NavDropdown.Item>
                <NavDropdown.Item href="#">Servicio de instalación</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Casa Inteligente"
                id="airpods-dropdown"
                className="no-caret"
                show={activeDropdown === 'airpods'}
                onClick={() => toggleDropdown('airpods')}
                onMouseEnter={() => handleDropdownMouseEnter('airpods')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="airpods">Todo de Casa Inteligente</NavDropdown.Item>
                <NavDropdown.Item href="airpodspro">Asistente de voz</NavDropdown.Item>
                <NavDropdown.Item href="airpods3gen">Caja Inteligente para TV</NavDropdown.Item>
                <NavDropdown.Item href="airpods2gen">Enchufe inteligente</NavDropdown.Item>
                <NavDropdown.Item href="airpodsmax">Luces Inteligentes</NavDropdown.Item>
                {/* <NavDropdown.Item href="#">Parlantes, Audífonos y más</NavDropdown.Item> */}
                <NavDropdown.Item href="AccesoriosParaAirpods">Aspiradoras Inteligentes</NavDropdown.Item>
                <NavDropdown.Item href="airpodsUsed">Ofertas</NavDropdown.Item>

              </NavDropdown>
             
              <NavDropdown
                title="Accesorios"
                id="accesorios-dropdown"
                className="no-caret"
                show={activeDropdown === 'accesorios'}
                onClick={() => toggleDropdown('accesorios')}
                onMouseEnter={() => handleDropdownMouseEnter('accesorios')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="AccesoriosAll">Todos los Accesorios</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParacomputadores">Cables & Cargadores</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaiPad">Almacenamiento</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaiPhone">Estuches Celulares</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaWatch">Estuches Computadores</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaAirpods">Estuches Tablets</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaTVyHogar">Protectores de pantalla</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaTVyHogar">Ofertas</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Impresoras"
                id="applewatch-dropdown"
                className="no-caret"
                show={activeDropdown === 'applewatch'}
                onClick={() => toggleDropdown('applewatch')}
                onMouseEnter={() => handleDropdownMouseEnter('applewatch')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="">Todas las Impresoras</NavDropdown.Item>
                <NavDropdown.Item href="">Impresora Laser</NavDropdown.Item>
                <NavDropdown.Item href="">Impresora Tinta Continua</NavDropdown.Item>
                <NavDropdown.Item href="">Impresora POS</NavDropdown.Item>
                <NavDropdown.Item href="">Usados</NavDropdown.Item>
                <NavDropdown.Item href="">Ofertas</NavDropdown.Item>

              </NavDropdown>
              <NavDropdown
                title="Crédito"
                id="credito-dropdown"
                className="no-caret"
                show={activeDropdown === 'credito'}
                onClick={() => toggleDropdown('credito')}
                onMouseEnter={() => handleDropdownMouseEnter('credito')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="#">Sistecredito</NavDropdown.Item>
              </NavDropdown>           
              <NavDropdown
                title="Contáctanos"
                id="contactanos-dropdown"
                className="no-caret"
                show={activeDropdown === 'contactanos'}
                onClick={() => toggleDropdown('contactanos')}
                onMouseEnter={() => handleDropdownMouseEnter('contactanos')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item
                  href="https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20computadores!%20Me%20interesa%20comprar%201%20Parlante%20Aura%20studio%203%20(15W%20RMS-%20100W%20RMS,%20Negro).%20%C2%BFPodr%C3%ADas%20darme%20inforcomputadoresi%C3%B3n%20adicional%3F%20Gracias!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whatsapp
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tiendapc.com.co&su=Consulta%20de%20producto&body=%C2%A1Hola%20Tienda%20computadores!%20Me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20inforcomputadoresi%C3%B3n%20sobre%20:"
                >
                  Correo electrónico
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#" onClick={handleSupportClick}>Soporte</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;