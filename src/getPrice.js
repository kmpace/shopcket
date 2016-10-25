import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs';
import { item } from './App';

request(item , function(error, response, html){
	var productPrice;
	var productCompany;
	var productName;


var json = {
	productCompany: "",
	productName:"",
	productPrice: ""
};


if(!error && response.statusCode == 200){
	var $ = cheerio.load(html);

	$.fn.ignore = function(sel) {
		return this.clone().find(sel||">*").remove().end();
	};


//Get Product Name from H&M 

$('form#product h1').each(function(i, element){
	var product = $(this);
	var productName = product.ignore("span").text();

	json.productName = productName;

})


//Get Product Price from H&M 

$('span.price span').each(function(i, element){
	var price = $(this);
	var productPrice = price.text();

	json.productPrice = productPrice;


})

//Get Company Name from H&M 

$('#logotype.children("img).("alt")').each(function(i,element){
	var company = $(this);
	var companyName  = company.text; 
})




fs.writeFile('productDetails.json', JSON.stringify(json, null, 4), function(err){
	console.log('Price saved to JSON file');

});

}
})