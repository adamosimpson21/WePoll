//Main Js in Header
//JQuery included already
/*global $*/


$(function(){
    //shows Q show route after Q edu seen
    $("#eduLinkSend").on("click", function(){
        $(".eduLink").show();
    });
    
    //shows ans after choice selector
    $(".answerDisplay").on("click", function(){
        
        $("#questionAnswered").show();
    });
    
    $("#passwordJokeButton").on("click", function(){
        $("#passwordJokeButton").hide()
        $("#passwordJoke").show();
    })
    
    var answerNumber=3
    
    $("#addAnswer").on("click", function(){
        //make more answer slots before the submit button
        answerNumber+=1;
        $("#questionSubmit").before(addAnswer)
        $("#numberOfAnswers").val(answerNumber)
        //change the variable numberOfAnswers to equal it
        function addAnswer(){
            return('<div class="row"><div class="col-lg-3"></div><div class="col-lg-6 form-group"><input class="form-control" type="text" placeholder="Answer'+answerNumber+'" name="answer['+answerNumber+']" id="answer['+answerNumber+']" required></input></div></div>')
        }
    })
    
    $('li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active'); 
});

