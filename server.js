//Install express server
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/crypto-ships'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/crypto-ships/index.html'));
});


app.get('/userData', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/data.json'));
  res.send(JSON.parse(rawdata));
});
app.get('/userShips', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/userships.json'));
  res.send(JSON.parse(rawdata));
});
app.get('/rewards', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/rewards.json'));
  res.send(JSON.parse(rawdata));
});
app.listen(3000);

