   var notes  = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
   var intmaj = [2, 2, 1, 2, 2, 2, 1];
   var intmin = [2, 1, 2, 2, 1, 2, 2];
   var intnat = [];

   for (var i = 0; i < 12; i++) {
      intnat.push(1);
   }

   var getScale = function(note, interval) {

      var scale = [];
      var rootn = notes.indexOf(note);

      for (var i = 0; i < interval.length; i++) {
         rootn    = (rootn > 12) ? 1 : (rootn > 11) ? 0 : rootn;
         scale[i] = notes[rootn];
         rootn    = rootn + interval[i];
      }

      return scale;

   }

   var getPentatonic = function(scale, arrp) {
      for (var i = 0; i < arrp.length; i++) {
        scale.splice(arrp[i], 1);
      }
      return scale;
   }

   var getField = function(note) {
      
      var scales = {
        major:  getScale(note, intmaj),
        minor:  getScale(note, intmin),
        pmajor: getPentatonic(getScale(note, intmaj), [3, 5]),
        pminor: getPentatonic(getScale(note, intmin), [1, 4])
      }

      return scales;

   }   
     

  var createPanel = function(obj) {

    var panel = "<input type='hidden' id='root' value='" + obj.major[0] + "'>"         +
                "<h2>" + obj.major[0] + " Scales </h2>"                                +
                "<p>"                                                                  +
                  "<a href='#' class='btn btn-info btn-lg ttr-btn'>"                   +
                    "<span class='glyphicon glyphicon-music'></span> Try to Remember!" +
                  "</a>"                                                               +
                "</p>";    

    for (var scale in obj) {

      var pscale   = obj[scale];

      panel += "<div class='panel panel-default'>" +
                  "<div class='panel-heading'>"    +
                    "<h1 class='panel-title'>"     +
                        descScale(scale)           +
                    "</h1>"                        +
                  "</div>"                         +
                  "<div class='panel-body panel-scale'>";
                    for (var i = 0; i < pscale.length; i++) {
                      panel += "<button class='btn btn-info btn-scale'> " + pscale[i] + " </button>";
                    }
        panel +=  "<div class='neck' id='neck-" + scale + "'> " +
                    createGuitarNeck(pscale) + 
                  "</div>" +
                  "</div>" +
                "</div>";
    }

    return panel;
  }

  
  var descScale = function(scalen) {
      switch (scalen) {
        case "major":
          return "Major Scale";
          break;
        case "minor":
          return "Minor Scale";
          break;
        case "pmajor":
          return "Major Pentatonic Scale";
          break;
        case "pminor":
          return "Minor Pentatonic Scale";
          break;
      }
      return false;
   }

  var btns = document.getElementsByClassName("note");

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      createView(getField(this.id));
      document.getElementById("btn-navbar-toggle").click();
    });
  }  

  var createGuitarNeck = function(scale) {
    
    var strings = {
      1: getScale("E", intnat),
      2: getScale("B", intnat),
      3: getScale("G", intnat),
      4: getScale("D", intnat),
      5: getScale("A", intnat),
      6: getScale("E", intnat)
    }    

    var neck = "";

    for (var nstring in strings) {
            
      var string = strings[nstring];

      neck += "<div class='row row-string'>";

      for (var i = 0; i < string.length; i++) {
        
        neck += i == 0 ? string[i] : "";

        if (scale.indexOf(string[i]) >= 0 ){
          neck += "<div class='scale in-scale'> " + string[i] + " </div>";
        } else {
          neck += "<div class='scale out-scale'> " + string[i] + " </div>";
        }

      }

      neck += "</div>";
    }

    return neck;

  }

  // Jquery
  // Game Init
  
  var initGame = function() {

    $(".ttr-btn").on("click", function(){    
      
      $(".panel-scale").each(function(indscale, elescale) {
        
        var scalesize = $(elescale).find(".btn-scale").length;
        var randomele = Math.floor(Math.random() * scalesize) + 1;

        $(elescale).find(".btn-scale:nth-child(" + randomele + ")").addClass("btn-scale-hidden");

      });

    });

  }  
  
  var createView = function(root) {
    
    $("#result").slideUp("fast", function(){
      $("#result").html("");
      $("#result").html(createPanel(root));

      initGame();

      $(".panel-title").on("click", function(){
        $(this).parent().parent().find(".neck").slideToggle();
      });      

    });
    
    $("#result").slideDown("fast");


  }
