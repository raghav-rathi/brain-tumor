const express = require("express"),
  fileUpload = require("express-fileupload");

const request = require("request");

const port = 8080;
const app = express();

app.use("/", express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./tmp/" }));

app.post("/upload", (req, res) => {
  path_ = `brains${Math.floor(Date.now() / 1000)}`;
  filepath = `../flask/in/${path_}.png`;

  req.files.brain.mv(filepath, err => {
    if (err) return res.status(500).send(err);
    request("http://localhost:5000/query?path=" + path_, {json:true}, (err, res, body) => {
      if (err) {
        console.log(err);
      }
      console.log(body);
    });
  });
  res.send("okay");
});

app.listen(port, () => console.log(`listening on port ${port}`));
