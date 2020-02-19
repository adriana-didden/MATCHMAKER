// Navbar Hamburger 

$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
  
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  
    });
  });


var pf = new petfinder.Client({
    apiKey: "rfKtqLNMX2qtPkyR7cDRNWJgJwJ3kxAyzoJzYFwvt1S7IB3Hnb",
    secret: "NGBUpIOll0vatwymXSITahluWEoK6W0hWyyBSvCN"
  });

//   pf.animal.search({ type: "dog", location: coordinates, gender: searchGender, good_with_children: goodWithChildren, coat: coatType, size: dogSize, good_with_cats: goodWithCats})
//   .then(function (response) {

//   })


function getMatches () {
    var matches = JSON.parse(localStorage.getItem("matches"))

    var headingAndDiv = $("<div id='display-div' class='container has-text-centered'><h2 class='title has-text-centered sriracha'>Your Adoption Matches</h2><div id='answer-columns' class='columns is-multiline'></div><button id='clearMatchHistory' class='button has-text-centered is-danger mali'>Clear Match History</button></div>");
    $("#main-body-match-history").append(headingAndDiv)


    for(var i = 0; i < matches.length; i++){
        pf.animal.show(matches[i]).then(function(response){
            // console.log(response)
            // console.log(response.data.animal.url)
            var matchDisplay = $("<div class='column is-one-quarter has-text-centered div-within-answer-div'><div class='column has-text-centered match-history'><img id='match-img' src="+ response.data.animal.photos[0].small +"> <h1 id='match-name' class='title is-3 has-text-white sriracha'>"+ response.data.animal.name +"</h1><p id='match-description' class='is-size-5 has-text-white mali'><a href="+ response.data.animal.url +" target='_blank'>Click to see this pet!</a></p></div></div>");
            $('#answer-columns').append(matchDisplay);
        })
    }
}

getMatches();

document.getElementById("clearMatchHistory").addEventListener("click", function(){
    localStorage.clear();
    $('#main-body-match-history').html("")
  });