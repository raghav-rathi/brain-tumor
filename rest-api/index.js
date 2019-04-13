const express = require("express"),
  fileUpload = require("express-fileupload");

const port = 8080;
const app = express();

app.use("/", express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./tmp/" }));

app.post("/upload", (req, res) => {
  req.files.brain.mv("../flask/brains2.png", err => {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
