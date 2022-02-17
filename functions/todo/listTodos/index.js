const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const { createFileSync } = require("../utils");

const port = process.env.PORT || 4000;
const DB = path.resolve("../database.json");

const app = express();
const jsonParser = bodyParser.json();

const fnName = require("./package.json");

app.use(jsonParser);
app.options("*", cors());

app.get("/listTodos", cors(), (req, res) => {
  try {
    createFileSync(DB);
    const data = fs.readFileSync(DB, { encoding: "utf8", flag: "r" });
    console.log("Response data:\n", JSON.parse(data || "[]"));
    console.log("\n");
    res.status(200).send(data || "[]");
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: "failed" });
  }
});

app.listen(port, () => {
  console.log(`${fnName.name} started in ${port}`);
});
