$(document).ready(function () {
  let setting = {
    url: "https://restcountries.eu/rest/v2/all",
    method: "GET",
  };

  $.ajax(setting).done(function (res) {
    res.forEach((data) =>
      $("#select-country").append(`
                    <option value="${data.alpha3Code}">
                        ${data.name}  
                    </option>
                `)
    );

    $("#select-country").change(function (e) {
      $.ajax({
        url: `https://restcountries.eu/rest/v2/alpha/${$(this).val()}`,
        method: "GET",
      }).done(function (response) {
        document.body.style.backgroundImage = `url(${response.flag})`;
        $("#info").html(`

<div class="card1 text-white text-center mb-3" style=" background-color:rgba(147, 128, 232,0.4)" id="main_info">
  <div class="card-header">${response.name}</div>
  <div class="card-body">
    <h5 class="card-title">NativeName:${response.nativeName}</h5>
    <h5 class="card-title">Capital:${response.capital}</h5>
    <h5 class="card-title">Region:${response.region}</h5>
    <h5 class="card-title">Language:${response.languages[0].name}</h5>
    <h5 class="card-title">Population:${response.population}</h5>
  </div>
</div>

<div class="mr-0" id="app"></div>
                
                `);

        $.ajax({
          url: `http://api.openweathermap.org/data/2.5/weather?q=${response.capital}&appid=44b1fe8a6c0207544cdd674445971577`,
          method: "GET",
        }).done(function (response) {
          console.log(response.coord);
          $("#weather").html(`

                    <div class="card text-white text-center mb-3" style="max-width: 18rem; background-color:rgba(147, 128, 232,0.4)" id="weather">
                    <div class="card-header">
                    <img src="http://openweathermap.org/img/wn/${
                      response.weather[0].icon
                    }@2x.png"></div>
                    <div class="card-body">
                      <h5 class="card-title">wind speed: ${
                        response.wind.speed
                      }</h5>
                      <h5 class="card-title">temperature: ${Math.round(
                        response.main.temp - 273.15
                      )}°C</h5>
                      <h5 class="card-title">humadity: ${
                        response.main.humidity
                      }%</h5>
                      <h5 class="card-title">visibility: ${
                        response.visibility
                      }</h5>

                      
                    </div>
                  </div>

                    `);
          var app = new Mapp({
            element: "#app",
            presets: {
              latlng: {
                lat: response.coord.lat,
                lng: response.coord.lon,
              },
              zoom: 6,
            },
            apiKey:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUwOGFlYzMwMTc3NWNjODE3ZjhlY2M5MGIwZjc4ODI1MTdlNWEwZTBmZjkxMWNkMzEzYWM4OGQwN2MzYjUwMGY1OTg3ZDZlN2FhY2MwODliIn0.eyJhdWQiOiIxNDI5NyIsImp0aSI6IjUwOGFlYzMwMTc3NWNjODE3ZjhlY2M5MGIwZjc4ODI1MTdlNWEwZTBmZjkxMWNkMzEzYWM4OGQwN2MzYjUwMGY1OTg3ZDZlN2FhY2MwODliIiwiaWF0IjoxNjIzMTI4MTE3LCJuYmYiOjE2MjMxMjgxMTcsImV4cCI6MTYyNTcyMDExNywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OokUd0U5JpMoDgbr0Kr6ZTe_M6rBbm-S8hMTbiN4vDW2HQxR45msJJEBntThDNDrPcE23t8Kl8tHxtUs4EuyE_7hs52rghvJtSD8KM8jVAOVXNtK7lKlCRSMLVowo-y4gyH2oeUGoQmKFyIru7H5QbyYz8iIvlgtS8pFyFsXenNKkZwbizj2qodDrTL6MTmIHCNLO78IGmKesBIG__kPTcz74lnvLjGqnRAP-3RltYUh6NRuDC89jykHGvZQ-uYuqRI3cMwEOirt8bmIa0vs74FasjBVZnOBZ0pOLRmDotFocCc0TLYVm8xcw5YPeOfXtvzRd8wiuf40s47HwEJYZg",
          });
          app.addLayers();
        });
      });
    });
  });
});



