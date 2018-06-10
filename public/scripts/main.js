//Main Js in Header
//JQuery included already
/*global $*/
/*global d3*/


$(function(){
    //shows Q show route after Q edu seen
    $("#eduLinkSend").on("click", function(){
        $(".eduLink").show();
    });
    
    //shows ans after choice selector
    $(".answerDisplay").on("click", function(){
        $("#questionAnswered").show();
    });
    
    //password Joke
    $("#passwordJokeButton").on("click", function(){
        $("#passwordJokeButton").hide()
        $("#passwordJoke").show();
    })
    
    //expand Profile for Demographics 
    $("#showDemographics").on("click", function(){
        $("#showDemographics").hide()
        $("#profileDemographics").show();
    })
    
    
    //Variable number of answers on Create Question page
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
    
    
    //nav bar active class
    $('li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active'); 
    
    
    
    
    
    // get results data from results page
    var realData = [];
    $.each($('.answerList>li'), function(i,li){
        if(li.children[0].className=="resultsText"){
            var resultsText = li.children[0].textContent;
        }
        if (li.children[1].className=="resultsNumber"){
            var resultsNumber = li.children[1].textContent;
        }
        realData.push([resultsText,resultsNumber])
    })
    console.log(realData);
    
    var width = 300;
    var height = 300;
    
    
    //Question results graph
    // function makePieChart(data){
    var colorScale = d3.scaleOrdinal()
                            .domain(realData)
                            .range(d3.schemeCategory10);
                            
    var tooltip = d3.select('body')
                    .append('div')
                        .classed('tooltipResultsGraph', true);
                        
    tooltip.append('div')                                           
          .classed('label', true);
    
    d3.select('svg')
            .attr('width', width)
            .attr('height', height)
        .append('g')
            .attr('transform', `translate( ${width/2} , ${height/2})`)
            .classed('chart', true)
            
            
    var arcs = d3.pie()
                    .value(d=>d[1])(realData);
                    
    var path = d3.arc()
                    .outerRadius(width/2-10)
                    .innerRadius(0);
                    
    d3.select('.chart')
        .selectAll('.arc')
        .data(arcs)
        .enter()
        .append('path')
            .classed('arc', true)
            .attr('fill', d=>colorScale(d.data[0]))
            .attr('stroke', 'black')
            .attr('d', path)
        .on('mousemove', function(d){
            tooltip
                .style('opacity', 1)
                .style('left', d3.event.x + 15 + "px")
                .style('top', d3.event.y - 15 + "px")
                .text(d.data);
        })
        .on('mouseout', function(){
            tooltip
                .style('opacity', 0)
        })
    // }
});

