const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const { getDB } = require("../utils");
const DB = path.resolve("../database.json");

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.options("*", cors());

const fnName = require("./package.json");

app.delete("/removeTodo", cors(), (req, res) => {
  try {
    const inmemDB = getDB();
    const id = req.body.data.id;
    console.log("Request to remove item -", id);
    console.log("\n");
    console.log("Data in DB", inmemDB);
    console.log("\n");
    const index = inmemDB.findIndex((obj) => {
      return obj.id == id;
    });
    if (index !== -1) {
      inmemDB.splice(index, 1);
      fs.writeFileSync(DB, JSON.stringify(inmemDB));
    }
    console.log("Updated DB:\n", inmemDB);
    res.status(200).send({ status: "OK" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: "failed" });
  }
});

app.listen(port, () => {
  console.log(`${fnName.name} started in ${port}`);
});
