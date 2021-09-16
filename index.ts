import express from "express";
import { readFileSync } from "fs";
import cors from "cors";

const EVENTS_MAP: { [key: string]: any } = {};

const app = express();
const PORT = 8080;

const buildCache = () => {
  const events = JSON.parse(readFileSync("./data/events.json", "utf8"));
  events.forEach((e: any) => {
    EVENTS_MAP[e.id] = e;
  });
};

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/events/:id", (req, res) => {
  res.send(EVENTS_MAP[req.params["id"]]);
});

app.get("/events/:id/game/:game_id", (req, res) => {
  const id = req.params["id"];
  const game = req.params["game_id"];
  EVENTS_MAP[id].games.find((g: any) => g.id === game);
  res.send(EVENTS_MAP[id].games.find((g: any) => g.id === game));
});

app.get("/events/:id/games", (req, res) => {
  const id = req.params["id"];
  const search = req.query["name"] as string;
  const sort = req.query["sort"] as string;

  const games = EVENTS_MAP[id].games;

  if (search) {
    const filtered = games.filter((g: any) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );
    res.send(
      filtered.sort((a: any, b: any) => a.scheduled_start - b.scheduled_start)
    );
  } else {
    res.send(
      EVENTS_MAP[id].games.sort(
        (a: any, b: any) => a.scheduled_start - b.scheduled_start
      )
    );
  }
});

app.listen(PORT, () => {
  console.log("building cache");
  buildCache();
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
