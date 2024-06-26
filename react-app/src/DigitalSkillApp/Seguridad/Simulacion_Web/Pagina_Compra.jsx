import React, { useState, useEffect } from 'react';
import './ShoppingPage.css';

const ShoppingPage = () => {
  const [cart, setCart] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showFakePageModal, setShowFakePageModal] = useState(false);
  const [publicidadFakeArriba, setPublicidadFakeArriba] = useState(Math.random() >= 0.5);
  const [publicidadFakeAbajo, setPublicidadFakeAbajo] = useState(Math.random() >= 0.5);
  const [celularGratis, setCelularGratis] = useState(Math.random() >= 0.5);
  const [audifonosGratis, setAudifonosGratis] = useState(Math.random() >= 0.5);
  const [sidebarReminderVisible, setSidebarReminderVisible] = useState(false);
  const [formResult, setFormResult] = useState('');

  const addToCart = (productName, price) => {
    setCart([...cart, { productName, price }]);
  };

  const renderCart = () => {
    const cartItemsContainer = cart.map((item, index) => (
      <div key={index} className="cart-item">
        <p>{item.productName}</p>
        <p>${item.price}</p>
      </div>
    ));

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return (
      <>
        <div className="cart-items">{cartItemsContainer}</div>
        <div className="cart-total">
          <h3>Total: ${total}</h3>
        </div>
        {cart.length > 0 && <button id="buy-button" onClick={() => setShowCreditCardModal(true)}>Comprar</button>}
      </>
    );
  };

  const processPayment = () => {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCVC = document.getElementById('card-cvc').value;

    if (validateCard(cardNumber, cardExpiry, cardCVC)) {
      alert('Pago procesado exitosamente. Gracias por su compra.');
      setShowCreditCardModal(false);
      setCart([]);
      setShowFakePageModal(true);
    } else {
      alert('Datos de tarjeta inválidos. Por favor, revise e intente nuevamente.');
    }
  };

  const validateCard = (number, expiry, cvc) => {
    const cardNumberRegex = /^\d{16}$/;
    const cardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cardCVCRegex = /^\d{3,4}$/;
    return cardNumberRegex.test(number) && cardExpiryRegex.test(expiry) && cardCVCRegex.test(cvc);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    setFormResult(`Gracias por tu mensaje, ${name}. Nos pondremos en contacto contigo en ${email} lo antes posible.`);
    event.target.reset();
  };

  const endEvaluation = () => {
    const checkboxes = document.querySelectorAll('.fake-page-form input[type="checkbox"]:checked');
    const selectedSuspicious = Array.from(checkboxes).map(checkbox => checkbox.value);

    const isPublicidadFakeCorrecta = ((publicidadFakeArriba || publicidadFakeAbajo) && selectedSuspicious.includes('Anuncio sospechoso')) || (!(publicidadFakeArriba || publicidadFakeAbajo) && !selectedSuspicious.includes('Anuncio sospechoso'));
    const isObjetoGratisCorrecto = ((celularGratis || audifonosGratis) && selectedSuspicious.includes('Precios inusualmente bajos')) || (!(celularGratis || audifonosGratis) && !selectedSuspicious.includes('Precios inusualmente bajos'));

    let aciertos = 0;
    if (isPublicidadFakeCorrecta) aciertos++;
    if (isObjetoGratisCorrecto) aciertos++;

    const totalPreguntas = 2;
    const puntaje = (aciertos / totalPreguntas) * 100;

    alert(`Gracias por reportar. Tus sospechas: ${selectedSuspicious.join(', ')}. Puntaje de acierto: ${puntaje}%`);
    setShowFakePageModal(false);
    setCart([]);
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      if (publicidadFakeArriba) {
        document.getElementById('header-ad').style.display = 'block';
      } else {
        document.getElementById('header-ad').style.display = 'none';
      }
      if (publicidadFakeAbajo) {
        document.getElementById('footer-ad').style.display = 'block';
      } else {
        document.getElementById('footer-ad').style.display = 'none';
      }

      const celularPriceElement = document.querySelector('#celular-price');
      if (celularGratis) {
        celularPriceElement.textContent = 'Precio: $0';
      } else {
        celularPriceElement.textContent = 'Precio: $305.000';
      }

      const audifonosPriceElement = document.querySelector('#audifonos-price');
      if (audifonosGratis) {
        audifonosPriceElement.textContent = 'Precio: $0';
      } else {
        audifonosPriceElement.textContent = 'Precio: $30.000';
      }
    });
  }, [publicidadFakeArriba, publicidadFakeAbajo, celularGratis, audifonosGratis]);

  return (
    <div>
      <div id="welcome-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', zIndex: 10000, flexDirection: 'column', textAlign: 'center' }}>
        <h1>Evaluación de Página Web</h1>
        <p>Instrucciones: Debe comprar al menos un producto de cada categoría.</p>
        <button onClick={() => { document.getElementById('welcome-page').style.display = 'none'; setSidebarReminderVisible(true); }}>Comenzar</button>
      </div>
      <header>
        <h1>Página de Compras</h1>
        <div className="advertisement" id="header-ad">
          <img src="boton_descargar.jpg" alt="Publicidad de Encabezado" />
        </div>
      </header>
      <nav>
        <a href="#products">Productos</a>
        <a href="#cart">Carrito</a>
        <a href="#contact">Contacto</a>
        <a href="#" onClick={() => setShowLoginModal(true)}>Iniciar Sesión</a>
        <a href="#" onClick={() => setShowRegisterModal(true)}>Registrarse</a>
      </nav>
      {showLoginModal && (
        <div id="login-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLoginModal(false)}>&times;</span>
            <h2>Iniciar Sesión</h2>
            <input type="text" id="login-username" placeholder="Nombre de usuario" required />
            <input type="password" id="login-password" placeholder="Contraseña" required />
            <button onClick={() => {
              const username = document.getElementById('login-username').value;
              const password = document.getElementById('login-password').value;

              if (username && password) {
                const storedPassword = localStorage.getItem(username);
                if (storedPassword === password) {
                  alert('Inicio de sesión exitoso.');
                  setShowLoginModal(false);
                } else {
                  alert('Nombre de usuario o contraseña incorrectos.');
                }
              } else {
                alert('Por favor, completa todos los campos.');
              }
            }}>Iniciar Sesión</button>
          </div>
        </div>
      )}
      {showRegisterModal && (
        <div id="register-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRegisterModal(false)}>&times;</span>
            <h2>Registrarse</h2>
            <input type="text" id="register-username" placeholder="Nombre de usuario" required />
            <input type="password" id="register-password" placeholder="Contraseña" required />
            <button onClick={() => {
              const username = document.getElementById('register-username').value;
              const password = document.getElementById('register-password').value;

              if (username && password) {
                localStorage.setItem(username, password);
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                setShowRegisterModal(false);
              } else {
                alert('Por favor, completa todos los campos.');
              }
            }}>Registrarse</button>
          </div>
        </div>
      )}
      <main>
        <section id="products">
          <h2>Productos</h2>
          <div className="product" data-product-id="1">
            <img src="celular.jpg" alt="Celular" />
            <p>Celular XYZ</p>
            <p id="celular-price">Precio: $305.000</p>
            <button onClick={() => addToCart('Celular XYZ', celularGratis ? 0 : 305000)}>Agregar al Carrito</button>
          </div>
          <div className="product" data-product-id="2">
            <img src="audifonos.jpg" alt="Audífonos" />
            <p>Audífonos ABC</p>
            <p id="audifonos-price">Precio: $30.000</p>
            <button onClick={() => addToCart('Audífonos ABC', audifonosGratis ? 0 : 30000)}>Agregar al Carrito</button>
          </div>
        </section>
        <section id="cart">
          <h2>Carrito de Compras</h2>
          {renderCart()}
        </section>
        <section id="contact">
          <h2>Contacto</h2>
          <form onSubmit={handleFormSubmit}>
            <input type="text" id="name" placeholder="Nombre" required />
            <input type="email" id="email" placeholder="Email" required />
            <textarea id="message" placeholder="Mensaje" required></textarea>
            <button type="submit">Enviar</button>
          </form>
          <div id="form-result">{formResult}</div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Página de Compras. Todos los derechos reservados.</p>
        <div className="advertisement" id="footer-ad">
          <img src="boton_descargar.jpg" alt="Publicidad de Pie de Página" />
        </div>
      </footer>
      {sidebarReminderVisible && (
        <div id="sidebar-reminder">
          <p>Recuerda evaluar la autenticidad de la página.</p>
          <button onClick={() => setSidebarReminderVisible(false)}>Cerrar</button>
        </div>
      )}
      {showCreditCardModal && (
        <div id="credit-card-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreditCardModal(false)}>&times;</span>
            <h2>Procesar Pago</h2>
            <input type="text" id="card-number" placeholder="Número de Tarjeta" required />
            <input type="text" id="card-expiry" placeholder="MM/AA" required />
            <input type="text" id="card-cvc" placeholder="CVC" required />
            <button onClick={processPayment}>Pagar</button>
          </div>
        </div>
      )}
      {showFakePageModal && (
        <div id="fake-page-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowFakePageModal(false)}>&times;</span>
            <h2>Página de Reporte</h2>
            <p>Selecciona los elementos que consideres sospechosos:</p>
            <form className="fake-page-form">
              <label>
                <input type="checkbox" value="Anuncio sospechoso" />
                Anuncio sospechoso
              </label>
              <label>
                <input type="checkbox" value="Precios inusualmente bajos" />
                Precios inusualmente bajos
              </label>
              <label>
                <input type="checkbox" value="URL extraña" />
                URL extraña
              </label>
              <label>
                <input type="checkbox" value="Solicitudes de información sensible" />
                Solicitudes de información sensible
              </label>
            </form>
            <button onClick={endEvaluation}>Finalizar Evaluación</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingPage;
