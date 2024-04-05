const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.GOOGLE_API_KEY;

async function getCoordsForAddress(address) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${API_KEY}`,
        axios.getAdapter("http")
    );

    const data = response.data;

    if (!data || data.status === "ZERO_RESULT") {
        const error = new HttpError(
            "Could not found location fotr the specified address.",
            422
        );
        throw error;
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;
