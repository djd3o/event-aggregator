import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({
        error: "City is required",
      });
    }

    const apiKey = process.env.TICKETMASTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing TICKETMASTER_API_KEY in .env",
      });
    }

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${encodeURIComponent(
      String(city)
    )}&classificationName=music&size=20`;

    console.log("Ticketmaster URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    const ticketmasterEvents = data._embedded?.events ?? [];

    const normalizedEvents = ticketmasterEvents.map((event: any) => ({
      id: event.id,
      title: event.name,
      artists: [event.name],
      venue: event._embedded?.venues?.[0]?.name ?? "Unknown venue",
      city: event._embedded?.venues?.[0]?.city?.name ?? String(city),
      country: event._embedded?.venues?.[0]?.country?.name ?? "",
      date: event.dates?.start?.dateTime ?? event.dates?.start?.localDate ?? "",
      source: "Ticketmaster",
      ticketUrl: event.url,
      imageUrl: event.images?.[0]?.url ?? "",
    }));

    res.json(normalizedEvents);
  } catch (error) {
    console.error("Failed to fetch Ticketmaster events:", error);

    res.status(500).json({
      error: "Failed to fetch events",
    });
  }
});

export default router;
