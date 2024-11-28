import renderHomeScreen from './screens/1homeScreen.js';
import renderQuestionScreen from './screens/2questionScreen.js';
import renderRecomendationScreen from './screens/3recomendationScreen.js';
import renderBillingScreen from './screens/4billingScreen.js';
import renderProgressScreen from './screens/5progresscreen.js';
import renderFinalScreen from './screens/6finalScreen.js';
import socket from './socket.js';

const router = new Router({
	mode: 'hash',
	page404: (path) => {
		const app = document.getElementById('app');
		app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
	},
});

function clearScripts() {
	document.getElementById('app').innerHTML = '';
}

// Configuración de rutas
router.add('/', async () => {
	clearScripts();
	renderHomeScreen();
});

router.add('/2questionScreen', async () => {
	clearScripts();
	renderQuestionScreen();
});

router.add('/3recomendationScreen', async () => {
	clearScripts();
	renderRecomendationScreen();
});

router.add('/4billingScreen', async () => {
	clearScripts();
	renderBillingScreen();
});

router.add('/5progresscreen', async () => {
	clearScripts();
	renderProgressScreen();
});

router.add('/6finalScreen', async () => {
	clearScripts();
	renderFinalScreen();
});

//inciializar router
router.check().addUriListener();

// Listen for popstate event to handle browser navigation
window.addEventListener('popstate', () => {
	router.check();
});

document.addEventListener('DOMContentLoaded', () => {
	router.check();
});

router.check();

export { router, socket };
