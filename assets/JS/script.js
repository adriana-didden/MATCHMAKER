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




// Navbar Hamburger 

$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});
    

// Title Page

function displayTitlePage (){
  var mainEl = $("<div class='container has-text-centered' id='title-page-div'><h1 id='welcome-to-matchmaker' class='title is-1 sriracha'>Welcome to MATCHMAKER</h1><hr/><p id='title-page-subtext' class='subtitle mali'>Do you long-for companionship? Find it here at MATCHMAKER, where we connect you with your future soulmate based on our 5 minute questionaire. Press the START button below to begin your odyssey of love.</p><button class='button is-danger is-size-2 has-text-weight-bold sriracha' id='start-button'>START</button></div>")
  $('#main-body').append(mainEl);
  $(document).on('click', '#start-button', displayQuestionOneAtATime);
}
displayTitlePage();


// Questions 

var questionsArray = [
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
    title: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    
  },
  {
    title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    
  }
];



// question display functions

var questionNumber=0;

function displayQuestionOneAtATime(){
  $('#main-body').empty()
  if (questionNumber<questionsArray.length){
  var headingQuestionEl = $("<div id='display-div' class='container'><h2 class='title has-text-centered sriracha'>"+ questionsArray[questionNumber].title +"</h2><div id='answer-colums' class='columns'></div></div>")
  $("#main-body").append(headingQuestionEl)

  for (var i=0; i<questionsArray[questionNumber].choices.length; i++){
    var answerDiv = $("<div class='column has-text-centered'><button class='button is-danger has-text-weight-bold mali' id='answer-button'>"+ questionsArray[questionNumber].choices[i] +"</button></div>")
    $(".columns").append(answerDiv);
  }
  
}else{

  // Add Code that moves to Match Page

}
    
}

$(document).on('click', '#answer-button', click);


function click(event){
  event.preventDefault();
  questionNumber++;
  
  
  // ADD BACK-END CODE HERE that captures filter criteria
  
  
  displayQuestionOneAtATime();
}



// Match History




// function renderMatchHistory(event) {
//   event.preventDefault();
//   let matchStorage = JSON.parse(localStorage.getItem("matchStorage")) 

//   if(matchStorage){
//     matchStorage.sort(function(/* ADD HERE */){
//       // ADD HERE
//     })
//     for (var i=0; i < matchStorage.length; i++){
//       // ADD HERE
//     }
//   }

// }

// function saveToLocalStorage(event){
//   event.preventDefault();
//   $("").empty();
 
//   var matchStorage = JSON.parse(localStorage.getItem("matchStorage"))
//   var intials = document.getElementById("intials");

//   if (!matchStorage){matchStorage = []};
//   var matchObject = {/*Fill with key value pairs*/}
   
//   matchStorage.push(matchObject);
//       localStorage.setItem("matchStorage", JSON.stringify(matchStorage))
//       window.location.replace("./match-history.html")
      
// }




