import client from './mqttClient/client.js'
import handler from './mqttClient/handler.js'

// MQTT 
client.on('connect', () => {
    console.log('[MQTT] Connected to broker');
    handler.registerHandlers(); // Auto-register all topics of interest after connect
});

client.on('reconnect', () => {
    console.log('[MQTT] Reconnecting...');
});

client.on('error', (err) => {
    console.error('[MQTT] Connection error:', err.message);
});

client.on('close', () => {
    console.log('[MQTT] Connection closed');
});

client.on('disconnect', () => {
    console.log('[MQTT] Disconnected from server');
});

