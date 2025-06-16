import client from './client.js'
import sensorService from '../services/sensor.service.js'

// Define topics of interest
const topicHandlers = {
    'home/1st_floor/aircon/+': async (topic, message) => {    // key: topic, value: function to run
        try {
            const payload = JSON.parse(message.toString());
            await sensorService.processSensorData(topic, payload);
        }
        catch (err) {
            console.error('[MQTT Handler] Error processing message on topic ' + topic + ":", err.message);
        }
    },
    // Add other topics here
}

// Wildcard topic matching
function matchTopic(actual, pattern) {
    const regex = new RegExp('^' + pattern
        .replace(/\+/g, '[^/]+')
        .replace(/#/g, '.+') + '$');
    return regex.test(actual);
}

function registerHandlers() {
    for (let topic of Object.keys(topicHandlers)) {

        // Subscribe to all topics of interest using key
        client.subscribe(topic, { qos: 1 }, (err) => {  
            if (err) {
                console.error('[MQTT Handler] Failed to subscribe to topic ' + topic + ":", err.message);
            }
            else {
                console.log('Subscribed to topic ' + topic);
            }
        })
    }

    client.on('message', (topic, message) => {
        console.log('Client receives a message from topic:', topic, message.toString());

        // Match processing function to each topic of interest using value 
        for (let pattern of Object.keys(topicHandlers)) {
            if (matchTopic(topic, pattern)) {
                return topicHandlers[pattern](topic, message);
            }
        }

        console.warn('[MQTT Handler]: No handler registered for topic ' + topic);
    })
}

export default {
    registerHandlers
}

