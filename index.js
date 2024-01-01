import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "openuv-11azfzrlqtnrln4-io";
const API_URL = "https://api.openuv.io/api/v1/uv";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs", { recommendation: '' });
});

app.post("/getlocation", async (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    try {
        const response = await axios.get(API_URL, {
            params: {
                lat: latitude,
                lng: longitude
            },
            headers: {
                'x-access-token': apiKey
            }
        });

        const uvIndex = response.data.result.uv;

        let recommendation = '';

        if (uvIndex >= 11) {
            recommendation = "Extreme caution! Stay indoors or use strong SPF sunscreen.";
        } else if (uvIndex >= 8) {
            recommendation = "Very high risk! Apply SPF 30+ sunscreen and limit sun exposure.";
        } else if (uvIndex >= 6) {
            recommendation = "High risk! Apply SPF 15+ sunscreen and wear a hat.";
        } else if (uvIndex >= 3) {
            recommendation = "Moderate risk. Apply SPF 15 sunscreen.";
        } else {
            recommendation = "Low risk. Enjoy the sun safely!";
        }

        res.render("index.ejs", {
            uvIndex: uvIndex,
            recommendation: recommendation
        });
    } catch (error) {
        res.render("index.ejs", {
            error: "Error fetching UV index",
            recommendation: ''
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
