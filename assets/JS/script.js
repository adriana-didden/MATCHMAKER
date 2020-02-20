var pf = new petfinder.Client({
  apiKey: "yFhWUo2yQ3zi2yQgCFJjR8j5ik1tlTX7iZsSZJMQvU55hD3z44",
  secret: "KhkHM7EJA6UjUWgqvL6e3nETORjUeXN0gOAx92tN"
});

var questionsArray = [
  {
    title: "What fits you best:",
    choices: ["Person looking for a female", "Person looking for a male", "Person looking for a female OR a male"],

  },
  {
    title: "What are your thoughts on children?",
    choices: ["Want someday", "Have and want more", "Don't want", "Have and don't want more"],

  },
  {
    title: "What is your preferred style?",
    choices: ["Preppy", "Hipster", "Casual", "Trendy"],

  },
  {
    title: "What is your preferred body type?",
    choices: ["Slender", "Big and beautiful", "About average", "Athletic and toned"],

  },
  {
    title: "What song fits you best?",
    choices: ["Lil Bow Wow - Bow Wow (That's My Name) ft. Snoop Dogg", "Alicia Keys - Underdog", "Baha Men - Who Let The Dogs Out", "Billie Eilish - Bad guy"],

  }
];
var coordinates;
var questionNumber = 0;
var answers = [];

//Geolocation functions
$(window).on("load", function () {
  if (!localStorage.getItem("getLocation")) {
    getLocation();
    localStorage.setItem("getLocation", "true");
  } else {
    coordinates = localStorage.getItem("coordinates")
  }
})

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  coordinates = lat + "," + lon;
  localStorage.setItem("coordinates", coordinates)

}

// Navbar Hamburger 

$(document).ready(function () {

  $(".navbar-burger").click(function () {

    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });
});

// Title Page

function displayTitlePage() {
  var mainEl = $("<div class='column has-text-centered'><div class='container has-text-centered' id='title-page-div'><h1 id='welcome-to-matchmaker' class='title has-text-white sriracha'>Welcome to MATCHMAKER</h1><hr/><p id='title-page-subtext' class='subtitle has-text-white mali'>Do you long-for companionship? Find it here at MATCHMAKER, where we connect you with your future soulmate based on our 5 question quiz. Press the START button below to begin your odyssey of love.</p><button class='button is-danger is-size-2 has-text-weight-bold sriracha' id='start-button'>START</button></div></div>")
  console.log($(window).width())
  $('.columns').prepend(mainEl);
  if ($(window).width() > 1215){
    $('#welcome-to-matchmaker').addClass("is-1");
    console.log('workin')
  }
  $(document).on('click', '#start-button', displayQuestionOneAtATime);
}

displayTitlePage();

// question display functions

function displayQuestionOneAtATime() {
  $('#main-body').empty();
  $('#big-slideshow-div').remove();
  if (questionNumber < questionsArray.length) {
    var headingQuestionEl = $("<div id='display-div' class='container'><h2 class='title has-text-centered sriracha'>" + questionsArray[questionNumber].title + "</h2><div id='answer-columns' class='columns'></div></div>")
    $("#main-body").append(headingQuestionEl)

    for (var i = 0; i < questionsArray[questionNumber].choices.length; i++) {
      var answerDiv = $("<div class='column has-text-centered div-within-answer-div'><div class='column is-danger has-text-weight-bold has-text-white mali answer-button'>" + questionsArray[questionNumber].choices[i] + "</div></div>")
      $(".columns").append(answerDiv);
    }
  } 
}

$(document).on('click', '.answer-button', click);
function click(event) {
  event.preventDefault();
  questionNumber++;
  answers.push(this.textContent);
  displayQuestionOneAtATime();
  filter();
};

function filter() {

  var answer1 = answers[0];
  var answer2 = answers[1];
  var answer3 = answers[2];
  var answer4 = answers[3];
  var answer5 = answers[4];
  var searchGender;
  var goodWithChildren;
  var dogSize;
  var coatType;
  var goodWithCats;

  if (answer1 === "Person looking for a female") {
    searchGender = "female";} 
  else if (answer2 === "Person looking for a male") { 
    searchGender = "male";}
  else if (answer3 === "Person looking for a female OR a male") { 
    searchGender = "female,male";}  
  if (answer2 === "Don't want") {
    goodWithChildren = false;
  } else { goodWithChildren = true }  
  if (answer3 === "Preppy") {
    coatType = "medium,short,hairless,curly";
  }
  else if (answer3 === "Hipster") {
    coatType = "wire,short,hairless,curly";
  }
  else if (answer3 === "Casual") {
    coatType = "short,hairless,curly";
  }
  else if (answer3 === "Trendy") {
    coatType = "long,short,hairless,curly";
  }  
  if (answer4 === "Slender") {
    dogSize = "small";
  } else if (answer4 === "Big and beautiful") {
    dogSize = "xlarge";
  } else if (answer4 === "About average") {
    dogSize = "large";
  } else if (answer4 === "Athletic and toned") {
    dogSize = "medium";
  } 
  if (answer5 === "Billie Eilish - Bad guy") {
    goodWithCats = true;
  } else {
    goodWithCats = false;
  }
  if (questionNumber === questionsArray.length) {
    buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats);
  }

}

function buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats) {
 
  var params = { type: "dog", location: coordinates, status: "adoptable", gender: searchGender, good_with_children: goodWithChildren, coat: coatType, size: dogSize, good_with_cats: goodWithCats }
  
  if (coordinates) {
    params.location = coordinates    
    params.distance = 100
  }

  pf.animal.search(params)

    .then(function (response) {
      var responseArr = response.data;
      var acceptedDogIds = JSON.parse(localStorage.getItem("matches") || "[]");
      console.log(response)
      var dogId;
      var i = 0;
      function displayMatch() {

        function dogBreed() {
          dogId = (response.data.animals[i].id);
          var dogBreedPrimary = (response.data.animals[i].breeds.primary);
          var dogBreedSecondary = (response.data.animals[i].breeds.secondary);
          var dogBreedMixed = (response.data.animals[i].breeds.mixed);
          if (dogBreedPrimary && dogBreedSecondary && dogBreedMixed) {
            return "This cutiepie is a " + dogBreedPrimary + " and " + dogBreedSecondary + " mix";
          }
          if (dogBreedPrimary && !dogBreedSecondary && dogBreedMixed) {
            return "This cutiepie is mainly a " + dogBreedPrimary + " mix";
          }
          if (dogBreedPrimary && !dogBreedSecondary && !dogBreedMixed) {
            return "This cutiepie is a " + dogBreedPrimary;
          }
          if (!dogBreedPrimary && !dogBreedSecondary && !dogBreedMixed) {
            return "";
          }
        }
        
        $('#match-main-display').remove();
        if (response.data.animals.length && response.data.animals.length > i) {  
          var description = response.data.animals[i].description
          if (!description) description = "";
          var thePhoto =""
           if(response.data.animals[i].photos.length){
             
             thePhoto = response.data.animals[i].photos[0].medium 
           }
          var matchDisplay = $("<div id='match-main-display' class='container has-text-centered'><img id='match-img' src=" + thePhoto+ "> <h1 id='match-name' class='title is-3 has-text-white sriracha'>" + response.data.animals[i].name + "</h1><h2 id='match-dog-breed' class='subtitle is-4 has-text-white sriracha'>" + dogBreed() + "</h2><p id='match-description' class='is-size-5 has-text-white mali'>" + description + "</p><button id='accept-match' class='button is-danger is-size-2 has-text-weight-bold sriracha'>Accept Match!!!</button><br/><button id='decline-match' class='button is-dark is-size-4 sriracha'>Decline Match</button></div>");
          $('#main-body').append(matchDisplay);
        }
        else if (response.data.animals.length > 1 && response.data.animals.length < 5) { 
          const link= "https://media.giphy.com/media/aFTt8wvDtqKCQ/giphy-downsized.gif"
          const reload = $("<div>")
          reload.html("<div><p>"+"<a class='has-text-info has-text-weight-bold'href='index.html'"+">We only found a few options for you. Please try again!</a></p>"+"<img src='"+ link  +"'alt='animation of a illuminated unicorn surrounded by shades of blue '/></div>");
          $(".modal-content").html("")
          $(".modal-content").append(reload);
          $(".modal").addClass("is-active");
          
        }
        else { 
          const link= "https://media.giphy.com/media/l3978LHbIV5GAzRPG/giphy-downsized.gif"
          const reload = $("<div>")
          reload.html("<div><p>"+"<a class='has-text-info has-text-weight-bold'href='index.html'"+">You're looking for a Unicorn please try again!</a></p>"+"<img src='"+ link  +"'alt='animation of a illuminated unicorn surrounded by shades of blue '/></div>");
          $(".modal-content").html("")
          $(".modal-content").append(reload);
          $(".modal").addClass("is-active");
        }

        var acceptBtnClicked;

        $("#accept-match").click(function () {
          if (acceptBtnClicked = true) {
            acceptedDogIds.push(dogId);
            localStorage.setItem("matches", JSON.stringify(acceptedDogIds))
          }
          
        });

        i++;
      }


      displayMatch();
      $(document).on('click', '#decline-match', function () { getGif("dog+sad") });
      $(document).on('click', '#accept-match', function () { getGif("dog+happy") })

      function getGif(term) {
        $('#accept-match').remove();
        $('#decline-match').remove();
        $('#match-main-display').append($("<h1 id='congrats' class='title is-1 has-text-white sriracha'>Your Match has been Saved</h1>"));
        setTimeout(displayMatch, 2000);

        $(".modal-content").html("")

        //RUN GIPHY

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LLdCkhWcP8YLeTTJPLSVyeqLFaiZlHiB&limit=10&rating=g&q=" + term + "&SameSite=Secure";

        $(".modal").addClass("is-active");
        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (giphy) {
          var arrGif = giphy.data
          var picked = Math.floor(Math.random() * arrGif.length)
          
          var theGIF = $("<img>")
          theGIF.attr("src", arrGif[picked].images.original.url)
          $(".modal-content").append(theGIF);
          

        });
        var modal = document.getElementsByClassName("modal is-active");

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.removeClass("is-active")
          }
        };
    

      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

if (questionNumber === questionsArray.length) {
  buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats);

}
$(".modal-background").click(() => closeModal())
$(".modal-close").click(() => closeModal())
const closeModal = () => {
  $(".modal").removeClass("is-active")
}

