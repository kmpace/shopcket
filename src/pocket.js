var GetPocket = require('node-getpocket');
var tagsToSearch = ["black friday"];
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var filesEE = new EventEmitter();

var productURLs = [];

filesEE.on('files_ready', function(){
    console.dir(productURLs);
    
})


var config = { "consumer_key": "60606-1dbd927f2eead72137426cd2", 
                "access_token": "9eae4927-cf22-dbd1-4bf8-bcafc4" };


var pocket = new GetPocket(config);

pocket.refreshConfig(config);

var params = {
    "detailType":"complete"

};

pocket.get(params, function(err, resp){
    if(err) throw err;


    var count =0;
    var taggedItems = [];

    var tagsToSearchLength = tagsToSearch.length;

    for(var k in resp.list) {
        var item = resp.list[k];
        var foundTagsCount = 0;
        count++;

        for (var tag in item.tags) {
            if(tagsToSearch.indexOf(tag) > -1){
                foundTagsCount++;
            }

        }

        if (foundTagsCount >= tagsToSearchLength) {
            taggedItems.push(item.given_url);
        }

    }



console.log("Number of total items = " + count);
console.log("Number of filtered with tags items = " + taggedItems.length);
console.log ("Filtered with tags items :\n"/* + JSON.stringify(taggedItems)*/);


taggedItems.forEach(function(ele, idx){
console.log(ele);

fs.writeFile('products.json', JSON.stringify(taggedItems, null, 4), function(err){

});

filesEE.emit('files_ready');

});

});