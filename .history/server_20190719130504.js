var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://www.ozmobiles.com.au/cheap-iphone.html?limit=all';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      // console.log($('ul > li', html).length);
      var title, release, rating;
      var json = {title : "", release : "", rating : ""};

      // console.log($('big > a', html).length);
      $('.price').filter(function(){
        var data = $(this);
        // function stripslashes(data) {
        //   // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //   // +   improved by: Ates Goral (http://magnetiq.com)
        //   // +      fixed by: Mick@el
        //   // +   improved by: marrtins
        //   // +   bugfixed by: Onno Marsman
        //   // +   improved by: rezna
        //   // +   input by: Rick Waldron
        //   // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
        //   // +   input by: Brant Messenger (http://www.brantmessenger.com/)
        //   // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
        //   // *     example 1: stripslashes('Kevin\'s code');
        //   // *     returns 1: "Kevin's code"
        //   // *     example 2: stripslashes('Kevin\\\'s code');
        //   // *     returns 2: "Kevin\'s code"
        //   return (data + '').replace(/\\(.?)/g, function (s, n1) {
        //     switch (n1) {
        //     case '\\':
        //       return '\\';
        //     case '0':
        //       return '\u0000';
        //     case '':
        //       return '';
        //     default:
        //       return n1;
        //     }
        //   });
        // }
        // console.log("data111", data)
        // title = data.children().first().text().trim();
        Price = data.children().text().trim();        
        // release = data.children().last().children().last().text().trim();
        // console.log("data123", stripslashes(data) ) 
        console.log("Price", Price)
        // json.title = title;
        // json.release = release;
      })

      $('.item-title').filter(function(){
        var data = $(this);
        title = data.text().trim();
         console.log("title", title)

        // json.rating = rating;
      })
    }
    console.log("json", json)

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('3001')
console.log('Magic happens on port 3001');
exports = module.exports = app;
