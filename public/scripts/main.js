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
    
    //currently focused Answer
    // $(".answerDisplay").on("click", function(){
    //     alert("Are you sure your answer is " + $(this).text());
    // })
});

