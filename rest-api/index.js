const express = require("express"),
  fileUpload = require("express-fileupload"),
  path = require('path');

const cors = require('cors')

const request = require("request");

const port = 8080;
const app = express();

app.use(cors())

app.use("/", express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./tmp/" }));

app.post("/upload", (req, res) => {
  console.log(res.body)
  
  path_ = `brains${Math.floor(Date.now() / 1000)}`;
  filepath = `../flask/in/${path_}.png`;

  req.files.brain.mv(filepath, err => {
    if (err) return res.status(500).send(err);
    request("http://localhost:5000/query?path=" + path_, {json:true}, (err, resp, body) => {
      if (err) {
        console.log(err);
      }
      res.sendFile(path.join(__dirname,'../flask/out/',`${body}.png`));
    });

  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
