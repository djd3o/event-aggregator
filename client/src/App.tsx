import { useState } from "react";
import EventCard from "./components/eventCard";
import type { Event } from "./types/event";

function App() {
  const [events, setEvents] = useState<Event[]>();
  const [cityQuery, setCityQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEventsByCity = async () => {
    if (!cityQuery.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5001/api/events?city=${encodeURIComponent(cityQuery)}`
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch events");
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold">Event Aggregator</h1>

      <div className="mb-10 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Enter city..."
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
          className="
            flex-1
            rounded-xl
            bg-zinc-900
            px-4
            py-3
            text-white
            placeholder-zinc-500
            outline-none
          "
        />

        <button
          onClick={fetchEventsByCity}
          className="
            w-full
            md:w-80
            rounded-xl
            bg-zinc-900
            px-4
            py-3
            text-white
            placeholder-zinc-500
            outline-none
          "
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading events...</p>
      ) : !events || events.length === 0 ? (
        <p className="text-zinc-400">Search for a city to see events.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
