var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var Model, release, rating;
      var json = { Model : "", release : "", rating : ""};

      $('.Model_wrapper').filter(function(){
        var data = $(this);
        Model = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.Model = Model;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your consol')
  })
})

app.listen('3001')
console.log('Magic happens on port 3001');
exports = module.exports = app;
