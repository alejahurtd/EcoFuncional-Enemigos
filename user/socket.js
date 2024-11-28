const socket = io('http://localhost:4000', {
	path: '/real-time',
});

socket.on('connect', () => {
	console.log('Conectado al servidor Socket.IO:', socket.id);
});

export default socket;
