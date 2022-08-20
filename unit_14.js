const param = {
    "url" : "https://api.openweathermap.org/data/2.5/",
    "appikey" : "a10f6aaaaa633485f8857068ebc8742e"
}

const cities = {
	2759794: 'Amsterdam',
	2968815: 'Paris',
	293397: 'Tel-Aviv',
	703448: 'Kyiv',
	3067696: 'Prague'
  }
  const select = document.createElement('select');
  document.querySelector('.weather').insertAdjacentElement('afterBegin', select);
  select.classList.add('weather__list');
  select.id = 'city';
  for (let key in cities) {
    const city = cities[key];
    const option = document.createElement('option');
    option.textContent = city;
    option.value = key;
    select.appendChild(option);
  }


function getWeather(){
	let cityId = document.querySelector('#city').value;
	fetch(`${param.url}weather?id=${cityId}&units=metric&appid=${param.appikey}&lang=ua`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);		
}


function showWeather(data) {
	console.log(data);
	document.querySelector('.package-name').textContent = data.name;
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&deg;`;
    document.querySelector('.disclaimer').textContent = data.weather[0]['description'];
	document.querySelector('.features li').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
	document.querySelector('.pressure').innerHTML = `Тиск: ${data.main.pressure} Па`;
	document.querySelector('.humidity').innerHTML = `Вологiсть: ${data.main.humidity}%`;
	let times = new Date(data.sys.sunset *1000);
	document.querySelector('.sunset').innerHTML = `Захiд: ${times.getHours()}:${times.getMinutes()}`;
	let timer = new Date(data.sys.sunrise *1000);
	document.querySelector('.sunrise').innerHTML = `Схiд: ${timer.getHours()}:${timer.getMinutes()}`;
}

getWeather();
document.querySelector('#city').onchange = getWeather;

