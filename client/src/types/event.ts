export type Event = {
  id: string;
  title: string;
  artists: string[];
  venue: string;
  city: string;
  country: string;
  date: string;
  imageUrl: string;
  source:
    | "RA"
    | "Dice"
    | "Songkick"
    | "POSH"
    | "Bandsintown"
    | "Eventbrite"
    | "Shotgun"
    | "Ticketmaster"
    | "SeeTickets"
    | "AXS";
  ticketUrl: string;
  genres?: string[];
};
