// Función para guardar las respuestas de las preguntas
const saveAnswer = async (questionId, answer) => {
	// Simula el guardado de respuestas en la base de datos
	console.log(`Guardando respuesta: Pregunta ${questionId}, Respuesta: ${answer}`);
	// Aquí puedes implementar la lógica real para guardar en una base de datos
};

// Función para guardar los datos del pedido
const saveOrder = async (orderData) => {
	// Simula el guardado de la orden en la base de datos
	console.log('Guardando orden:', orderData);
	// Aquí puedes implementar la lógica real para guardar en una base de datos
	// Asegurarse de que las órdenes no se guarden varias veces
	if (!orderData.orderDetails.id) {
		console.error('Error: orderId es undefined');
		return;
	}
	// Ejemplo: Guardar solo los datos necesarios para el barista
	const baristaData = {
		orderId: orderData.orderDetails.id,
		productName: orderData.orderDetails.productName,
		size: orderData.orderDetails.size,
		time: orderData.orderDetails.time,
		details: orderData.orderDetails.details,
	};

	console.log('Datos para el barista:', baristaData);
};

module.exports = {
	saveAnswer,
	saveOrder,
};
