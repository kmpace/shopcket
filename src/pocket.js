var GetPocket = require('node-getpocket');


var config = {
    consumer_key: '60606-1dbd927f2eead72137426cd2',
    redirect_uri: 'https://github.com/kmpace',
};


var pocket = new GetPocket(config);



var params = {
  redirect_uri: config.redirect_uri  
    
};

pocket.getRequestToken(params, function(err , resp, body){
    if (err) {
        console.log('Oops; getTokenRequest failed: ' + err);
        
    } else {
        var json = JSON.parse(body);
       var  request_token = json.code;
        console.log(request_token);
        
    }
    
});


// STEP 2 
// var config = {
//     consumer_key: '60606-1dbd927f2eead72137426cd2',
//     request_token: request_token,
//     redirect_uri: 'http://github.com/kmpace'
// };


// var pocket = new GetPocket(config);

// var url = pocket.getAuthorizeURL(config);

// console.log("authorization URL = " + url);

// // //STEP 3 

var config = {
    consumer_key: '60564-21d89103dc036127f46122c8',
    request_token: '30fd16ab-87ac-f6f0-eb1a-f9e8a7',
    redirect_uri: 'http://localhost:8080/redirect'
};

var params = {
    request_token: '30fd16ab-87ac-f6f0-eb1a-f9e8a7'
    
};

var pocket = new GetPocket(config);

pocket.getAccessToken(params, function(err ,  resp , body){
    if (err) {
        console.log('Oops; getTokenReuest failed: ' + err)
        
    } else {
        var json = JSON.parse(body);
        var access_token = json.access_token;
        console.log("acess_token = " + access_token);
        
        
    }
    
    
    
    
    
});


// var tagsToSearch = ["black friday"]
// var params = {
//     "detailType":"complete"
    
    
// };


// pocket.get(params, function(err, resp) {
//     if(err) throw err;
    
//     var count = 0;
//     var taggedItems = [];
//     var tagsToSearchLength = tagsToSearch.length;
    
//     for (var k in resp.list) {
//         var item = resp.list[k];
//         var foundTagsCount = 0;
//         count++;
        
//         for (var tag in item.tags){
//             if(tagsToSearch.indexOf(tag) > -1) {
//                 foundTagsCount++; 
                
//             }
            
//             if (foundTagsCount >= tagsToSearchLength) {
//                 taggedItems.push(item.given_url);
                
                
//             }
//         }
        
//         console.log("Number of total items = " + count);
//         console.log("Number of filtered items with tag items =" + taggedItems.length);
//         console.log("Filtered with tag items: \n"/* + JSON.stringify(taggedItems)*/);
//         taggedItems.forEach(function(ele, idx){
//             console.log(ele);
//         })
        
        
//     }
    
    
    
    
    
    
// })