import type { Event } from "../types/event";

import { Card, CardContent } from "./ui/card";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-zinc-900 border-zinc-800">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="h-56 w-full object-cover"
      />

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge>{event.source}</Badge>

          <span className="text-sm text-zinc-400">{event.date}</span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">{event.title}</h2>

          <p className="text-zinc-400">{event.artists.join(", ")}</p>
        </div>

        <div className="text-sm text-zinc-500">
          <p>{event.venue}</p>
          <p>
            {event.city}, {event.country}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.genres?.map((genre) => (
            <Badge key={genre} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>

        <Button className="w-full">Get Tickets</Button>
      </CardContent>
    </Card>
  );
}
