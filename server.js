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
app.get('/userListings', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/userListings.json'));
  res.send(JSON.parse(rawdata));
});
app.post('/cancelListing', function (req, res) {
  cancelListing(req.body.name);
  res.send({});
});
app.post('/addShip', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/userships.json'));
  let x = JSON.parse(rawdata);
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
    res.send({});
  });
});
app.get('/rewards', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/rewards.json'));
  res.send(JSON.parse(rawdata));
});
app.post('/addRewards', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/rewards.json'));
  let x = JSON.parse(rawdata);
  if (!x[req.body.name]) {
    x[req.body.name] = [];
  }
  x[req.body.name].push(req.body.value);
  deductRum(req.body.name);
  fs.writeFile(path.resolve('./src/assets/json/rewards.json'), JSON.stringify(x), err => {
    if (err) throw err;
    res.send({});
  });
});
app.post('/claimRewards', function (req, res) {
  claimRewards(req.body.name);
  res.send({});

});
app.post('/addRum', function (req, res) {
  addRum(req.body.name);
  res.send({});

});
app.post('/sellShip', function (req, res) {
  sellShip(req.body.price,req.body.ship);
  claimRewards(req.body.ship.name);
  res.send({});

});
app.get('/getShipPrice', function (req, res) {
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/sellPrices.json'));
  res.send(rawdata);

});
function claimRewards(name){
  let rawdata = fs.readFileSync(path.resolve('./src/assets/json/rewards.json'));
  let x = JSON.parse(rawdata);
  let totalCoins = 0;
  x[name].forEach(element => {
    totalCoins += element.coins;
  });
  x[name] = [];
  fs.writeFile(path.resolve('./src/assets/json/rewards.json'), JSON.stringify(x), err => {
    if (err) throw err;
  });
  let y = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/data.json')));
  y.coins += totalCoins;
  fs.writeFile(path.resolve('./src/assets/json/data.json'), JSON.stringify(y), err => {
    if (err) throw err;
  });
}
function sellShip(price,ship){
  let x = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/sellPrices.json')));
  let y = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/userListings.json')));
  let z = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/userships.json')));
  x[ship.name] = price;
  y.push(ship);
  z = z.filter(elem=>{return elem.name != ship.name});
  fs.writeFile(path.resolve('./src/assets/json/sellPrices.json'), JSON.stringify(x), err => {
    if (err) throw err;
  });fs.writeFile(path.resolve('./src/assets/json/userListings.json'), JSON.stringify(y), err => {
    if (err) throw err;
  });fs.writeFile(path.resolve('./src/assets/json/userships.json'), JSON.stringify(z), err => {
    if (err) throw err;
  });
}
function cancelListing(name) {
  let y = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/userListings.json')));
  let z = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/userships.json')));
  let x = {};
  let i = null;
  y.forEach((elem, index) => {
    if (elem.name == name) {
      x = elem;
      i = index;
    }
  })
  y.splice(i,1);
  fs.writeFile(path.resolve('./src/assets/json/userListings.json'), JSON.stringify(y), err => {
    if (err) throw err;
  });
  z.push(x);
  fs.writeFile(path.resolve('./src/assets/json/userships.json'), JSON.stringify(z), err => {
    if (err) throw err;
  });
}
function addRum(name) {
  if (name) {
    let y = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/userships.json')));
    y.forEach(elem => {
      if (elem.name == name) {
        elem.stats.rum = 5;
        let y = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/data.json')));
        y.coins -= 3;
        fs.writeFile(path.resolve('./src/assets/json/data.json'), JSON.stringify(y), err => {
          if (err) throw err;
        });
      }
    })
    fs.writeFile(path.resolve('./src/assets/json/userships.json'), JSON.stringify(y), err => {
      if (err) throw err;
    });
  }
}
function deductRum(name) {
  if (name) {
    let y = JSON.parse(fs.readFileSync(path.resolve('./src/assets/json/userShips.json')));
    y.forEach(elem => {
      if (elem.name == name) {
        elem.stats.rum--;
      }
    })
    fs.writeFile(path.resolve('./src/assets/json/userShips.json'), JSON.stringify(y), err => {
      if (err) throw err;
    });
  }
}
app.listen(process.env.PORT || 8080); 
// app.listen(3000);

