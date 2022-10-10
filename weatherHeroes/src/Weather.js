export default class Weather {
    constructor(api_key1, api_key2) {
        this.apiKey1 = api_key1;
        this.apiKey2 = api_key2;

        if (localStorage.getItem('timestamp') && localStorage.getItem('timestamp') < Date.now() - 600000) {

            const weatherData = JSON.parse(localStorage.getItem('weather'));
            this.displayWeather(weatherData);
        } else {
            this.getLocation();
        }



    }

    // Get location from IP API
    getLocation() {
        // Get location from browser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
            navigator.geolocation.getCurrentPosition(this.getHero.bind(this));
            } else {
                alert('Geolocation is not supported by this browser.');
        }
    }
    
    // Fetch weather from API
    async getWeather(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey1}&q=${lat},${lon}`;
        fetch(url) 
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('weather', JSON.stringify(data));
                localStorage.setItem('timestamp', Date.now()); 
                this.displayWeather(data);
            });
    }

    async getHero1() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Iron%20Man&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                console.log(herodata);
                this.displayHero(herodata);
            });
    }
    async getHero2() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Absorbing%20Man&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                console.log(herodata);
                this.displayHero(herodata);
            });
    }


    displayWeather(data) {
        const temp = data.current.temp_c;
        document.querySelector('.weather__temp').innerHTML = `${temp}°C`;

        const weather = data.current.condition.text;
        document.querySelector('.weather__summary').innerHTML = weather;
        

        const icon = data.current.condition.icon;
        const img = document.createElement('img');
        img.src = icon;
        document.querySelector('.weather__icon').appendChild(img);
    }
    
    displayHero(data) {
        const hero = data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension;
        const img = document.createElement('img');
        img.src = hero;
        document.querySelector('.hero').appendChild(img);
    }

} 