    
    var initGame = function () {
    
      $(".ttr-btn").on("click", function () {
    
        $(".panel-scale").each(function (indscale, elescale) {
    
          var scalesize = $(elescale).find(".btn-scale").length;
          var randomele = Math.floor(Math.random() * scalesize) + 1;
          var element   = $(elescale).find(".btn-scale:nth-child(" + randomele + ")");
    
          element.addClass("btn-scale-hidden");
    
        });

        $(".btn-scale-hidden").on("mouseenter mouseleave click", function() {
          showGuess( $(this) );
        });
    
      });
    
    }

    var showGuess = function (obj) {

      var btnguess = "";

      if (obj.is(":hover")) {

        var randombtn = Math.floor(Math.random() * 3) + 1;

        btnguess  = $.parseHTML("<div class='guess'>" +
                                   "<button class='btn btn-guess'> 1 </button>" +
                                   "<button class='btn btn-guess'> 2 </button>" +
                                   "<button class='btn btn-guess'> 3 </button>" +
                                "</div>");
      
        $(btnguess).find(".btn-guess:nth-child(" + randombtn + ")").addClass("btn-success");

      }
      
      obj.closest(".panel").find(".panel-guess").html( btnguess );

    }