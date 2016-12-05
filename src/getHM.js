var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://www.hm.com/us/product/49719?article=49719-A';


request(url , function(error, response, html) {
       var productPrice;
       var productName;
       var company;
       
       var json = {
            productName: "",
            productPrice: "",
            company: ""
        };
    
    
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html); 
        
       $.fn.ignore = function(sel){
      return this.clone().find(sel||">*").remove().end();
      };
        
        
        
        $('form#product h1').each(function(i, element){
            
            var product = $(this);
            var productName = product.ignore("span").text();
            
            json.productName = productName;
            console.log(productName.trim());
            
            
            // console.log($(this).ignore("span").text());
            
            
            
        })
        
        $('span.price span').each(function(i, element){
            var price = $(this);
            var productPrice = price.text();
            
            json.productPrice = productPrice;
            console.log(productPrice);
        
        })
        
    
    var header =  $('#header a')
    var company =  $(header).children('img').attr('alt');
    json.company = company;

    console.log(company);
        
        
        fs.writeFile('productPrice.json', JSON.stringify(json, null, 4), function(err){
            console.log('Price saved in price.json file')
            
        });
        
        
   
   fs.readFile('productPrice.json', function(err, data){
       if (err) throw err;
       var obj = JSON.parse(data);
       
       if (obj.productPrice != productPrice) {
           console.log('Price has changed.');
           
  
           
           
           
           fs.writeFile('productPrice.json', JSON.stringify(json, null, 4), function(err){
              console.log('Price saved in Product Price.json file'); 
               
               
           });
           
           
           
       }
       
       
       
       
       
   });
   
    }); 