import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "GabayGamot API" });
});

app.listen(port, () => {
  console.log(`GabayGamot API running on http://localhost:${port}`);
});
