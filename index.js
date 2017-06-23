console.log("Scraping Started ..."); 
var page = require('webpage').create();
var fs   = require('fs'); 
var async = require("async"); 

page.onConsoleMessage = function(msg) {
    console.log(msg);
};


page.open("https://www.quirky.com/login", function(status) {
    if ( status === "success" ) {
        page.evaluate(function() {
              document.querySelector("#login-email").value = "algobasket@gmail.com";
              document.querySelector("#login-password").value = "algobasket@gmail.com";
			  document.querySelector(".form-btn").click(); 

              console.log("Login submitted!");    
        });
        window.setTimeout(function () {
          page.render('colorwheel.png');
		  page.open("https://www.quirky.com/community",function(data){
			  
			 //page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() { 
			  window.setTimeout(function(){
				  page.render('dashboard.png');
                     
                  var urls = page.evaluate(function() {
					 document.querySelector('.search-field').click();  
                     var x = document.querySelectorAll('.active-result'); // returns true if the selector is exist, otherwise false.
                     
					 count = parseInt(x.length); 
					 var k = 0;
					 var csvRows = [];
					 var csvRows2 = [];
					 [].forEach.call( x, function(e) {
						 e = e.innerHTML;
						 e = e.replace(' ','-');  
                         link = "https://www.quirky.com/community/" + e;
                         link = link.toLowerCase();						
						 csvRows.push(e);
                         csvRows2.push(link); 						 
						  
                        k++;
                        						
                      });   					 
				       return csvRows2;  					
				   }, 2000);

				  var path = 'data.csv'; 
				  
				 
		          //Async Code
				  
				  
				  var tests = urls.map(function(url){
						return function(callback){
							page.open(url, function () {
								waitFor(function() {
								   //var z = document.querySelectorAll('.cm-card-name');
								   console.log(url);   
								}, function() {
									callback();
								});
							});
						};
					});
					
					async.series(tests, function finish(output){
						console.log(output);  
						fs.write('test.txt',output);  
						phantom.exit();
					});  
				  
				  
				  
				  // Async Code End
				  
                  //fs.write(path,input,'w'); 
				  
				 // phantom.exit();     
			  },9000);
             //}); //includejQuery End
			  
		  });
          
        }, 9000);
   }
});