const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getAdvice = require('./decisionTree');
const axios = require('axios');

const app = express();
const PORT = 5555;

app.use(cors());
app.use(bodyParser.json());

let latestMoisture = null; // Will store moisture received from ESP32

// 1. ESP32 sends soil moisture here
app.post('/update-moisture', (req, res) => {
    let { moisture } = req.body;

    moisture = (1-(moisture/4095))*100;

    console.log("yes");

    console.log(moisture);

    if (moisture === undefined) {
        return res.status(400).json({ message: 'Moisture value missing' });
    }

    latestMoisture = moisture;
    console.log('Updated Moisture:', latestMoisture);
    res.json({ message: 'Moisture updated successfully' });
});

// 2. Frontend sends crop and pH, backend fetches weather + stored moisture
app.post('/get-advice', async (req, res) => {
    try {
        const { crop, pH } = req.body;

        if (!crop || pH === undefined) {
            return res.status(400).json(['Missing crop or pH']);
        }

        if (latestMoisture === null) {
            return res.status(503).json(['Soil moisture data not yet received']);
        }

        const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: 23.387224,
                longitude: 85.392290,
                current: 'temperature_2m,relative_humidity_2m,uv_index',
            },
        });

        const temp = weatherResponse.data.current.temperature_2m;
        const humidity = weatherResponse.data.current.relative_humidity_2m;
        const uv = weatherResponse.data.current.uv_index;

        const advice = getAdvice(crop, latestMoisture, pH, temp, humidity, uv);

        console.log(advice);

        res.json(advice);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json(['Failed to get advice. Please try again later.']);
    }
});

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});