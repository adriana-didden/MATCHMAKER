var API_KEY = "NfI52qHKiCljm9rlRQrqpVYjFcVBlym6ORnKYSBcIQUlcZbzE0";
    var API_SECRET = "7rcHAiljchDTvoTalPnj6rjlplPpfV8l7e8siAmB";
​
    $.ajax({
      url: "https://api.petfinder.com/v2/oauth2/token",
      method: "POST",
      data: {
        grant_type: "client_credentials",
        client_id: API_KEY,
        client_secret: API_SECRET
      }
    }).then(function (response) {
      var token = response.access_token;
​
      $.ajax({
        url: "https://api.petfinder.com/v2/animals?type=dog",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then(function (response) {
        console.log(response);
      });
    });