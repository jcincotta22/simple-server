import express from "express";
import { readFileSync } from "fs";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
