var pf = new petfinder.Client({
    apiKey: "rfKtqLNMX2qtPkyR7cDRNWJgJwJ3kxAyzoJzYFwvt1S7IB3Hnb",
    secret: "NGBUpIOll0vatwymXSITahluWEoK6W0hWyyBSvCN"
  });

//   pf.animal.search({ type: "dog", location: coordinates, gender: searchGender, good_with_children: goodWithChildren, coat: coatType, size: dogSize, good_with_cats: goodWithCats})
//   .then(function (response) {

//   })


function getMatches () {
    var matches = JSON.parse(localStorage.getItem("matches"))
    for(var i = 0; i < matches.length; i++){
        pf.animal.show(matches[i]).then(function(response){
            console.log(response)
            console.log(response.data.animal.url)
            var matchDisplay = $("<div id='match-main-display' class='container has-text-centered'><img id='match-img' src="+ response.data.animal.photos[0].small +"> <h1 id='match-name' class='title is-3 has-text-white sriracha'>"+ response.data.animal.name +"</h1><p id='match-description' class='is-size-5 has-text-white mali'><a href="+ response.data.animal.url +" target='_blank'>Click to see this pet!</a></p>");
            $('#main-body-match-history').append(matchDisplay);



        // var photos = response.data.animals.photos[0]
        // // var photosLink = "https://unpkg.com/@petfinder/petfinder-js/dist/petfinder.min.js" + photos + pf;
        
        // var card = $("<div class='card'>")
        // var cardBody = $("<div class='card-body'>")
        // console.log(cardBody)
        // var cardPhoto = $("<img src='" + photos + "'>")
        // var cardName = $("<p class='card-Name'>")
        // var cardBreed = $("<p class='cardBreed'>")
        // var cardContactLink = $("<a href=>")
                
        
        
        // cardPhoto.append(cardPhoto)
        // cardName.text(response.animals.name)
        // cardBreed.text(response.animals.breeds)
        // cardContactLink.text("Click here for contact information:" + response.animals.contact)
        // cardBody.append(cardPhoto, cardName, cardBreed, cardContactLink)
        // card.append(cardBody)
        // $(".cardHolder").prepend(card)
        })
    }
}

getMatches();

document.getElementById("clearMatchHistory").addEventListener("click", function(){
    localStorage.clear();
    $('#main-body-match-history').html("")
  });