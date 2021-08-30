function add_to_html() {
  _Get_country_name().then((item) => {
    item.map((obj) => {
      $("#select-country").append(`
            <option>${obj.name} </option>
            `);
    });
  });
}
 
// $("#select-country").change(function (e) { 
// _Get_country_info().then((item)=>{

//     $("#info").html(`  <div class="card mb-3 w-50 mx-auto my-5 text-center col-4 ">
//     <img src="./Image_created_with_a_mobile_phone.png" class="card-img-top img">
//     <div class="card-body">
//       <h5 class="card-title">${item.name}</h5>
//       <p class="card-text">${ item.nativeName}</p>
//       <p class="card-text"><small class="text-muted">${item.capital}</small></p>
//     </div>
//     </div>`);
// })

//  });
add_to_html();


// response.name
//
// 
// response.region
// response.population
// response.languages[0].name
// response.timezones