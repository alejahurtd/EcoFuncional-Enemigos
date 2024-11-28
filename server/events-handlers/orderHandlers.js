const orders = require('../db/entities/orders'); // Simulación de base de datos
const { logEvent } = require('../utils/helpers'); // Para logs de eventos

// Función para manejar el evento `save-answer`
const saveAnswerHandler = (socket, db, io) => {
	return async (data) => {
		try {
			// Guardar la respuesta en la base de datos
			await orders.saveAnswer(data.questionId, data.answer);
			socket.emit('answer-saved', { success: true }); // Confirmación
			logEvent('Answer saved', data);
		} catch (error) {
			socket.emit('answer-saved', { success: false, error: error.message });
			logEvent('Error saving answer', error);
		}
	};
};

// Función para manejar el evento `submit-order`
const submitOrderHandler = (socket, io) => {
	return async (data) => {
		try {
			await orders.saveOrder(data); // Guardar los datos del pedido
			io.emit('new-order', data.orderDetails); // Enviar al barista
			socket.emit('order-confirmed', { success: true }); // Confirmación al usuario
			logEvent('Order submitted', data);
		} catch (error) {
			socket.emit('order-confirmed', { success: false, error: error.message });
			logEvent('Error submitting order', error);
		}
	};
};

// Función para manejar el evento `update-order-status`
const updateOrderStatusHandler = (socket, io) => {
	return ({ orderId, newStatus }) => {
		try {
			if (!orderId) throw new Error('orderId is undefined'); // Validación

			// Logica de actualización simulada
			console.log(`Orden ${orderId} actualizada a: ${newStatus}`);

			// Emitir cambio de estado al usuario
			io.emit('order-status-update', { orderId, status: newStatus });

			// Si el estado es "Finalizado", emitir evento para cerrar pedido
			if (newStatus === 'Finalizado') {
				io.emit('order-completed', { orderId });
			}
		} catch (error) {
			console.error('Error actualizando el estado:', error);
		}
	};
};

// Función para manejar el evento `complete-order`
const completeOrderHandler = (socket, io) => {
	return (orderId) => {
		try {
			io.emit('order-completed', { orderId }); // Notificar al usuario
			console.log(`Pedido ${orderId} marcado como completado`);
		} catch (error) {
			console.error('Error completando pedido:', error);
		}
	};
};

module.exports = {
	saveAnswerHandler,
	submitOrderHandler,
	updateOrderStatusHandler,
	completeOrderHandler,
};
