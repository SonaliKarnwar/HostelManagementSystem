const API_BASE_URL = "http://localhost:8080/api";

async function apiRequest(endpoint, method = "GET", data = null) {

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (data !== null) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(API_BASE_URL + endpoint, options);

    let result = {};

    try {
        result = await response.json();
    } catch (error) {
        result = {};
    }

    if (!response.ok) {
        throw new Error(
            result.message || "Request failed"
        );
    }

    return result;
}