import request from 'request';
import cheerio form 'cheerio';
import fs from 'fs';


request(url , function(error, response, html){
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
		return this.clone().find(sel||">*".remove().end()
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