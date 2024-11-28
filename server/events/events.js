const db = require('../db/entities/users');
const {
	saveAnswerHandler,
	submitOrderHandler,
	updateOrderStatusHandler,
	completeOrderHandler,
} = require('../events-handlers/orderHandlers');

const handleEvents = (socket, io) => {
	// Manejar respuestas de preguntas
	socket.on('save-answer', saveAnswerHandler(socket, db, io));

	// Manejar envío de pedidos y facturación
	socket.on('submit-order', submitOrderHandler(socket, io));
	// socket.on('get-order-status', updateOrderStatusHandler(socket, io));
	socket.on('complete-order', completeOrderHandler(socket, io));
	socket.on('update-order-status', updateOrderStatusHandler(socket, io));
};

module.exports = { handleEvents };
