const fs = require("fs");
const path = require("path");

const DB = path.resolve("../database.json");

function createFileSync(filePath) {
  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch {
    console.log("stat");
  }
  if (stats && stats.isFile()) return;

  const dir = path.dirname(filePath);
  try {
    if (!fs.statSync(dir).isDirectory()) {
      // parent is not a directory
      // This is just to cause an internal ENOENT error to be thrown
      fs.readdirSync(dir);
    }
  } catch (err) {
    // If the stat call above failed because the directory doesn't exist, create it
    if (err && err.code === "ENOENT") fs.mkdirSync(dir);
    else throw err;
  }

  fs.writeFileSync(filePath, "");
}

const getDB = () => {
  try {
    const arr = [];
    createFileSync(DB); // create the file if not present
    const data = fs.readFileSync(DB, { encoding: "utf8", flag: "r" });
    if (data !== "") {
      arr.push(...JSON.parse(data));
    }
    return arr;
  } catch (err) {
    console.log("Error initializing DB", err);
    return [];
  }
};
module.exports = { createFileSync, getDB };
