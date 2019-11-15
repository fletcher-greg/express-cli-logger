const express = require("express");
const { spawn } = require("child_process");

const app = express();
const ls = spawn("ls", ["-la"]);

app.use((req, res, next) => {
  const start = Date.now();
  const resRes = res;
  console.log(`--> ${req.method} ${req.originalUrl}`);
  next();

  res.on("finish", () =>
    console.log(
      `<-- ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() -
        start}ms bytes: ${req.connection.bytesWritten}`
    )
  );
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => console.log("on port 3000"));
