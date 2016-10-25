import React, { Component } from 'react';
import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs';

class App extends Component {

state = {
    item: ''

  };
  
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
	productCompany: "",
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
