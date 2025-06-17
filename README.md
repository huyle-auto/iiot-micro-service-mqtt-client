# iiot-micro-service-mqtt-client
This microservice is used for bridging MQTT data and database

HiveMQ cloud broker (free tier) url: a4113604269241a0911eb0852ec151fa.s1.eu.hivemq.cloud:8883

Protocol used: MQTT over TLS

MQTT messages are filtered by deviceUid and sensorUid

Connection to SQL Server database via Microsoft Entra Id  (account owner specific)

See full [project architecture](https://github.com/you/iot-web-dashboard#architecture)

