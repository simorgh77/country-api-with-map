const _Get_country_name = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      Type: "GET",
      url: "https://restcountries.eu/rest/v2/all",
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};


$("#select-country").change(function (e) {
  $.ajax({
      "url": `https://restcountries.eu/rest/v2/name/${$(this).value}`,
      "method": "GET"
  }).done(function (response) {
      $("#info").html(`
      <div>
          <h2 class="text-warning">Name: ${response.name}</h2>
          <p class="text-warning">Native Name: ${response.nativeName}</p>
          <p class="text-warning">Capital: ${response.capital}</p>
          <p class="text-warning">Region: ${response.region}</p>
          <p class="text-warning">Population: ${response.population}</p>
          <p class="text-warning">Language: ${response.languages[0].name}</p>
          <p class="text-warning">Timezone: ${response.timezones}</p>
      </div>
      
      `)
  })
  })
