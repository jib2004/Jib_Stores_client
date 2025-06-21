import io from 'socket.io-client'

//Creating an instance to connect it with the backend
export const socket = io('http://localhost:5000')