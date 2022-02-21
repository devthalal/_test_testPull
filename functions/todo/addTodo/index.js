const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { nanoid } = require("nanoid");
const path = require("path");

const { getDB } = require("../utils");

const port = process.env.PORT || 3000;
const DB = path.resolve("../database.json");

const app = express();
const jsonParser = bodyParser.json();

const fnName = require("./package.json");

app.use(jsonParser);
app.options("*", cors());

app.post("/addTodos", cors(), (req, res) => {
  try {
    const inmemDB = getDB();
    const newId = nanoid();
    const newItem = req.body.data;
    const newEntry = { id: newId, item: newItem };
    console.log("Request to add -", newItem);
    inmemDB.push(newEntry);
    fs.writeFileSync(DB, JSON.stringify(inmemDB));
    console.log("Updated DB:\n", inmemDB);
    console.log("\n");
    res.status(200).send(newEntry);
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: "failed" });
  }
});

app.listen(port, () => {
  console.log(`${fnName.name} started in  ${port}`);
});
