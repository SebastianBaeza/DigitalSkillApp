import { useState, useEffect } from 'react';
import './App.css';
import celularImage from './celular.jpg';
import audifonosImage from './audifonos.jpg';
import mouseImage from './MouseGamer.jpg';
import anuncioImage from './boton_descargar.jpg';

export default function Compra () {
  const [cart, setCart] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showFakePageForm, setShowFakePageForm] = useState(false);
  const [showPorcentajeAciertos, setShowPorcentajeAciertos] = useState(false); 
  const [showWelcomePage, setShowWelcomePage]= useState(true);
  const [publicidadFakeArriba, setPublicidadFakeArriba] = useState(Math.random() >= 0.5);
  const [publicidadFakeAbajo, setPublicidadFakeAbajo] = useState(Math.random() >= 0.5);
  const [celularGratis, setCelularGratis] = useState(Math.random() >= 0.5);
  const [audifonosGratis, setAudifonosGratis] = useState(Math.random() >= 0.5);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [sospechaAnunciosSospechosos, setSospechaAnunciosSospechosos] = useState(false);
  const [sospechaPreciosSospechosos, setSospechaPreciosSospechosos] = useState(false);

  const [porcentajeAciertos, setPorcentajeAciertos] = useState(0);

  useEffect(() => {
    const warningButton = document.createElement('button');
    warningButton.textContent = '¡Es una pagina falsa!';
    warningButton.classList.add('fake-warning-fixed');
    warningButton.onclick = () => {
      setShowFakePageForm(true); 
    };
    document.body.appendChild(warningButton);
    return () => {
      document.body.removeChild(warningButton);
    };
  }, []);

  const addToCart = (productName, price) => {
    setCart([...cart, { productName, price }]);
  };

  const renderCart = () => {
    const cartItems = cart.map((item, index) => (
      <div key={index} className="cart-item">
        <p>{item.productName}</p>
        <p>${item.price}</p>
      </div>
    ));
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return (
      <div>
        <div id="cart-items">{cartItems}</div>
        <div id="cart-total">
          <h3>Total: ${total}</h3>
        </div>
        {cart.length > 0 && (
          <button id="buy-button" onClick={() => setShowCreditCardModal(true)}>
            Comprar
          </button>
        )}
      </div>
    );
  };

  const processPayment = () => {
    alert('Pago procesado exitosamente. Gracias por su compra.');
    setCart([]);
    setShowCreditCardModal(false);
    setShowFakePageForm(true); 
  };

  const submitForm = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    alert('Gracias por tu mensaje, ${name}. Nos pondremos en contacto contigo en ${email} lo antes posible.');
    event.target.reset();
  };

  const handleLogin = () => {
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
      alert('Inicio de sesión exitoso.');
      setShowLoginModal(false);
    } else {
      alert('Nombre de usuario o contraseña incorrectos.');
    }
  };

  const handleRegister = () => {
    if (username && password) {
      localStorage.setItem(username, password);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      setShowRegisterModal(false);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const endEvaluation = () => {
    setShowFakePageForm(false);
    setPorcentajeAciertos(0);
    setCart([]);

    const anunciosSospechosos = publicidadFakeArriba || publicidadFakeAbajo;
    const preciosSospechosos = celularGratis || audifonosGratis;

    const totalPreguntas = 2;
    let aciertos = 0;

    if (sospechaAnunciosSospechosos  === anunciosSospechosos) {
      aciertos++;
    }
    if (sospechaPreciosSospechosos === preciosSospechosos) {
      aciertos++;
    }

    const porcentaje = (aciertos / totalPreguntas) * 100;
    setPorcentajeAciertos(porcentaje);
    setShowPorcentajeAciertos(true);
    

  };

  return (
    <>
      {showWelcomePage && (
        <div
          id="welcome-page"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            zIndex: 10000,
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <h1>Evaluación de Página Web</h1>
          <p>Instrucciones: Debe comprar al menos un producto de cada categoría.</p>
          <button onClick={() => setShowWelcomePage(false)}>Comenzar</button>
        </div>
      )}
      <header>
        <h1>Página de Compras</h1>
        {publicidadFakeArriba && (
          <div className="advertisement">
            <img src={anuncioImage} alt="Publicidad de Encabezado" />
          </div>
        )}
      </header>
      <nav>
        <a href="#products">Productos</a>
        <a href="#cart">Carrito</a>
        <a href="#contact">Contacto</a>
        <a href="#" onClick={() => setShowLoginModal(true)}>Iniciar Sesión</a>
        <a href="#" onClick={() => setShowRegisterModal(true)}>Registrarse</a>
      </nav>
      <div className="container">
        <section id="products" className="products">
          <div className="product">
            <div className="advertisement_2">
              <img src={celularImage} alt="Producto 1" />
            </div>
            <h3>Celular Samsung</h3>
            <p>Celular Samsung con pantalla AMOLED, cámaras de alta resolución, potente procesador, amplia memoria, batería duradera, y funciones avanzadas de conectividad y seguridad.</p>
            <p id="celular-price">Precio: {celularGratis ? '$0' : '$305.000'}</p>
            <button onClick={() => addToCart('Celular Samsung', celularGratis ? 0 : 305000)}>Añadir al Carrito</button>
          </div>
          <div className="product">
            <div className="advertisement_2">
              <img src={audifonosImage} alt="Producto 2" />
            </div>
            <h3>Audífonos Samsung</h3>
            <p>Chocolate Sahne Nuss de Milka, elaborado con delicioso chocolate con leche alpina y relleno de avellanas enteras, ofrece una experiencia cremosa y crujiente en cada bocado.</p>
            <p id="audifonos-price">Precio: {audifonosGratis ? '$0' : '$30.000'}</p>
            <button onClick={() => addToCart('Audífonos Samsung', audifonosGratis ? 0 : 30000)}>Añadir al Carrito</button>
          </div>
          <div className="product">
            <div className="advertisement_2">
              <img src={mouseImage} alt="Producto 3" />
            </div>
            <h3>Mouse Gamer</h3>
            <p>Mouse gamer ultra preciso con iluminación RGB, sensor de 16,000 DPI, botones programables y diseño ergonómico para dominación total en cada partida.</p>
            <p>Precio: $6.000</p>
            <button onClick={() => addToCart('Mouse Gamer', 6000)}>Añadir al Carrito</button>
          </div>
        </section>
        <section id="cart" className="cart">
          <h2>Carrito de Compras</h2>
          {renderCart()}
        </section>
        <section id="contact" className="contact-form">
          <h2>Contacto</h2>
          <form onSubmit={submitForm}>
            <input type="text" name="name" placeholder="Nombre" required />
            <input type="email" name="email" placeholder="Correo electrónico" required />
            <textarea name="message" placeholder="Mensaje" required></textarea>
            <button type="submit">Enviar</button>
          </form>
        </section>
        {publicidadFakeAbajo && (
          <div className="advertisement">
            <img src={anuncioImage} alt="Publicidad de Pie de Página" />
          </div>
        )}
      </div>
      <footer>
        <p>&copy; 2024 Página de Compras. Todos los derechos reservados.</p>
      </footer>

      {showLoginModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowLoginModal(false)}>&times;</span>
            <h2>Iniciar Sesión</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button onClick={handleLogin}>Iniciar Sesión</button>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowRegisterModal(false)}>&times;</span>
            <h2>Registrarse</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button onClick={handleRegister}>Registrarse</button>
          </div>
        </div>
      )}

      {showCreditCardModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreditCardModal(false)}>&times;</span>
            <h2>Información de Pago</h2>
            <p>Ingresa la información de tu tarjeta de crédito para completar la compra.</p>
            <input type="text" placeholder="Número de tarjeta" required />
            <input type="text" placeholder="Nombre en la tarjeta" required />
            <input type="text" placeholder="Fecha de expiración (MM/AA)" required />
            <input type="text" placeholder="Código de seguridad" required />
            <button onClick={processPayment}>Pagar</button>
          </div>
        </div>
      )}
      

      {showFakePageForm && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowFakePageForm(false)}>&times;</span>
            <h2>Evaluación de Página Falsa</h2>
            <form onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="phishing">
                <input
                  type="checkbox"
                  id="phishing"
                  name="suspicion"
                  checked={sospechaAnunciosSospechosos}
                  onChange={() => setSospechaAnunciosSospechosos(!sospechaAnunciosSospechosos)}
                />
                Anuncios sospechosos
              </label><br />
              <label htmlFor="fakeProducts">
                <input
                  type="checkbox"
                  id="fakeProducts"
                  name="suspicion"
                  checked={sospechaPreciosSospechosos}
                  onChange={() => setSospechaPreciosSospechosos(!sospechaPreciosSospechosos)}
                />
                Precios sospechosos
              </label><br />
              <button onClick={endEvaluation}>Enviar Evaluación</button>
            </form>
          </div>
        </div>
      )}

    {showPorcentajeAciertos && (
    <div className="modal" style={{ display: 'block' }}>
        <div className="modal-content">
        <span className="close" onClick={() => setShowPorcentajeAciertos(false)}>&times;</span>
        <h3>Porcentaje de aciertos: {porcentajeAciertos}%</h3>
        <button onClick={() => setShowPorcentajeAciertos(false)}>Cerrar</button>
        </div>
    </div>
    )}
    </>
  );
}