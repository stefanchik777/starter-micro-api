// Подключение к серверу
var socket = io('http://127.0.0.1:3000');

// Получение доступа к элементам на странице
var ball = document.getElementById('ball');
var score = document.getElementById('score');
var chat = document.getElementById('chat');
var chatInput = document.getElementById('chatInput');
var messages = document.getElementById('messages');

// Функция для обновления позиции мяча
function updateBallPosition(data) {
    ball.style.left = data.x + 'px';
    ball.style.top = data.y + 'px';
}

// Функция для обновления счета
function updateScore(data) {
    score.textContent = `Red: ${data.red} - ${data.blue} :Blue`;
}

// Функция для добавления сообщения в чат
function addChatMessage(message) {
    var newMessage = document.createElement('div');
    newMessage.textContent = message;
    messages.appendChild(newMessage);
    chat.scrollTop = chat.scrollHeight;
}

// Обработчик события движения мяча
socket.on('ballPosition', updateBallPosition);

// Обработчик события обновления счета
socket.on('scoreUpdate', updateScore);

// Обработчик события добавления сообщения в чат
socket.on('chatMessage', addChatMessage);

// Отправка сообщения в чат при нажатии Enter в поле ввода
chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        socket.emit('chatMessage', chatInput.value);
        chatInput.value = '';
    }
});

// Пример отправки информации о движении мяча
// Это должна быть логика, которая определяет, как пользователь управляет мячом
// Например, можно использовать события мыши или клавиатуры
// socket.emit('moveBall', { x: 100, y: 200, team: 'red' });