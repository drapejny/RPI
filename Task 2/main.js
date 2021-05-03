//DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    date = document.querySelector('.date');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const body = document.querySelector('body');
const nextBtn = document.querySelector('.nextBtn');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const windspeed = document.querySelector('.wind-speed');
const city = document.querySelector('.city');


let nextImgIndex = 0;


function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage() {
    const index = nextImgIndex % images.length;
    const imageSrc = images[index];
    viewBgImage(imageSrc);
    nextImgIndex++;
    nextBtn.disabled = true;
    setTimeout(function () { nextBtn.disabled = false }, 1000);
}





var imageIndex = 0;
let today = new Date();

var images = new Array(24);
setImages("night", 0, 6);
setImages("morning", 6, 12);
setImages("day", 12, 18);
setImages("evening", 18, 24);
for (var i = 0; i < 24; i++)
    console.log(images[i] + " ");


function setImages(timeOfDay, startIdx, endIdx) {
    var tempArray = new Array(6);
    for (var i = 0; i < 6; i++) {
        do {
            var randNum = Math.floor(Math.random() * 20 + 1);
            if (tempArray.indexOf(randNum) === -1) {
                tempArray[i] = randNum;
                break;
            }
        } while (true);
    }
    var j = 0;
    for (var i = startIdx; i < endIdx; i++) {
        image = new Image;
        image.src = ".\\assets\\images\\" + timeOfDay + "\\" + tempArray[j] + ".jpg";
        images[i] = image.src;
        j++;
    }
}

//Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        dayOfWeek = getDayOfWeek(today),
        dayOfMonth = today.getDate(),
        month = getMonth(today);
    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    date.innerHTML = dayOfWeek + " " + dayOfMonth + " " + month;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Set Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    nextImgIndex = hour;
    getImage();

    var millisToNewImg = 3600000 - (min * 60000 + sec * 1000);

    if (hour < 6) {
        // Night
        greeting.textContent = 'Good Night, ';
        body.style.color = "eee";
    } else if (hour < 12) {
        // Morning
        greeting.textContent = 'Good Morning, ';
        body.style.color = "eee";
    } else if (hour < 18) {
        // Afternoon
        greeting.textContent = 'Good Day, ';
        body.style.color = "eee";
    } else {
        //Evening
        greeting.textContent = 'Good Evening, ';
        body.style.color = "eee";
    }
    setTimeout(setBgGreet, millisToNewImg);
}
// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'click') {
        e.target.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13)
            e.target.blur();
    } else if (e.type === 'blur') {
        if (e.target.innerText.trim() === '') {
            e.target.innerText = localStorage.getItem('name');
        } else localStorage.setItem('name', e.target.innerText.trim());
    }
}

//Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//Set Focus
function setFocus(e) {
    if (e.type === 'click') {
        e.target.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13)
            e.target.blur();
    } else if (e.type === 'blur') {
        if (e.target.innerText.trim() === '') {
            e.target.innerText = localStorage.getItem('focus');
        } else localStorage.setItem('focus', e.target.innerText.trim());
    }
}

async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=0c6aed1d3aa3b12f6e5bdd0f74172cae&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod == 404) {
        alert(data.message);
        city.textContent = localStorage.getItem('city');
    } else {
        localStorage.setItem('city', city.textContent);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        humidity.textContent = `${data.main.humidity} %`;
        windspeed.textContent = `${data.wind.speed} m/s`;
    }
}

function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = 'Minsk';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function setCity(e) {
    if (e.type === 'click') {
        e.target.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13)
            e.target.blur();
    } else if (e.type === 'blur') {
        if (e.target.innerText.trim() === '') {
            e.target.innerText = localStorage.getItem('city');
        } else
            getWeather();
    }

}

function getMonth(date) {
    switch (date.getMonth()) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}
function getDayOfWeek(date) {
    switch (date.getDay()) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
nextBtn.addEventListener('click', getImage);
document.addEventListener('DOMContentLoaded', getWeather);

//Run
showTime();
setImages();
setBgGreet();
getName();
getFocus();
getCity();
getWeather()