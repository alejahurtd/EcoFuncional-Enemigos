import { router, socket } from '../routes.js';

export default function renderBillingScreen() {
	const app = document.getElementById('app');

	// Renderizar la pantalla con los campos de facturación y botones
	app.innerHTML = `
    <div class="billing-container">
      <h1>Tu bebida será facturada con los siguientes datos</h1>
      <p>Por favor llena la siguiente información.</p>

      <!-- Formulario de facturación -->
      <form id="billingForm" class="billing-form">
        <input type="text" id="name" placeholder="Escribe tu nombre" required />
        <input type="text" id="lastName" placeholder="Escribe tu apellido" required />
        <input type="text" id="idNumber" placeholder="Escribe tu cédula" required />
        <input type="email" id="email" placeholder="Escribe tu correo electrónico" required />
      </form>

      <!-- Botones de acción -->
      <div class="buttons-container">
        <button id="confirmButton" class="action-button">Confirmar pedido</button>
        <button id="cancelButton" class="cancel-button">Cancelar</button>
      </div>
    </div>
  `;

	// Lógica del botón "Confirmar pedido"
	document.getElementById('confirmButton').addEventListener('click', (e) => {
		e.preventDefault();

		// Obtener los valores ingresados por el usuario
		const name = document.getElementById('name').value;
		const lastName = document.getElementById('lastName').value;
		const idNumber = document.getElementById('idNumber').value;
		const email = document.getElementById('email').value;

		// Validar que todos los campos estén completos
		if (!name || !lastName || !idNumber || !email) {
			alert('Por favor completa todos los campos.');
			return;
		}

		// Datos del pedido (mockeado aquí, pero esto debe venir desde 3recomendationScreen.js)
		const orderDetails = {
			id: Date.now(), // Generar un ID único para la orden
			productName: 'Nevado Brownie',
			size: 'Mediana',
			time: new Date().toLocaleTimeString(),
			details: 'Cremosa bebida fría con brownie y chantilly',
		};

		// Emitir evento al servidor con los datos de facturación y del pedido
		socket.emit('submit-order', {
			name,
			lastName,
			idNumber,
			email,
			orderDetails,
		});

		// Redirigir a la pantalla de progreso
		router.navigateTo('/5progresscreen');
	});

	// Lógica del botón "Cancelar"
	document.getElementById('cancelButton').addEventListener('click', () => {
		router.navigateTo('/3recomendationScreen'); // Regresa a la pantalla de recomendación
	});
}
