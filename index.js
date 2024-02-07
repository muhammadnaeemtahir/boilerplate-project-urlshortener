require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Add middleware to parse incoming request bodies as JSON
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// shorturl API endpoint

app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;
  const urlRegex = new RegExp(
    "^(http|https)://(www.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
    "i"
  );
  if (!urlRegex.test(url)) {
    return res.json({ error: "invalid url" });
  }
  const shortUrl = Math.floor(Math.random() * 1000);
  return res.json({ original_url: url, short_url: shortUrl });
});

//When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
app.get("/api/shorturl/:short_url", (req, res) => {
  const { short_url } = req.params;
  return res.redirect(short_url);
});

app.listen(port, function () {
  console.log(`https://localhost:${port}`);
});
