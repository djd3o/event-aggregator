import { useEffect, useState } from "react";
import EventCard from "./components/eventCard";
import { mockEvents } from "./data/mockEvents";
import type { Event } from "./types/event";

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  // TODO: remove mockEvents
  const eventList = events.length > 0 ? events : mockEvents;

  const filteredEvents = mockEvents.filter((event) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      (event.title ?? "").toLowerCase().includes(query) ||
      (event.artists ?? []).join(" ").toLowerCase().includes(query) ||
      (event.venue ?? "").toLowerCase().includes(query) ||
      (event.city ?? "").toLowerCase().includes(query);

    const matchesCity = selectedCity === "All" || event.city === selectedCity;

    const matchesSource =
      selectedSource === "All" || event.source === selectedSource;

    const eventDate = new Date(event.date);
    const today = new Date();

    const matchesDate =
      selectedDateFilter === "All" ||
      (selectedDateFilter === "Today" &&
        eventDate.toDateString() === today.toDateString()) ||
      (selectedDateFilter === "This Week" &&
        eventDate >= today &&
        eventDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) ||
      (selectedDateFilter === "This Month" &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear());

    return matchesSearch && matchesCity && matchesSource && matchesDate;
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="mb-8 text-4xl font-bold">Event Aggregator</h1>

      {/* SEARCH + FILTERS */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none"
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-white outline-none"
        >
          <option value="All">All Cities</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="New York">New York</option>
        </select>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-white outline-none"
        >
          <option value="All">All Sources</option>
          <option value="RA">RA</option>
          <option value="Dice">Dice</option>
          <option value="Songkick">Songkick</option>
          <option value="POSH">POSH</option>
          <option value="Bandsintown">Bandsintown</option>
          <option value="Eventbrite">Eventbrite</option>
          <option value="Shotgun">Shotgun</option>
          <option value="Ticketmaster">Ticketmaster</option>
          <option value="SeeTickets">SeeTickets</option>
          <option value="AXS">AXS</option>
        </select>

        <select
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-white outline-none"
        >
          <option value="All">All Dates</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* EVENT GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}

export default App;
