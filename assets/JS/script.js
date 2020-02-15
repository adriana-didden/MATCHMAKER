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

$(document).on('click', '.burger', function(){
  $("#navbar-one").addClass("is-active please-close-me")
  $("#navbar-two").addClass("is-active")
});

$(document).on('click', '.please-close-me', function(){
  $("#navbar-one").removeClass("is-active please-close-me")
  $("#navbar-two").removeClass("is-active")
});


    

// Title Page

function displayTitlePage (){

  var mainEl = $("<div class='container has-text-centered'><h1 class='title is-1'>Welcome to MATCHMAKER</h1><p class='subtitle'>Do you long-for companionship? Find it here at MATCHMAKER, where we connect you with your future soulmate based on our 5min questionaire. Press the START button below to begin your odyssey of love.</p><button class='button is-danger is-size-4 has-text-weight-bold' id='start-button'>START</button></div>")
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
var questionNumber=0;
function displayQuestionOneAtATime(){
  $('#main-body').empty()

  
if(questionNumber<questionsArray.length){
  var headingQuestionEl = $("<div id='display-div' class='container'><h2 class='title is-3 has-text-centered'>"+ questionsArray[questionNumber].title +"</h2></div>")
  $("#main-body").append(headingQuestionEl)




//   var olEl = document.createElement("ol");
//       mainEl.appendChild(olEl);

//   response = document.createElement("p")
//   body.appendChild(response);
//   response.style.position = "fixed"
//   response.style.bottom = "10px"
//   response.style.left = "30px"

//   for (var i = 0; i < questionsArray[questionNumber].choices.length; i++){
//       var qu = questionsArray[questionNumber].choices[i];
//       var liEl = document.createElement("li");
//       olEl.appendChild(liEl);
//       var button = document.createElement("button");
//       liEl.appendChild(button);
//       button.textContent = qu;
//       button.addEventListener("click", click)
//       // console.log(qu)
//       // console.log(questionsArray[questionNumber].answer)     
//   } 
}
}