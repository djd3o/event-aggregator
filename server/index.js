const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/api/events", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Sample Event",
      artist: "DJ Example",
      venue: "Warehouse LA",
      city: "Los Angeles",
      date: "2026-06-01",
      source: "Bandsintown",
      ticketUrl: "https://example.com",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
