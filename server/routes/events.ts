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

    const ticketmasterApiKey = process.env.TICKETMASTER_API_KEY;
    const eventbriteToken = process.env.EVENTBRITE_TOKEN;

    if (!ticketmasterApiKey) {
      return res.status(500).json({
        error: "Missing TICKETMASTER_API_KEY in .env",
      });
    }

    if (!eventbriteToken) {
      return res.status(500).json({
        error: "Missing EVENTBRITE_TOKEN in .env",
      });
    }

    // =========================
    // Ticketmaster
    // =========================

    const ticketmasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&city=${encodeURIComponent(
      String(city)
    )}&classificationName=music&size=200`;

    console.log("Ticketmaster URL:", ticketmasterUrl);

    const ticketmasterResponse = await fetch(ticketmasterUrl);
    const ticketmasterData = await ticketmasterResponse.json();

    const ticketmasterEvents = ticketmasterData._embedded?.events ?? [];

    const normalizedTicketmasterEvents = ticketmasterEvents.map(
      (event: any) => ({
        id: `tm-${event.id}`,
        title: event.name,
        artists: [event.name],
        venue: event._embedded?.venues?.[0]?.name ?? "Unknown venue",
        city: event._embedded?.venues?.[0]?.city?.name ?? String(city),
        country: event._embedded?.venues?.[0]?.country?.name ?? "",
        date:
          event.dates?.start?.dateTime ?? event.dates?.start?.localDate ?? "",
        source: "Ticketmaster",
        ticketUrl: event.url,
        imageUrl: event.images?.[0]?.url ?? "",
      })
    );

    // =========================
    // Combine + Sort
    // =========================

    const allEvents = [...normalizedTicketmasterEvents];

    allEvents.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    res.json(allEvents);
  } catch (error) {
    console.error("Failed to fetch events:", error);

    res.status(500).json({
      error: "Failed to fetch events",
    });
  }
});

export default router;
