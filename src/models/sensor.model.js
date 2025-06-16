import { poolPromise } from "../config/db.js";
import sql from 'mssql'

async function insertSensorData(topic, payload) {
    try {
        const pool = await poolPromise;

        // Process payload for correct 
        const { deviceUid, sensorUid, value, timestamp, quality } = payload;

        if (!deviceUid || !sensorUid) {
            console.warn('Invalid payload:', payload);
            return;
        }

        console.log('   deviceUid:', deviceUid);
        console.log('   sensorUid:', sensorUid);
        console.log('   value:', value);
        console.log('   timestamp:', timestamp);
        console.log('   quality:', quality);

        // Data integrity check (both sensorUid and deviceId existing and relatively connected)
        const validateResult = await pool.request()
            .input('deviceUid', deviceUid)
            .input('sensorUid', sensorUid)
            .query(`
                SELECT s.sensorId 
                FROM [dbo].[Sensor] s
                JOIN [dbo].[Device] d ON s.deviceId = d.deviceId 
                WHERE s.sensorUid = @sensorUid 
                AND d.deviceUid = @deviceUid
            `);
            // .query(`SELECT Sensor.sensorId 
            //         FROM Sensor JOIN Device ON Sensor.deviceId = Device.deviceId WHERE Sensor.sensorUid = @sensorUid AND Device.deviceUid = @deviceUid`);

        if (!validateResult.recordset || validateResult.recordset.length === 0) {
            throw new Error('Sensor not found or not associated with any device:', sensorUid);
        }

        // Insert validated data
        const sensorId = validateResult.recordset[0].sensorId;

        // const now = new Date();
        // const gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000)); // Add 7 hours
        // const currentServiceTime = gmt7Time.toISOString().slice(0, 23).replace('T', ' ');
        const currentServiceTime = new Date(Date.now() + 7 * 60 * 60 * 1000);

        const safeTimestamp = timestamp || currentServiceTime;  // Accept microservice's time if no timestamp from payload

        const insertResult = await pool.request()
            .input('sensorId', sql.Int, sensorId)
            .input('value', sql.Float, value)
            .input('timestamp', sql.DateTime2(3), safeTimestamp)
            .input('quality', sql.TinyInt, quality)
            .query(`
                INSERT INTO SensorData(sensorId, value, timestamp, quality) 
                VALUES(@sensorId, @value, @timestamp, @quality)
            `);

        console.log('Sensor data inserted successfully!');
    }
    catch (err) {
        console.error('Error inserting sensor data:', err.message);
    }

}

async function getSensorData() {
    
}

export default {
    insertSensorData,
    getSensorData
}