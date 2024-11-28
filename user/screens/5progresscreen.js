import { router, socket } from '../routes.js';

export default function renderProgressScreen() {
	const app = document.getElementById('app');

	// Renderizar la pantalla inicial
	app.innerHTML = `
    <div class="progress-container">
      <h1>¡Tu pedido ha sido confirmado!</h1>
      <p>Número de confirmación: <span id="order-id"></span></p>
      <img src="path_to_image/nevado-brownie.png" alt="Nevado Brownie" class="product-image">
      <p>Estado de tu bebida:</p>
      <button id="order-status" class="status-button">Orden recibida</button>
    </div>
  `;

	// Escuchar el estado del pedido en tiempo real
	socket.on('order-status-update', ({ orderId, status }) => {
		const statusButton = document.getElementById('order-status');
		if (statusButton) {
			statusButton.textContent = `Estado: ${status}`; // Actualizar con el estado correcto
		}
	});

	// Escuchar cuando el pedido se marca como completado
	socket.on('order-completed', ({ orderId }) => {
		router.navigateTo('/6finalScreen'); // Redirigir a la pantalla final
	});

	// Configurar el número de pedido desde el servidor
	socket.emit('get-order-status', (response) => {
		const orderIdElement = document.getElementById('order-id');
		if (response && response.orderId && orderIdElement) {
			orderIdElement.textContent = response.orderId;
		}
	});
}
