const apiKey = "6c9b225afc4a20b214210c8a9ddd9a0e";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    const kelvinTemperature = data.main.temp;
    const celsiusTemperature = kelvinTemperature - 273.15;

    data.main.temp = celsiusTemperature;

    //   console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// const apiKey = "6c9b225afc4a20b214210c8a9ddd9a0e";
// const city = "Allahabad";
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// fetch(apiUrl)
//   .then((response) => response.json())
//   .then((data) => {
//     // Check if the API request was successful
//     if (data.cod === 200) {
//       // Convert temperature from Kelvin to Celsius
//       const kelvinTemperature = data.main.temp;
//       const celsiusTemperature = (kelvinTemperature - 273.15).toFixed(2);

//       // Replace the original temperature in the API response
//       data.main.temp = parseFloat(celsiusTemperature);

//       // Log the modified API response
//       console.log(data);

//       document.querySelector(".city").innerHTML = data.name;
//       document.querySelector(".temp").innerHTML =
//         Math.round(data.main.temp) + "°c";
//       document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//       document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
//     } else {
//       // Log an error message if the API request was not successful
//       console.error(`Error: ${data.message}`);
//     }
//   })
//   .catch((error) => {
//     // Log an error message if there was an issue with the API request
//     console.error("Error fetching data:", error);
//   });
