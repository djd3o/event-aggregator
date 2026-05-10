import { useEffect, useState } from "react";
import EventCard from "./components/eventCard";
import { mockEvents } from "./data/mockEvents";

type Event = {
  id: number;
  title: string;
  artist: string;
  venue: string;
  city: string;
  date: string;
  source: string;
  ticketUrl: string;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-4xl font-bold">Event Aggregator</h1>

      <div className="min-h-screen bg-black p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}

// function App() {
//   return (
//     <main className="min-h-screen bg-zinc-950 text-white p-10">
//       <h1 className="text-4xl font-bold">Event Aggregator</h1>
//     </main>
//   );
// }

export default App;
