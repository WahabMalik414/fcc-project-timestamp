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

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Check for undefined, null, and empty date parameter
  if (date === undefined || date === null || !date || date == "") {
    // Return the current time in unix and utc
    const date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
    return;
  }

  // Try to parse the date parameter as a date
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
});

// listen for requests :)
var listener = app.listen(process.env.PORT || PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
