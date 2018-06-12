var faker =  require("faker");

//makes an Array of fake usernames based on param
var makeFakerNames = function(number){
    var fakerNames = [];
    for(var i=0;i<number;i++){
        fakerNames.push(faker.internet.userName());
    }
    return fakerNames;
}  

module.exports = makeFakerNames;