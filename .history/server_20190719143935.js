var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {
  // Let's scrape Anchorman 2
  url = 'https://www.ozmobiles.com.au/cheap-iphone.html?limit=all';

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      // console.log($('ul > li', html).length);
      // var title, release, rating;
      // var json = { title: "", release: "", rating: "" };
      const list = [];
      // console.log($('big > a', html).length);
      $('.price').filter(function (val, index) {
        var data = $(this);
        // console.log("data111", data)
        // title = data.children().first().text().trim();
        Price = data.text().trim();
        // release = data.children().last().children().last().text().trim();
        // console.log("data123", stripslashes(data) ) 
        console.log("Price", Price)
        list[index]= { Price };
        // json.title = title;
        // json.release = release;
      })

      $('.item-title').filter(function (val, index) {
        var data = $(this);
        title = data.text().trim();
        console.log("title", title)
        list[index].title = title;
        // json.rating = rating;
      })
      console.log("json", list);
      fs.writeFile('output.json', JSON.stringify(list), function (err) {
        console.log('File successfully written! - Check your project directory for the output.json file');
      })
    }
    res.send('Check your console!')
  })
})

app.listen('3001')
console.log('Magic happens on port 3001');
exports = module.exports = app;
