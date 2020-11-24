var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express()

app.get('/getTimeStories',function(req, res){

    url = 'https://time.com/';
  
    request(url,async function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        
        var This = [];
        for(var i=1;i<6;i++){
        $('body > div.homepage-wrapper > section.homepage-module.latest > ol > li:nth-child('+ i +') > article > div > h2 > a').filter(await function(html){
            var link=$(this).attr('href');
            var title=$(this).text();
            This.push({
                title:title,
                link:link
            })
        })
    }
    
        res.json(This);
  
    }
  
      
  
      res.send('Check your console!');
    })
  })

app.listen(4444,()=>{
    console.log('Server Started at http://localhost:4444')
    console.log('API is at http://localhost:4444/getTimeStories')
})