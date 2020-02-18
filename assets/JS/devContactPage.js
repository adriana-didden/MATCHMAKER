
var devTeam = [
    {
      name: 'Adriana J Didden',
      portfolio: 'https://adriana-didden.github.io/Responsiveness-Portfolio/',
      gitHub: 'https://github.com/adriana-didden',
      link: 'https://www.linkedin.com/in/adriana-didden-487882167',
    },
    {
      name: 'Caleb Crum',
      portfolio: 'https://ccrum292.github.io/Responsive_Design/',
      gitHub: 'https://github.com/ccrum292',
      link: 'https://www.linkedin.com/in/caleb-crum-220a7319b/',
    },
    {
      name: "Julie Berryhill",
      portfolio: '',
      gitHub: '',
      link: '',
    },
    {
      name: "Monica Gonzalez Pena",
      portfolio: 'https://tantatinta.github.io/ProtoPortfolio/',
      gitHub: 'https://github.com/tantatinta',
      link: 'https://www.linkedin.com/in/mónica-gonzález-peña-0712a7175/',
    }
  ];
  
  function produceContactDisplay(){
    var contactHeading = $("<div id='display-div' class='container'><h2 class='title has-text-centered sriracha'>Developer Contact Information</h2><div id='answer-columns' class='columns'></div></div>")
    $("#contact-body").append(contactHeading);
    for (var i=0; i<devTeam.length; i++){
    var devColumns = $("<div class='column has-text-centered div-within-answer-div'><div class='column is-danger has-text-weight-bold has-text-white mali contact-info'><h3 class='has-text-weight-bold has-text-white'>"+devTeam[i].name +"</h3><form style='display: inline' target='_blank' action="+devTeam[i].portfolio +" method='get'><button class='button is-danger has-text-white contact-button'>Portfolio</button></form><form style='display: inline' target='_blank' action="+devTeam[i].gitHub +" method='get'><button class='button is-danger has-text-white contact-button'><i class='fab fa-github'></i></button></form><form style='display: inline' target='_blank' action="+devTeam[i].link +" method='get'><button class='button is-danger has-text-white contact-button'><i class='fab fa-linkedin-in'></i></button></form></div></div>")
    $(".columns").append(devColumns);
    }
  }
  produceContactDisplay();