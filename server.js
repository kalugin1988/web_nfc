const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const LOG_FILE = path.join(__dirname, "cards.log");

app.use(bodyParser.json());
app.use(express.static("public"));

function writeLog(line) {
  fs.appendFileSync(LOG_FILE, line + "\n", "utf8");
}

app.post("/api/add", (req, res) => {
  const { uid, lastname, firstname, middlename, type, position, grade, letter } = req.body;
  if (!uid) return res.status(400).json({ error: "UID required" });
  const parts = [lastname, firstname, middlename, type];
  if (type === "staff") parts.push(position);
  if (type === "student") parts.push(`${grade}${letter}`);
  parts.push(uid);
  writeLog("ADD " + parts.join(";"));
  res.json({ status: "ok" });
});

app.post("/api/delete", (req, res) => {
  const { uid, lastname, firstname, middlename, type, position, grade, letter } = req.body;
  if (!uid) return res.status(400).json({ error: "UID required" });
  const parts = [lastname, firstname, middlename, type];
  if (type === "staff") parts.push(position);
  if (type === "student") parts.push(`${grade}${letter}`);
  parts.push(uid);
  writeLog("DEL " + parts.join(";"));
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});
