        
    var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var intmaj = [2, 2, 1, 2, 2, 2, 1];
    var intmin = [2, 1, 2, 2, 1, 2, 2];
    var intnat = [];
    
    for (var i = 0; i <= 12; i++) {
      intnat.push(1);
    }
    
    var getScale = function (note, interval) {
    
      var scale = [];
      var rootn = notes.indexOf(note);
    
      for (var i = 0; i < interval.length; i++) {
        rootn = (rootn > 12) ? 1 : (rootn > 11) ? 0 : rootn;
        scale[i] = notes[rootn];
        rootn = rootn + interval[i];
      }
    
      return scale;
    
    }
    
    var getPentatonic = function (scale, arrp) {
      for (var i = 0; i < arrp.length; i++) {
        scale.splice(arrp[i], 1);
      }
      return scale;
    }
    
    var getField = function (note) {
    
      var scales = {
        major: getScale(note, intmaj),
        minor: getScale(note, intmin),
        pmajor: getPentatonic(getScale(note, intmaj), [3, 5]),
        pminor: getPentatonic(getScale(note, intmin), [1, 4])
      }
    
      return scales;
    
    }
    

    var createPanel = function (obj) {
    
      $(".pattern-title:first").clone().appendTo("#result");
      $(".pattern-title:last h2").html(obj.major[0] + " Scales");
      $(".pattern-title:last").css("display", "block");
      
      for (var scale in obj) {

        $(".pattern-body:first").clone().appendTo("#result");
    
        var pscale = obj[scale];
        var btnscale;
        var btnclass;
    
        $(".pattern-body:last .panel .panel-title").html( descScale(scale) );

        for (var i = 0; i < pscale.length; i++) {
          
          if ((scale == "major" || scale == "minor") && (i == 0 || i == 2 || i == 4)) {
            btnclass = "btn-danger";
          } else {
            btnclass = "btn-info";
          }

          btnscale = $("<button/>", { text: pscale[i], class: "btn " + btnclass + " btn-scale" });
          
          $(".pattern-body:last .panel .panel-scale .panel-btn-scale").append( btnscale ).end();

        }        

        $(".pattern-body:last .panel .panel-scale .neck-guitar").append( createGuitarNeck( pscale ) );

        $(".pattern-body:last").css("display", "block");

      }
    
    }
    
    
    var descScale = function (scalen) {
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
      btns[i].addEventListener("click", function () {
        createView(getField(this.id));
        document.getElementById("btn-navbar-toggle").click();
      });
    }
    
    var createGuitarNeck = function (scale) {
    
      var strings = {
        1: getScale("E", intnat),
        2: getScale("B", intnat),
        3: getScale("G", intnat),
        4: getScale("D", intnat),
        5: getScale("A", intnat),
        6: getScale("E", intnat)
      }
    
      var neck;
      var fret;  
    
      neck = $("<div/>", { class: "row row-string" });

      for (var nstring in strings) {    
    
        var string = strings[nstring];
        
        for (var i = 1; i < string.length; i++) {
    
          if (nstring == 1) {

            $(neck).append( $("<div/>", { text: i, class: "scale num-scale fret fret-" + i }) );

          }
          
        }
        

        $(neck).append( $("<div/>", { class: "row row-string" }) );
    
        for (var i = 0; i < string.length; i++) {
    
          if (i > 0) {        
    
            if (string[i] == scale[0]) {

              $(neck).append( $("<div/>", { text: string[i], class: "scale in-scale-root fret fret-" + i }) );

            } else {
              
              if (scale.indexOf(string[i]) >= 0) {

                $(neck).append( $("<div/>", { text: string[i], class: "scale in-scale fret fret-" + i }) );

              } else {

                $(neck).append( $("<div/>", { text: string[i], class: "scale out-scale fret fret-" + i }) );

              }
    
            }
            
          }
    
        }
    
        $(neck).append( $("<br/>") );
        
      }

      return neck;
    
    }
        
    
    var setFilter = function () {
    
      $(".neck-filter button").on("click", function () {
        
        var action   = $(this).val();
        var elements = $(this).parents(".panel-scale").find(".fret");
    
        elements.hide();
        
        switch (action) {
          case "0":
            elements.show();
            break;
          case "1":
            elements.closest(".fret-1, .fret-2, .fret-3, .fret-4").show();
            break;
          case "2":
            elements.closest(".fret-5, .fret-6, .fret-7, .fret-8").show();
            break;
          case "3":
            elements.closest(".fret-9, .fret-10, .fret-11, .fret-12").show();
            break;
        }
    
      });
    
    }
    
    var synth = new Tone.Synth().toMaster();

    var createView = function (root) {
    
      $("#result").slideUp("fast", function () {
        
        $("#result").html("");
        createPanel(root);
        setFilter();
        initGame();
    
        $(".click-neck").on("click", function () {
          $(this).parent().parent().find(".neck").slideToggle();
        });
        
        $(".btn-scale").on("click", function() {
          synth.triggerAttackRelease( $(this).html().trim() + "4", "8n");
        });
    
      });
    
      $("#result").slideDown("fast");
    
    }