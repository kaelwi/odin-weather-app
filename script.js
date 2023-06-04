async function getData() {
    console.log('getData');
    const input = document.getElementsByTagName('input')[0];
    const response = await  fetch('https://api.weatherapi.com/v1/current.json?key=d9c1f19082a34d16b7e170056230306&q=' + input.value, {mode: 'cors'});

    if (response.status == 200) {
        const responseData = await response.json();
        console.log(responseData);
        const icon = responseData.current.condition.icon.split('/');
        console.log(icon);
        console.log(icon[icon.length-1]);
        return {location: responseData.location.name,
            country: responseData.location.country,
            condition: responseData.current.condition.text,
            is_day: responseData.current.is_day,
            icon: responseData.current.condition.icon,
            feelslike: responseData.current.feelslike_c,
            temp: responseData.current.temp_c,
            wind_dir: responseData.current.wind_dir,
            wind_kph: responseData.current.wind_kph};
    } else {
        return null;
    }
}

function setup() {
    const btn = document.getElementById('send');
    btn.disabled = true;
    btn.addEventListener('click', displayData);

    const input = document.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
        if (input.value != '') {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    });
    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            btn.click();
        }
    })
}

async function displayData() {
    console.log('displayData');
    const weather = await getData();
    console.log(weather);

    const content = document.getElementById('content');
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    content.style.visibility = 'visible';

    const h2 = document.createElement('h2');
    h2.textContent = weather.location;
    
    const p = document.createElement('p');
    p.textContent = weather.country;

    const img = createImg(weather.is_day, weather.icon);

    const h3 = document.createElement('h3');
    h3.textContent = weather.temp + ' °C';

    content.appendChild(h2);
    content.appendChild(p);
    content.appendChild(img);
    content.appendChild(h3);
}

function createImg(is_day, iconurl) {
    const img = document.createElement('img');
    let src = './img/';
    if (is_day) {
        src += 'day/';
    } else {
        src += 'night/';
    }
    const icon = iconurl.split('/');
    src += icon[icon.length-1];

    img.src = src;

    return img;
}

setup();