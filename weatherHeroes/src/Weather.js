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

    async getSunHero() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Human%20Torch&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                this.displayHero(herodata);
            });
    }
    async getCloudHero() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Cloud%209&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                this.displayHero(herodata);
            });
    }

    async getSnowHero() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Luna%20Snow&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                this.displayHero(herodata);
            });
    }

    async getMistHero() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Alter%20Ego&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                this.displayHero(herodata);
            });
    }

    async getStormHero() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Thor&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                this.displayHero(herodata);
            });
    }

    async getRainHero() {
        const hero = `https://gateway.marvel.com/v1/public/characters?name=Hydro-Man&apikey=${this.apiKey2}`;
        fetch(hero) 
            .then((response) => response.json())
            .then((herodata) => {
                this.displayHero(herodata);
            });
    }



    displayWeather(data) {
        const temp = data.current.temp_c;
        document.querySelector('.weather__temp').innerHTML = `${temp}°C`;

        const weather = data.current.condition.text;
        document.querySelector('.weather__summary').innerHTML = weather;
        
        //const code = data.current.condition.code;
        const code = 1213;
        if(code === 1000) {
            this.getSunHero();
        }
        
        if((code === 1003) || (code === 1006) || (code === 1009)) {
            this.getCloudHero();
        }

        if((code === 1030) || (code === 1135) || (code === 1147)) {
            this.getMistHero();
        }

        if((code === 1087) || (code === 1273) || (code === 1276) || (code === 1279) || (code === 1282)) {
            this.getStormHero();
        }

        if((code === 1114) || (code === 1255) || (code === 1117) || (code === 1258) || (code === 1237) ||  (code === 1213) || (code === 1219) || (code === 1225)) {
            this.getSnowHero();
        }




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