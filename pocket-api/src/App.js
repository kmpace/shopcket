import React, { Component } from 'react';
import './App.css';
import GetPocket from 'node-getpocket';

class App extends Component {
  render() {
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
        var request_token = json.code;
        console.log(request_token);
        
    }
    
    
});



// STEP 2 
// var config = {
//     consumer_key: '60606-1dbd927f2eead72137426cd2',
//     request_token: 'd65d3b80-8269-6bff-89ad-422bad',
//     redirect_uri: 'http://github.com/kmpace'
// };


// var pocket = new GetPocket(config);

// var url = pocket.getAuthorizeURL(config);

// console.log("authorization URL = " + url);

    
    
    
    
    
    
    
    return (
      <div className="App">
        <h1>Pocket Api</h1> 
      </div>
    );
  }
}

export default App;
