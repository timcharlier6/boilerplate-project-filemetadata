var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configure multer for handling file uploads
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res) {
  // Extract file information
  const fileInfo = {
    filename: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size // Size in bytes
  };

  // Respond with file information in JSON format
  res.json(fileInfo);
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
