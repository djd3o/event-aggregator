import { useState } from "react";
import EventCard from "./components/eventCard";
import type { Event } from "./types/event";

function App() {
  const [events, setEvents] = useState<Event[]>();
  const [cityQuery, setCityQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("1month");
  const [loading, setLoading] = useState(false);

  const getMaxDate = () => {
    const maxDate = new Date();

    if (dateFilter === "3months") maxDate.setMonth(maxDate.getMonth() + 3);
    else if (dateFilter === "6months") maxDate.setMonth(maxDate.getMonth() + 6);
    else if (dateFilter === "1year")
      maxDate.setFullYear(maxDate.getFullYear() + 1);
    else maxDate.setMonth(maxDate.getMonth() + 1);

    return maxDate;
  };

  const filteredEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const maxDate = getMaxDate();

    return eventDate >= today && eventDate <= maxDate;
  });

  const fetchEventsByCity = async () => {
    if (!cityQuery.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5001/api/events?city=${encodeURIComponent(
          cityQuery
        )}&dateFilter=${dateFilter}`
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
          className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none"
        />

        {events && (
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="
            rounded-xl
            bg-zinc-900
            px-3
            py-3
            pr-8
            text-center
            text-white
            outline-none
            appearance-none
            md:w-48
          "
          >
            <option value="1month">1 month</option>
            <option value="3months">3 months</option>
            <option value="6months">6 months</option>
            <option value="1year">1 year</option>
          </select>
        )}

        <button
          onClick={fetchEventsByCity}
          className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-white outline-none md:w-80"
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
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
