const express = require("express");

const app = express();

const book = require("./src/routes/book");

app.use(express.json());
app.use("/book", book);

app.listen(3001, (err) => {
  if (err) throw err;
  console.log("> Ready on http://localhost:3001");
});