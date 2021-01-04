const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');
const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    let cityval = cityName.value;
    if(cityval === "") {
        city_name.innerText = "please write the name before you search";
        datahide.classList.add('data_hide');
    }else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=384f5137355267981ddf23eaa86baa62`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = parseInt(`${arrData[0].main.temp - 273}`);

            const tempMood = arrData[0].weather[0].main;
            //condition to check sunny or cloudy

            if(tempMood == "Clear") {
                temp_status.innerHTML = "<i class = 'fas fa-sun' style = 'color:#eccc68;'></i>";
            }else if(tempMood == "Rain") {
                temp_status.innerHTML = "<i class = 'fas fa-rain' style = 'color:#a4b0be;'></i>";
            }else if(tempMood == "Clouds") {
                temp_status.innerHTML = "<i class = 'fas fa-Cloud' style = 'color:#f1f2f6;'></i>";
            } else {
                temp_status.innerHTML = "<i class = 'fas fa-sun' style = 'color:#eccc68;'></i>";
            }
            datahide.classList.remove('data_hide');
        }catch {
            city_name.innerText = 'please enter the city name properly';
            datahide.classList.add('data_hide');
        }

    }

}

submitBtn.addEventListener('click', getInfo);
