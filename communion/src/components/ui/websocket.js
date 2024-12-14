// websocket.ts
const socketUrl = 'ws://your-websocket-server-url'; // Replace with actual WebSocket server URL
export const createWebSocket = (group, religion, userName) => {
    const socketUrl = 'ws://your-websocket-server-url';
    const socket = new WebSocket(`${socketUrl}?group=${group}&religion=${religion}&user=${userName}`);
    socket.onopen = () => {
        console.log('Connected to WebSocket');
    };
    socket.onclose = () => {
        console.log('WebSocket closed');
    };
    socket.onerror = (error) => {
        console.error('WebSocket error', error);
    };
    return socket;
};
