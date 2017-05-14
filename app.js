var express = require('express');
var multer  = require('multer');
var upload = multer();
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "public")));//use plain html as homepage
app.post("/", upload.single("file"), function (req, res) {
  var file = req.file;//save uploaded file in variable
  res.status(200).json ({size: file.size});//return info about file size
});
// custom 500 page, https://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send("500: Internal Server Error. Please select a file for upload before submitting.");
});

// custom 404 page, https://expressjs.com/en/starter/faq.html
app.use(function (req, res, next) {
  res.status(404);
  res.send('404: Page not found!');
});
app.listen(process.env.PORT || 5000);
console.log("Server running");
