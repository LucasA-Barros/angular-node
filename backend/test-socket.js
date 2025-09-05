import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling'] });

socket.on('connect', () => console.log('Conectou', socket.id));
socket.on('statusAtualizado', data => console.log(data));
socket.on('connect_error', err => console.error('Erro conexão:', err.message));