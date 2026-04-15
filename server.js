const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/predict", (req, res) => {
    const { hours, attendance } = req.body;

    const python = spawn("py", [
        path.join(__dirname, "model.py"),
        hours,
        attendance
    ]);

    let result = "";

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.on("close", () => {
        res.json({ prediction: result.trim() });
    });

    python.stderr.on("data", (err) => {
        console.log("Error:", err.toString());
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});