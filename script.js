$(function () {
  $(".slider").click(function () {
    var degreeSign = $("#temp-val").text()
    var temperature = $("#temp-val").text().slice(0, -3)
    if (degreeSign.slice(-1) === "C") {
      temperature = Math.round(temperature * (9 / 5)) + 32
      degreeSign = "F"
      $("#temp-val").html(temperature + " °" + degreeSign)
    } else {
      temperature = Math.round((temperature - 32) * (5 / 9))
      degreeSign = "C"
      $("#temp-val").html(temperature + " °" + degreeSign)
    }
  })
})
;(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, errorCall)
    $("#weather-icon").html("<h2>Loading... please wait!</h2>")
  }
  function errorCall(error) {
    window.alert(
      "Unable to retrieve weather! This might be due to having your location setting turned off on your mobile device " +
        "or from denying location access on desktop. Please note that if you are using FireFox, that there is currently a bug with " +
        "geolocation. Please use a different browser! \n\n" +
        " {Error message: " +
        error.message +
        "}"
    )
    $("#weather-icon").html("<h2>Unable to retrieve weather!</h2>")
  }
  function success(position) {
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    const url =
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
      latitude +
      "&lon=" +
      longitude
    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        var temp = Math.round(data.main.temp)
        var city = data.name
        var country = data.sys.country
        var description = data.weather[0].main
        $("#temp-val").html(temp + " °C")
        $("#city-country-val").html(city + ", " + country)
        $(".slider").css("display", "block")
        var imageDescription = {
          Clouds:
            "<div class='icon cloudy mx-auto' id='weather-icon'><div class='cloud'></div><div class='cloud'></div></div>",
          Clear:
            '<div class="icon sunny mx-auto" id="weather-icon"><div class="sun"><div class="rays"></div></div></div>',
          Thunderstorm:
            '<div class="icon thunder-storm mx-auto" id="weather-icon"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>',
          Snow: '<div class="icon flurries mx-auto" id="weather-icon"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>',
          Rain: '<div class="icon rainy mx-auto" id="weather-icon"><div class="cloud"></div><div class="rain"></div></div>',
          Drizzle:
            '<div class="icon rainy mx-auto" id="weather-icon"><div class="cloud"></div><div class="rain"></div></div>',
          Mist: '<div class="icon rainy mx-auto" id="weather-icon"><div class="cloud"></div><div class="rain"></div></div>',
        }
        if (imageDescription[description] !== undefined) {
          $("#insert-html").html(imageDescription[description])
        } else {
          $("#insert-html").html(
            '<div class="mx-auto" id="weather-icon-pic"><img class="text-center" src=' +
              data.weather[0].icon +
              ' alt="Image of weather"></div>'
          )
        }
        var color = ""
        if (temp >= 30) {
          color = "#ff0000"
        } else if (temp >= 20) {
          color = "#ff9801"
        } else if (temp >= 10) {
          color = "#ffe600"
        } else if (temp >= 0) {
          color = "#02feb3"
        } else if (temp >= -10) {
          color = "#00cdff"
        } else if (temp >= -20) {
          color = "#00f"
        } else {
          color = "#e600e6"
        }
        $("body").css("background-color", color)
      })
  }
})()