var API_KEY = "NfI52qHKiCljm9rlRQrqpVYjFcVBlym6ORnKYSBcIQUlcZbzE0";
    var API_SECRET = "7rcHAiljchDTvoTalPnj6rjlplPpfV8l7e8siAmB";

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



// Title Page




// Questions 
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    
  }
];



// question display functions




