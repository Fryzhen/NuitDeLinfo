const url = "https://api.weatherstack.com/current?access_key=bfc523ac36a2c45c0462a076f7e96e18&query=Paris";

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.current) {
            const temperature = data.current.temperature;
            const description = data.current.weather_descriptions[0];
            const humidity = data.current.humidity;

            document.getElementById('weather-info').innerHTML = `Temperature: ${temperature}°C \n` + `Condition: ${description} \n` + `Humidity: ${humidity}% `
            ;
        } else {
            console.error('Data not available');
        }
    })
    .catch(error => {
        console.error('Error fetching the weather data:', error);
    });