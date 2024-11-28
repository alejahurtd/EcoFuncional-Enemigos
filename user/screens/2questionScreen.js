import { router, socket } from '../routes.js';

const questions = [
	{
		id: 1,
		question: '¿Qué tipo de día estás teniendo hoy?',
		options: ['Energético', 'Relajado', 'Necesito motivación'],
	},
	{ id: 2, question: '¿Qué tipo de experiencia buscas?', options: ['Refrescante', 'Reconfortante', 'Energizante'] },
	{
		id: 3,
		question: '¿Cómo te gusta la intensidad del café?',
		options: ['Suave', 'Medio', 'Fuerte', 'No me gusta el café'],
	},
	{
		id: 4,
		question: '¿Qué tipo de leche prefieres?',
		options: ['Entera', 'Descremada', 'Almendra', 'Soya', 'Sin leche'],
	},
	{ id: 5, question: '¿Te gustaría una bebida caliente o fría?', options: ['Caliente', 'Fría (con hielo)', 'Frappé'] },
	{
		id: 6,
		question: '¿Qué nivel de dulzor prefieres en tu bebida?',
		options: ['Sin azúcar', 'Poco dulce', 'Dulce', 'Muy dulce'],
	},
	{
		id: 7,
		question: '¿Te gustaría añadir algún sabor adicional?',
		options: ['Vainilla', 'Caramelo', 'Chocolate', 'No, gracias'],
	},
	{ id: 8, question: '¿Prefieres una bebida con crema o sin crema?', options: ['Con crema batida', 'Sin crema'] },
	{ id: 9, question: '¿Qué tan grande prefieres tu bebida?', options: ['Pequeña', 'Mediana', 'Grande'] },
	{ id: 10, question: '¿Te interesa una opción baja en calorías?', options: ['Sí', 'No'] },
	{
		id: 11,
		question: '¿Tienes alguna restricción alimentaria?',
		options: ['Vegano', 'Sin lactosa', 'Sin gluten', 'Ninguna'],
	},
];

export default function renderQuestionScreen() {
	const app = document.getElementById('app');

	let currentQuestion = 0;
	const answers = [];

	const render = () => {
		const question = questions[currentQuestion];
		app.innerHTML = `
      <div class="question-container">
        <h2>Pregunta ${currentQuestion + 1} de ${questions.length}</h2>
        <p>${question.question}</p>
        <div class="options">
          ${question.options
						.map((option, index) => `<button class="option-btn" data-index="${index}">${option}</button>`)
						.join('')}
        </div>
        <div class="navigation">
          <button id="prevBtn" ${currentQuestion === 0 ? 'disabled' : ''}>Anterior</button>
          <button id="nextBtn" disabled>Siguiente</button>
        </div>
      </div>
    `;

		// Manejo de las opciones seleccionadas
		document.querySelectorAll('.option-btn').forEach((btn) => {
			btn.addEventListener('click', (e) => {
				answers[currentQuestion] = question.options[parseInt(e.target.dataset.index)];
				document.getElementById('nextBtn').disabled = false;
			});
		});

		// Botón "Anterior"
		document.getElementById('prevBtn').addEventListener('click', () => {
			if (currentQuestion > 0) {
				currentQuestion--;
				render();
			}
		});

		// Botón "Siguiente"
		document.getElementById('nextBtn').addEventListener('click', () => {
			socket.emit('save-answer', { questionId: question.id, answer: answers[currentQuestion] });

			if (currentQuestion < questions.length - 1) {
				currentQuestion++;
				render();
			} else {
				console.log('Todas las respuestas enviadas:', answers);
				router.navigateTo('/3recomendationScreen'); // Redirigir a la pantalla de recomendaciones
			}
		});
	};

	render();
}
