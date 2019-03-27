const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  var formular = "<form action='/' method='get'>";
  formular += "<input type ='text' name = 'amount' placeholder = 'Amount' />";   !!!!!!!!
  formular += "<select name='crypto'>";
  formular += "<option value='BTC'>Bitcoin</option>";
  formular += "<option value='LTC'>Litcoin</option>";
  formular += "<option value='XMR'>Monero</option>";
  formular += "</select>";
  formular += "<select name='flat'>";
  formular += "<option value='USD'>USD</option>";
  formular += "<option value='EUR'>EUR</option>";
  formular += "<option value='CZK'>CZK</option>";
  formular += "</select>";
  formular += "<button type='submit' name='submit'>Převod</button>";
  formular += "</form>";
  res.send(formular);
});

app.post("/", function(req, res) {
  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var amount = req.body.amount;
  var crypto = req.body.crypto;
  var flat = req.body.flat;

  url += crypto;
  url += flat;

  var options = {
    url = "https://apiv2.bitcoinaverage.com/convert/global/";
    method: "GET",
    qs: {
      from: crypto,
      amount: amount
    }
  };

  request(url, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    res.send(
      "<h1> Aktuální kurz" + amount + " " + crypto + "/" + flat + "je" + price + "</h1>"
    );
  });

  console.log(req.body.crypto);
  console.log(req.body.flat);
});

app.listen(8080, function() {
  console.log("Server blablka");
});
