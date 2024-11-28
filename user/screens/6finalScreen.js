import { router, socket } from '../routes.js';

export default function renderFinalScreen() {
	const app = document.getElementById('app');

	// Renderizar la pantalla final
	app.innerHTML = `
    <div class="final-container">
      <h1>¡Tu pedido fue entregado!</h1>
      <button id="backToHome" class="action-button">Volver a Juan Valdez</button>
      <img src="path_to_image/juan-valdez-food.png" alt="Productos Juan Valdez" class="final-image">
    </div>
  `;

	// Configurar el botón para volver al progreso
	document.getElementById('backToHome').addEventListener('click', () => {
		router.navigateTo('/');
	});
}
