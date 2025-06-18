# iiot-micro-service-mqtt-client

A part of a self-learning project, along with [Vue Web App](<vue_web_app_link>) and [API Server](<api_server_link>).  
See full architecture: [Project Overview](https://github.com/huyle-auto/iiot-micro-service-mqtt-client/blob/7a92edc33feab2fa177edbdcb55190a52904683b/architecture.jpg)

## Use Case

This microservice acts as a **bridge** between the **HiveMQ Cloud MQTT broker** and a **SQL Server database** hosted on Azure. It:

- Subscribes to MQTT topics from IoT devices
- Filters incoming messages using `Uid` in each payload
- Inserts or processes data in SQL Server using relational mapping logic
- Authenticates to the broker via username/password
- Uses **Microsoft Entra ID** for secure access to the Azure SQL Server

> **Current no publishing functionalities implemented.**

## ⚙️ Tech Stack

- **Node.js**
- **MQTT.js** — for broker connection and topic subscription
- **mssql** — for SQL Server database access

## 🔧 Configuration

Create a `.env` file to store the following values:

```env
MQTT_BROKER_URL=your_broker_url
MQTT_PORT=8883
MQTT_USERNAME=your_hivemq_username
MQTT_PASSWORD=your_hivemq_password
MQTT_TOPICS=sensors/+,robots/+/status

SQL_SERVER=your_sql_server
SQL_DATABASE=your_database_name
SQL_USERNAME-your_database_username
SQL_PASSWORD=your_database_password

```

## Run

npm install
node src/index.js

## Author

Developed by huyle-auto

