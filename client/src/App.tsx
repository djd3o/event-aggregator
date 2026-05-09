import { useEffect, useState } from "react";

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

// function App() {
//   const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:5001/api/events")
//       .then((res) => res.json())
//       .then(setEvents);
//   }, []);

//   return (
//     <main>
//       <h1>Event Aggregator</h1>

//       {events.map((event) => (
//         <div key={event.id}>
//           <h2>{event.title}</h2>
//           <p>{event.artist}</p>
//           <p>
//             {event.venue} — {event.city}
//           </p>
//           <p>{event.date}</p>
//           <a href={event.ticketUrl}>Tickets</a>
//         </div>
//       ))}
//     </main>
//   );
// }

function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-4xl font-bold">Event Aggregator</h1>
    </main>
  );
}

export default App;
