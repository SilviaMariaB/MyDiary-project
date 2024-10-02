import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var index = 0;

let editable = {0: "readonly"};
let editSave = {0 : "Edit"};
let dict = {0 : "Your text will appear here"};

app.post("/submit", (req, res) => {
  dict[++index]=req.body["textDiary"];
  editable[index]="readonly";
  editSave[index]="Edit";
  // console.log(dict);
  // console.log(editable);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  //console.log(Object.keys(req.body)[0]);
  delete dict[Object.keys(req.body)[0]];
  delete editable[Object.keys(req.body)[0]];
  delete editSave[Object.keys(req.body)[0]];
  res.redirect("/");
});


app.post("/edit", (req, res) => {
  console.log(req.body);
  if(editable[Object.keys(req.body)[0]] === "readonly"){
    editable[Object.keys(req.body)[0]] = "";
    editSave[Object.keys(req.body)[0]] = "Save";
  } else {
    editable[Object.keys(req.body)[0]] = "readonly";
    editSave[Object.keys(req.body)[0]] = "Edit";
  }
  dict[Object.keys(req.body)[0]]=req.body["inputText"];
  //console.log(editable);
  res.redirect("/");
});


app.get("/", (req, res) => {
  res.render("index.ejs",{ dict : dict, editable: editable, editSave: editSave});
  
});


app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
