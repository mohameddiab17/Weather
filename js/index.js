let anchors = document.querySelectorAll("nav ul li a");
let dayNumder = document.getElementById("day-number");
let dayWord = document.querySelector(".day");
let month = document.getElementById("month");
let country = document.getElementById("country");
let temp = document.getElementById("temp");
let conditionText = document.getElementById("condition-text");
let conditionIcon = document.getElementById("condition-icon");
let humidity = document.getElementById("humidity");
let windDir = document.getElementById("wind-dir");
let windKph = document.getElementById("wind-kph");

let nextDay = document.querySelectorAll(".next-day");
let nextConditionImgs = document.querySelectorAll(".next-imgs");
let nextMaxTemp = document.querySelectorAll(".next-max-temp");
let nextMinTemp = document.querySelectorAll(".next-min-temp");
let nextStatus = document.querySelectorAll(".next-status");

let searchInput = document.getElementById("search");

for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click" , function (e) {
        e.preventDefault();
        for (let j = 0; j < anchors.length; j++) {
            anchors[j].classList.remove("active");
        }
        anchors[i].classList.add("active");
    })
    
}

async function getWeatherData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5538818bc7954bedaca63527241505&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}

function displayTodayData(data){
    let date = new Date();
    dayNumder.innerHTML = date.getDate();
    dayWord.innerHTML = date.toLocaleDateString("en" , {weekday:"long"});
    month.innerHTML = date.toLocaleDateString("en" , {month : "long"})
    country.innerHTML = data.location.name;
    temp.innerHTML = data.current.feelslike_c + `<sup>o</sup> C`;
    conditionIcon.setAttribute("src" , data.current.condition.icon);
    conditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity;
    windDir.innerHTML = data.current.wind_dir;
    windKph.innerHTML =data.current.wind_kph;
}

function displayNextData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i+1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en" , {weekday : "long"})
        nextConditionImgs[i].setAttribute("src" , forecastData[i+1].day.condition.icon);
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c + "<sup>o</sup> C";
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c + "<sup>o</sup>";
        nextStatus[i].innerHTML = forecastData[i+1].day.condition.text ;
    }
}

async function startApp(city = "cairo") {
    let weatherData = await getWeatherData(city);
    if (!weatherData.error) {
        displayTodayData(weatherData);
        displayNextData(weatherData);
    }
}
startApp();

searchInput.addEventListener("input" , function(){
    startApp(searchInput.value);
})
