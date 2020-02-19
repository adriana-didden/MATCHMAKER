var pf = new petfinder.Client({
  apiKey: "yFhWUo2yQ3zi2yQgCFJjR8j5ik1tlTX7iZsSZJMQvU55hD3z44",
  secret: "KhkHM7EJA6UjUWgqvL6e3nETORjUeXN0gOAx92tN"
});

//Geolocation functions

var coordinates;

$(window).on("load", function () {
  if (!localStorage.getItem("getLocation")) {
    getLocation();
    localStorage.setItem("getLocation", "true");
  }else{
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
  var mainEl = $("<div class='column is-half has-text-centered'><div class='container has-text-centered' id='title-page-div'><h1 id='welcome-to-matchmaker' class='title is-1 has-text-white sriracha'>Welcome to MATCHMAKER</h1><hr/><p id='title-page-subtext' class='subtitle has-text-white mali'>Do you long-for companionship? Find it here at MATCHMAKER, where we connect you with your future soulmate based on our 5 question quiz. Press the START button below to begin your odyssey of love.</p><button class='button is-danger is-size-2 has-text-weight-bold sriracha' id='start-button'>START</button></div></div>")
  $('.columns').prepend(mainEl);
  $(document).on('click', '#start-button', displayQuestionOneAtATime);
}

displayTitlePage();

// Questions 

var questionsArray = [
  {
    title: "What fits you best:",
    choices: ["Man looking for a woman", "Woman looking for a man", "Man looking for a man", "Woman looking for a woman"],
    
  },
  {
    title: "What are your thoughts on children?",
    choices: ["Want someday", "Don't want", "Have and want more", "Have and don't want more"],
    
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
    choices: ["Billie Eilish - bad guy", "Lil Bow Wow - Bow Wow (That's My Name) ft. Snoop Dogg", "Alicia Keys - Underdog", "Baha Men - Who Let The Dogs Out "],

  }
];



// question display functions

var questionNumber = 0;

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

var answers = [];
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

  //["Man looking for a woman", "Woman looking for a man", "Man looking for a man", "Woman looking for a woman"],
  if (answer1 === "Man looking for a woman" || answer1 === "Woman looking for a woman") {
    searchGender = "female";
  } else { searchGender = "male" }

  //["Want someday", "Don't want", "Have and want more", "Have and don't want more"]
  if (answer2 === "Don't want") {
    goodWithChildren = false;
  } else { goodWithChildren = true }


  // "What is your preferred style?",choices: [short, medium, long, wire,"Preppy" medium, "Hipster" wire, "Casual" short hair, "Trendy" long ]
  if (answer3 === "Preppy") {
    coatType = "medium";
  }
  // else if (answer3 === "Hipster") {
  //   coatType = "wire";
  // } 
  else if (answer3 === "Casual") {
    coatType = "short";
  } else if (answer3 === "Trendy") {
    coatType = "long";
  }

  //["Slender", "Big and beautiful" xlarge, "About average" large, "Athletic and toned" medium: small, medium, large, xlarge]
  if (answer4 === "Slender") {
    dogSize = "small";
  } else if (answer4 === "Big and beautiful") {
    dogSize = "xlarge";
  } else if (answer4 === "About average") {
    dogSize = "large";
  } else if (answer4 === "Athletic and toned") {
    dogSize = "medium";
  }

  //["Billie Eilish - bad guy", "Lil Bow Wow - Bow Wow (That's My Name) ft. Snoop Dogg", "Alicia Keys - Underdog", "Baha Men - Who Let The Dogs Out "]
  if (answer5 === "Billie Eilish - bad guy") {
    goodWithCats = true;
  } else {
    goodWithCats = false;
  }

  if (questionNumber === questionsArray.length) {
    buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats);
  }
  
}


function buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats) {
  console.log(coordinates)
  var params = { type: "dog", location:coordinates, gender: searchGender, good_with_children: goodWithChildren, coat: coatType, size: dogSize, good_with_cats: goodWithCats}
  console.log(params)
  if(coordinates){
    params.location = coordinates
    console.log(params.location)
    params.distance = 100
  }
  
  pf.animal.search(params)

    .then(function (response) {
      var responseArr = response.data;
      var acceptedDogIds = JSON.parse(localStorage.getItem("matches") || "[]");

      // console.log(response.data);
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
        var description = response.data.animals[i].description
        if(!description) description ="";

        $('#match-main-display').remove();
        var matchDisplay = $("<div id='match-main-display' class='container has-text-centered'><img id='match-img' src=" + response.data.animals[i].photos[0].medium + "> <h1 id='match-name' class='title is-3 has-text-white sriracha'>" + response.data.animals[i].name + "</h1><h2 id='match-dog-breed' class='subtitle is-4 has-text-white sriracha'>" + dogBreed() + "</h2><p id='match-description' class='is-size-5 has-text-white mali'>" + description + "</p><button id='accept-match' class='button is-danger is-size-2 has-text-weight-bold sriracha'>Accept Match!!!</button><br/><button id='decline-match' class='button is-dark is-size-4 sriracha'>Decline Match</button></div>");
        $('#main-body').append(matchDisplay);

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
      $(document).on('click', '#decline-match', function () { getGif("dog+sad")});
      $(document).on('click', '#accept-match', function () { getGif("dog+happy")})

      function getGif(term){
        $('#accept-match').remove();
        $('#decline-match').remove();
        $('#match-main-display').append($("<h1 id='congrats' class='title is-1 has-text-white sriracha'>Your Match has been Saved</h1>"));
        setTimeout(displayMatch, 2000);

        $(".modal-content").html("")
        
        //RUN GIPHY

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LLdCkhWcP8YLeTTJPLSVyeqLFaiZlHiB&limit=10&rating=g&q="+term+"&SameSite=Secure";

        $(".modal").addClass("is-active");
        console.log(term , queryURL)
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (giphy) {
          var arrGif = giphy.data
          var picked = Math.floor(Math.random() * arrGif.length)
          console.log(picked, arrGif.length)
          var theGIF = $("<img>")
          theGIF.attr("src", arrGif[picked].images.original.url)
          $(".modal-content").append(theGIF);
          console.log(giphy)

        });
        var modal = document.getElementsByClassName("modal is-active");

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.removeClass("is-active")
          }
        };
        $(".modal-background").click(() => closeModal())
        $(".modal-close").click(() => closeModal())
        const closeModal = () => {
          $(".modal").removeClass("is-active")
        }

      }
    })
    .catch(function (error) {
      console.log(error);
    });



}

if (questionNumber === questionsArray.length) {
  buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats);

}

// Match History


function renderMatchHistory(event) {
  event.preventDefault();
  let matchStorage = JSON.parse(localStorage.getItem("matchStorage"))

  if (matchStorage) {
    matchStorage.sort(function (acceptedDogIds) {

      // ADD HERE
    })
    for (var i = 0; i < matchStorage.length; i++) {
      var listIds = document.createElement('')
    }
  }

}

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
// var pf = new petfinder.Client({
//   apiKey: "rfKtqLNMX2qtPkyR7cDRNWJgJwJ3kxAyzoJzYFwvt1S7IB3Hnb",
//   secret: "NGBUpIOll0vatwymXSITahluWEoK6W0hWyyBSvCN"
// });


// function buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats) {

//   pf.animal.search({ type: "dog", location: coordinates, gender: searchGender, good_with_children: goodWithChildren, coat: coatType, size: dogSize, good_with_cats: goodWithCats})
//   .then(function (response) {
//       var responseArr = response.data;
//       // for (var i = 0; i < responseArr.length; i++)
//       // console.log(response.data.animals[0].contact);
//       //console.log(response.data)
//       console.log(response.data);
//       var i = 0;
//       function displayMatch(){}

// $("#accept").on("click", function (event) {
//     event.preventDefault()

//     var dogId = response.data.animals[i].id
//     var queryURL = "https://unpkg.com/@petfinder/petfinder-js/dist/petfinder.min.js" + dogId + pf;
//     console.log(queryURL)
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(queryURL);
//         console.log(response);

//     })
// })
