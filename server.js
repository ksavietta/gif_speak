require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express()

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/search', function (req, res) {
  var term = req.query.q;
  var gifUrl;
  axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: term
      }
    })
    .then(function (response) {
      var result = response.data.data[0];
      gifUrl = result.images['original'].url;
      console.log('gifUrl', gifUrl);
      res.send(gifUrl);
    })
    .catch(function (error) {
      console.log(error);
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
