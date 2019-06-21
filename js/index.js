$(document).ready(function(){
  $.getJSON("js/data.json", function(result){
    console.log(result);
        $.each(result, function(i, field){
          var name="#div"+i;
          $(name).append(field.name);
          $(name).addClass(field.type);
        });
    });
});

FastClick.attach(document.body);

var PP = "",
    VA = "",
    VI = "",
    OBJ = "",
    clicking = false,
    selected = 0,
    selectedArray =[],
    sentences=[];

function clean(){
    PP = "";
    VA = "";
    VI = "";
    OBJ = "";
    clicking = false;
    selected = 0;
    selectedArray =[];
    $('.box').removeClass('highlight');
}

$('#grid').mousedown(function(){
  clicking = true;
});

$('#grid').mouseup(function(){
  if(selected==4 && sentences.length<=4){
    var sentence = PP+" "+VA+" "+VI+" "+OBJ+".";
    if(sentences.indexOf(sentence)==-1){
      sentences.push(sentence);
      $(".success").show();
      var x = document.getElementById("correct");
      x.play();
      setTimeout(function(){$(".success").hide();}, 1300);
      clean();
      var html = "";
      for (var i =0; i < sentences.length; i++) {
        html += "<li>" + sentences[i]+ "</li>";
      }
      document.getElementById("list").innerHTML = html;
    }
    else{
      $(".alert").append("The sentence has been used previously.");
      $(".alert").show();
      setTimeout(function(){$(".alert").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; }).remove(); $(".alert").hide();}, 1300);
      clean();
    }
  }
  console.log(selectedArray.toString(), selected);
  clean();
  clicking = false;
  $('.box').removeClass('highlight');
});


//Event to start dragging
$('.box').mousedown(function() {
  clicking = true;
  if(clicking){
  // Toggle highlight to box on click
    if($(this).hasClass("PP")){
      $(this).addClass('highlight');
      selectedArray.push($(this).text());
      PP = $(this).text(); selected++;
      console.log(selectedArray.toString(), selected);
      var x = document.getElementById("do");
      x.play();
    }

    else{
      $(".alert").append("You didn't choose a Pronoun.");
      $(".alert").show();
      var x = document.getElementById("incorrect");
      x.play();
      setTimeout(function(){$(".alert").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; }).remove(); $(".alert").hide();}, 1300);
      clean();
    }
  }
});


//Event to next dragging
$('.box').mouseover(function() {
  if(clicking){
    if(!$(this).hasClass('highlight')){
      //Case Auxiliar Verb
      if(selected == 1){
        VA = $(this).text();

        //Case Has
        if (VA === "has"){
          if(PP === "He" || PP === "She"){
            $(this).addClass('highlight');
            selectedArray.push($(this).text());
            VA = $(this).text(); selected++;
            console.log(selectedArray.toString(), selected);
            var x = document.getElementById("re");
            x.play();
          }

          else{
            $(".alert").append("You chose the wrong Auxiliary Verb.");
            $(".alert").show();
            var x = document.getElementById("incorrect");
            x.play();
            setTimeout(function(){$(".alert").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; }).remove(); $(".alert").hide();}, 1300);
            clean();
          }
        }

        //Case Have
        else if(VA === "have"){
          if(PP === "I" || PP === "You" || PP === "We" || PP === "They"){
            $(this).addClass('highlight');
            selectedArray.push($(this).text());
            VA = $(this).text(); selected++;
            console.log(selectedArray.toString(), selected);
            var x = document.getElementById("re");
            x.play();
          }

          else{
            $(".alert").append("You chose the wrong Auxiliary Verb.");
            $(".alert").show();
            var x = document.getElementById("incorrect");
            x.play();
            setTimeout(function(){$(".alert").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; }).remove(); $(".alert").hide();}, 1300);
            clean();
          }
        }

        else{
          $(".alert").append("You didn't choose an Auxiliary Verb.");
          $(".alert").show();
          var x = document.getElementById("incorrect");
          x.play();
          setTimeout(function(){$(".alert").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; }).remove(); $(".alert").hide();}, 1300);
          clean();
        }
      }

      //Case Infinitive Verb
      else if(selected == 2){
        VI = $(this).text();
        console.log(VI);
        console.log(VI.startsWith("to"));

        //Case Has
        if (VI.startsWith("to") && $(this).hasClass("VI")){
          $(this).addClass('highlight');
          selectedArray.push($(this).text());
          VI = $(this).text(); selected++;
          console.log(selectedArray.toString(), selected);
          var x = document.getElementById("mi");
          x.play();
        }

        else{
          $(".alert").append("You didn't choose an Infinitive Verb.");
          $(".alert").show();
          var x = document.getElementById("incorrect");
          x.play();
          setTimeout(function(){$(".alert").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; }).remove(); $(".alert").hide();}, 1300);
          clean();
        }
      }

      //Case Object
      else if(selected == 3){
        OBJ = $(this).text();

        //Case Has
        if ($(this).hasClass("OBJ")){
          $(this).addClass('highlight');
          selectedArray.push($(this).text());
          OBJ = $(this).text(); selected++;
          console.log(selectedArray.toString(), selected);
          var x = document.getElementById("fa");
          x.play();
        }

        else{
          $(".alert").append("You didn't choose an Object.");
          $(".alert").show();
          var x = document.getElementById("incorrect");
          x.play();
          setTimeout(function(){$(".alert").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; }).remove(); $(".alert").hide();}, 1300);
          clean();
        }
      }

      else{
        clicking = false;
      }
    }
  }
});
