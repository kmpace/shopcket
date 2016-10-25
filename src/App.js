import React, { Component } from 'react';
import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs';
import * as firebase from 'firebase';

var config = {
  
    apiKey: "AIzaSyBIv_49uR5abK9pfA4-PNWXfQS9SM_R2ho",
    authDomain: "reactfirebase-5316a.firebaseapp.com",
    databaseURL: "https://reactfirebase-5316a.firebaseio.com",
    storageBucket: "reactfirebase-5316a.appspot.com",
  
}; 

firebase.initializeApp(config);


class AddItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      company: props.company,
      productName: props.productName,
      productPrice: props.productPrice 
    };
    
    this.dbItems = firebase.database().ref().child('items');
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    
  } 
  
  handleUpdateItem(e) {
      e.preventDefault();
      
      if (this.state.text && this.state.text.trim().length !== 0) {
        this.dbItems.child(this.props.dbkey).update(this.state); 
        
      }
      
      
    }
    
render() {
  return( 
  <form onSubmit={ this.handleUpdateItem }>
      <label>I want to track
        <input placeholder={"Paste URL Here"} 
               type="text"
               value={this.state.item}
               onChange={this.newItem}
            /> 
    </label>
  </form>
  )
}
}





class App extends Component {
constructor () {
  super();
  this.state = {
    item: []
  };

this.dbItems = firebase.database().ref().child('items');
this.onNewItemChange = this.onNewItemChange.bind(this);
this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this); 
  
  
}

componentDidMount() {
  this.dbItems.on('value', dataSnaphot => {
    var items = []; 
    
    
    dataSnaphot.forEach(function(childSnapshot){
      var item = childSnapshot.val();
      item['.key'] = childSnapshot.key;
      items.push(item);
      
      
    });
    
    this.setState({ 
      items: items
      
      
    });
    
  });
}

  componentWillUnmount() {
    this.dbItems.off();
    
  }
  
  




  fetchItem = (evt) => {
    evt.preventDefault();
    console.log('Fetch Item for', this.state.item);


var url = "https://crossorigin.me/" + this.state.item;

console.log(url);

request(url, function(error, response, html){
// 	var productPrice;
// 	var productCompany;
// 	var productName;


var json = {
	company: "",
	productName:"",
	productPrice: ""
};


if(!error && response.statusCode === 200){
	var $ = cheerio.load(html);

	$.fn.ignore = function(sel) {
		return this.clone().find(sel||">*").remove().end();
	};


$('form#product h1').each(function(i, element){
	var product = $(this);
	var productName = product.ignore("span").text();
	json.productName = productName;
	

})


$('span.price span').each(function(i, element){
	var price = $(this);
	var productPrice = price.text();

	json.productPrice = productPrice;


})

    var header =  $('#header a')
    var company =  $(header).children('img').attr('alt');
    json.company = company;

    console.log(company);


fs.writeFile('productDetails.json', JSON.stringify(json, null, 4), function(err){
	console.log('Price saved to JSON file');

});

}
})
  }

newItem = (evt) => {
  this.setState({
    item: evt.target.value

  })


};


render() {
    return (
      <div>
      <h1>Price Scanner</h1>
      <form onSubmit={this.fetchItem}>
      <label>I want to track
        <input placeholder={"Paste URL Here"} 
               type="text"
               value={this.state.item}
               onChange={this.newItem}
            /> 
    </label>
  </form>
</div>



    );
  }
}

export default App;
