// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const PORT = 3000;
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
app.get("/api/", (req, res) => {
  const currentUnixStamp = Date.now();
  const utcString = new Date(Date.now()).toUTCString();
  res.json({
    unix: currentUnixStamp,
    utc: utcString,
  });
});
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  console.log(new Date(date));
  if (date) {
    let inputDate =
      date.includes("-") || date.includes(" ") || date.includes(",")
        ? new Date(Date.parse(date))
        : new Date(parseInt(date));
    if (!isNaN(inputDate)) {
      // Valid input date
      const unixStamp = inputDate.getTime();
      const utcStamp = inputDate.toUTCString();

      // Send the JSON response
      res.status(200).json({
        unix: unixStamp,
        utc: utcStamp,
      });
    } else {
      res.status(404).json({ error: "Invalid Date" });
    }
  } else {
    const currentUnixStamp = Date.now();
    const utcString = new Date(Date.now()).toUTCString();

    res.json({
      unix: currentUnixStamp,
      utc: utcString,
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
