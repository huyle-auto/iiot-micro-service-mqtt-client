import mqtt from 'mqtt'
import dotenv from 'dotenv'
dotenv.config();

// Check for missing environment variables
const requiredEnv = ['MQTT_SERVER_BASE_URL', 'MQTT_PORT', 'WSS_PORT', 'MQTT_USERNAME', 'MQTT_PASSWORD'];
for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

// TLS-secured connection options
const options = {
    host: process.env.MQTT_SERVER_BASE_URL,
    port: parseInt(process.env.MQTT_PORT, 10),
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: 'mqtt_client_microservice',
    reconnectionPeriod: 1000,
    connectionTimeout: 10_000,
    clean: false,
}

const client = mqtt.connect(options);

export default client