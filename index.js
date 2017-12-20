const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UserService = require('./userService');
const userService = new UserService(); 


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	socket.on('join', (name) => {
		userService.addUser({
			id: socket.id,
			name
		});
		io.emit('update', {
			users: userService.getAllUsers() 
		});
	});
	socket.on('disconnect', () => {
		userService.removeUser(socket.id);
		socket.broadcast.emit('update', {
			users: userService.getAllUsers()
		});
	});
	socket.on('message', (message) => {
		const {name} = userService.getAllUsers(socket.id);
		socket.broadcast.emit('message', {
			text: message.text,
			from: name
		});
	});
});

server.listen(3000, () => console.log('listening on *: 3000');
});