document.getElementById("button_search")
.addEventListener('click',(e)=>{


document.getElementById("search_div").innerHTML=`<div class="input-group mb-3 w-75 mx-auto ">
<input type="text" class="form-control" placeholder="Insert Country Name" aria-label="Recipient's username" aria-describedby="button-addon2" id="country_name_search">
<div class="input-group-append">
  <button class="btn btn-outline-danger btn-info" type="button" id="button-addon2" onclick="search()">Search</button>
</div>
</div>

`


})












function search(){

  const name_country=document.getElementById("country_name_search").value

    $.ajax({
      url: `https://restcountries.eu/rest/v2/name/${name_country}`,
      method: "GET",
    }).done(function (response) {
let i=0
      response.map((item)=>{
        console.log(item);
        i++
      })
      document.body.style.backgroundImage = `url(${response[0].flag})`;
      $("#info").html(`
<div>you have ${i} option</div>
<div class="card1 text-white text-center mb-3" style="max-width: 18rem; background-color:rgba(147, 128, 232,0.4)">
<div class="card-header">${response[0].name}</div>
<div class="card-body">
  <h5 class="card-title">NativeName:${response[0].nativeName}</h5>
  <h5 class="card-title">Capital:${response[0].capital}</h5>
  <h5 class="card-title">Region:${response[0].region}</h5>
  <h5 class="card-title">Language:${response[0].languages[0].name}</h5>
  <h5 class="card-title">Population:${response[0].population}</h5>
</div>
</div>

<div class="mr-0" id="app"></div>
              
              `);

      $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${response[0].capital}&appid=44b1fe8a6c0207544cdd674445971577`,
        method: "GET",
      }).done(function (response) {
        console.log(response.coord);
        $("#weather").html(`

                  <div class="card text-white text-center mb-3" style="max-width: 18rem; background-color:rgba(147, 128, 232,0.4)">
                  <div class="card-header">
                  <img src="http://openweathermap.org/img/wn/${
                    response.weather[0].icon
                  }@2x.png"></div>
                  <div class="card-body">
                    <h5 class="card-title">wind speed: ${
                      response.wind.speed
                    }</h5>
                    <h5 class="card-title">temperature: ${Math.round(
                      response.main.temp - 273.15
                    )}°C</h5>
                    <h5 class="card-title">humadity: ${
                      response.main.humidity
                    }%</h5>
                    <h5 class="card-title">visibility: ${
                      response.visibility
                    }</h5>

                    
                  </div>
                </div>

                  `);
        var app = new Mapp({
          element: "#app",
          presets: {
            latlng: {
              lat: response.coord.lat,
              lng: response.coord.lon,
            },
            zoom: 6,
          },
          apiKey:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUwOGFlYzMwMTc3NWNjODE3ZjhlY2M5MGIwZjc4ODI1MTdlNWEwZTBmZjkxMWNkMzEzYWM4OGQwN2MzYjUwMGY1OTg3ZDZlN2FhY2MwODliIn0.eyJhdWQiOiIxNDI5NyIsImp0aSI6IjUwOGFlYzMwMTc3NWNjODE3ZjhlY2M5MGIwZjc4ODI1MTdlNWEwZTBmZjkxMWNkMzEzYWM4OGQwN2MzYjUwMGY1OTg3ZDZlN2FhY2MwODliIiwiaWF0IjoxNjIzMTI4MTE3LCJuYmYiOjE2MjMxMjgxMTcsImV4cCI6MTYyNTcyMDExNywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OokUd0U5JpMoDgbr0Kr6ZTe_M6rBbm-S8hMTbiN4vDW2HQxR45msJJEBntThDNDrPcE23t8Kl8tHxtUs4EuyE_7hs52rghvJtSD8KM8jVAOVXNtK7lKlCRSMLVowo-y4gyH2oeUGoQmKFyIru7H5QbyYz8iIvlgtS8pFyFsXenNKkZwbizj2qodDrTL6MTmIHCNLO78IGmKesBIG__kPTcz74lnvLjGqnRAP-3RltYUh6NRuDC89jykHGvZQ-uYuqRI3cMwEOirt8bmIa0vs74FasjBVZnOBZ0pOLRmDotFocCc0TLYVm8xcw5YPeOfXtvzRd8wiuf40s47HwEJYZg",
        });
        app.addLayers();
      });
    });
  


  }