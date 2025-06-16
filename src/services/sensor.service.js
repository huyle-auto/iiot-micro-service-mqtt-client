import sensorModel from '../models/sensor.model.js'

async function processSensorData(topic, payload) {
    console.log("Processing sensor data: ...");
    sensorModel.insertSensorData(topic, payload);
}

export default {
    processSensorData
}

