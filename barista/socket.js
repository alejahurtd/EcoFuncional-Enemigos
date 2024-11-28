// Asume que ya incluiste el CDN en tu HTML
const socket = io('http://localhost:4000', {
	path: '/real-time', // Asegúrate de que coincide con el servidor
});

socket.on('connect', () => {
	console.log('Conectado al servidor Socket.IO:', socket.id);
});

export default socket;
