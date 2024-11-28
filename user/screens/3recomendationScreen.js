import { router } from '../routes.js';

// Función para renderizar la pantalla de recomendación
export default function renderRecomendationScreen() {
	const app = document.getElementById('app');

	// Inserta el contenido HTML para la pantalla
	app.innerHTML = `
    <div class="recomendation-container">
      <!-- Logo de Juan Valdez -->
      <header>
        <img src="path_to_logo/juan-valdez-logo.png" alt="Juan Valdez Logo" class="logo" />
      </header>

      <!-- Información de la bebida recomendada -->
      <main>
        <h1>¡Tu bebida ideal es <span class="highlight">Nevado Brownie</span> Juan Valdez!</h1>
        <p>Es una cremosa bebida fría a base de café con brownie decorada con Chantilly.</p>
        <p><strong>Tamaño:</strong> Mediana</p>

        <!-- Botones de acción -->
        <div class="buttons-container">
          <button id="continueButton" class="action-button">Continuar para facturar</button>
          <button id="cancelButton" class="cancel-button">Cancelar</button>
        </div>
      </main>
    </div>
  `;

	// Agregar evento al botón "Continuar para facturar"
	document.getElementById('continueButton').addEventListener('click', () => {
		router.navigateTo('/4billingScreen'); // Redirige a la pantalla de facturación
	});

	// Agregar evento al botón "Cancelar"
	document.getElementById('cancelButton').addEventListener('click', () => {
		router.navigateTo('/'); // Redirige a la pantalla de inicio
	});
}
