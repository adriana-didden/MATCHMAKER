$(document).ready(function () {

    $(".navbar-burger").click(function () {
  
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  
    });
  });


var pf = new petfinder.Client({
    apiKey: "rfKtqLNMX2qtPkyR7cDRNWJgJwJ3kxAyzoJzYFwvt1S7IB3Hnb",
    secret: "NGBUpIOll0vatwymXSITahluWEoK6W0hWyyBSvCN"
  });

function getMatches () {
    var matches = JSON.parse(localStorage.getItem("matches"))
    var headingAndDiv = $("<div id='display-div' class='container has-text-centered'><h2 class='title has-text-centered sriracha'>Your Adoption Matches</h2><div id='answer-columns' class='columns is-multiline'></div><button id='clearMatchHistory' class='button has-text-centered is-danger mali'>Clear Match History</button><br><div class='fb-share-button' data-href='https://adriana-didden.github.io/MATCHMAKER/' data-layout='button' data-size='small'><a target='_blank' href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fadriana-didden.github.io%2FMATCHMAKER%2F&amp;src=sdkpreparse' class='fb-xfbml-parse-ignore'>Share</a></div><br><a href='https://twitter.com/share?ref_src=twsrc%5Etfw&text=https://adriana-didden.github.io/MATCHMAKER/' class='twitter-share-button' data-show-count='false'>Tweet</a></div>");
    $("#main-body-match-history").append(headingAndDiv)


    for(var i = 0; i < matches.length; i++){
        pf.animal.show(matches[i]).then(function(response){
            var matchDisplay = $("<div id='changing' class='column changing-div is-one-quarter has-text-centered div-within-answer-div'><div class='column has-text-centered match-history'><img id='match-img' src="+ response.data.animal.photos[0].small +"> <h1 id='match-name' class='title is-3 has-text-white sriracha'>"+ response.data.animal.name +"</h1><p id='match-description' class='is-size-5 has-text-white mali'><a href="+ response.data.animal.url +" target='_blank'>Click to see this pet!</a></p></div></div>");
            $('#answer-columns').append(matchDisplay);
            if (matches.length === 1){
              $('.changing-div').removeClass('is-one-quarter').addClass('is-one-third is-offset-one-third')
            }else if (matches.length === 2){
              $('#changing').addClass('is-offset-one-quarter');
            }else if(matches.length === 3){
              $('.changing-div').removeClass('is-one-quarter').addClass('is-one-third')
            }
        })
    }
}

getMatches();

document.getElementById("clearMatchHistory").addEventListener("click", function(){
    localStorage.clear();
    $('#answer-columns').html("")
  });