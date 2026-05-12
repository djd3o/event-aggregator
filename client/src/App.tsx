import { useState } from "react";
import EventCard from "./components/eventCard";
import { mockEvents } from "./data/mockEvents";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All");

  const eventList = mockEvents;

  const cities = [
    "All",
    ...new Set(eventList.map((event) => event.city).filter(Boolean)),
  ];

  const sources = [
    "All",
    ...new Set(eventList.map((event) => event.source).filter(Boolean)),
  ];

  const filteredEvents = eventList.filter((event) => {
    const query = searchQuery.toLowerCase();
    const artistText = event.artists?.join(" ") ?? "";

    const matchesSearch =
      (event.title ?? "").toLowerCase().includes(query) ||
      artistText.toLowerCase().includes(query) ||
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
    <main className="min-h-screen bg-zinc-950 p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold">Event Aggregator</h1>

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
          {cities.map((city) => (
            <option key={city} value={city}>
              {city === "All" ? "All Cities" : city}
            </option>
          ))}
        </select>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-white outline-none"
        >
          {sources.map((source) => (
            <option key={source} value={source}>
              {source === "All" ? "All Sources" : source}
            </option>
          ))}
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}

export default App;
