//Install express server
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/crypto-ships'));

app.get('/', function(req,res) {

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
app.post('/addShip', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/userships.json'));
  let x = JSON.parse(rawdata);
  console.log(req.body);
  x.push(req.body);
  fs.writeFile(path.resolve('./src/assets/json/userships.json'), JSON.stringify(x), err => {
    // Checking for errors
    if (err) throw err;
    console.log("Done writing"); // Success
    let x = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/data.json')));
    x.coins -= 500;
    fs.writeFile(path.resolve('./src/assets/json/data.json'), JSON.stringify(x), err => {
      // Checking for errors
      if (err) throw err;
    });
    res.send("Success");
  });
});
app.get('/rewards', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/rewards.json'));
  res.send(JSON.parse(rawdata));
});
app.listen(process.env.PORT || 8080); 
// app.listen(3000);

