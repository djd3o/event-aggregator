import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import eventsRouter from "./routes/events.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRouter);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
