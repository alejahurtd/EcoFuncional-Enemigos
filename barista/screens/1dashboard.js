import { router, socket } from '../routes.js';

export default function renderDashboardScreen() {
	const app = document.getElementById('app');

	app.innerHTML = `
 <div class="dashboard-container">
      <header class="header">
        <img src="/assests/logo barista.png" alt="Juan Valdez Café" class="logo" />
      </header>
      <div class="banner">
        <img src="/assets/banner barista.png" alt="Entre Amigos Banner" class="banner-image" />
      </div>
      <h1 class="dashboard-title">Entre Amigos Juan Valdez</h1>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Tamaño</th>
            <th>Hora</th>
            <th>Detalles</th>
            <th>Producto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody id="orders-body"></tbody>
      </table>
    </div>
  `;

	// Almacenar IDs de órdenes ya procesadas
	const processedOrders = new Set();

	// Escuchar las órdenes nuevas
	socket.on('new-order', (order) => {
		// Verificar si la orden ya fue procesada
		if (processedOrders.has(order.id)) return;

		// Agregar la orden a la tabla
		addOrderToTable(order);

		// Registrar la orden como procesada
		processedOrders.add(order.id);
	});

	function addOrderToTable(order) {
		const ordersBody = document.getElementById('orders-body');
		// Verificar si ya existe una fila para este pedido
		if (document.querySelector(`tr[data-order-id="${order.id}"]`)) {
			return; // Si ya existe, no lo vuelve a agregar
		}
		const row = document.createElement('tr');
		row.setAttribute('data-order-id', order.id);

		row.innerHTML = ` <td>${order.id}</td>
      <td>${order.size}</td>
      <td>${order.time}</td>
      <td>${order.details}</td>
      <td>${order.productName}</td>
      <td>
        <select class="status-selector" data-order-id="${order.id}">
          <option value="Orden recibida" selected>Orden recibida</option>
          <option value="En proceso">En proceso</option>
          <option value="Listo">Listo</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </td>
    `;

		ordersBody.appendChild(row);

		const selector = row.querySelector('.status-selector');
		selector.addEventListener('change', (e) => {
			const newStatus = e.target.value;
			const orderId = e.target.getAttribute('data-order-id');
			socket.emit('update-order-status', { orderId, newStatus });
			if (newStatus === 'Finalizado') {
				row.remove();
				processedOrders.delete(orderId);
			}
		});
	}
}
