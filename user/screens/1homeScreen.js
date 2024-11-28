import { router, socket } from '../routes.js';

export default function renderHomeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <div class="home-container">
      <h1>Bienvenido a</h1>
      <h2><span class="highlight">Entre Amigos</span> de Juan Valdez</h2>
      <p>¿No sabes qué pedir hoy? Entre amigos nos recomendamos. Responde algunas preguntas para recomendarte la bebida perfecta.</p>
      <button id="startButton">Comenzar</button>
    </div>
  `;

	// Agregar evento al botón para redirigir a la siguiente pantalla
	document.getElementById('startButton').addEventListener('click', () => {
		router.navigateTo('/2questionScreen');
		// emitir evento al servidor para registrar la acción
		socket.emit('navigateToQuestions');
		console.log('Evento navigateToQuestions emitido desde client-user');
	});
}
