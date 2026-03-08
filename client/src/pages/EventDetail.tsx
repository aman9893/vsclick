import { useState } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ChevronLeft, Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EventDetail() {
  const params = useParams();
  const eventId = parseInt(params.id || "0");
  const [quantity, setQuantity] = useState(1);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeePhone, setAttendeePhone] = useState("");
  const [ticketType, setTicketType] = useState<"paid" | "rsvp">("rsvp");

  const { data: event, isLoading: eventLoading } = trpc.events.getById.useQuery({ id: eventId });
  const createTicketMutation = trpc.tickets.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!attendeeName || !attendeeEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createTicketMutation.mutateAsync({
        eventId,
        attendeeName,
        attendeeEmail,
        attendeePhone,
        ticketType,
        quantity,
        totalPrice: ticketType === "paid" && event?.ticketPrice ? String(Number(event.ticketPrice) * quantity) : undefined,
      });
      
      toast.success(`${ticketType === "paid" ? "Ticket" : "RSVP"} created successfully!`);
      setAttendeeName("");
      setAttendeeEmail("");
      setAttendeePhone("");
    } catch (error) {
      toast.error("Failed to create ticket");
    }
  };

  if (eventLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <Link href="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }

  const availableTickets = event.capacity ? event.capacity - (event.ticketsSold || 0) : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href="/events">
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Event Details */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {event.coverImageUrl && (
                <img
                  src={event.coverImageUrl}
                  alt={event.name}
                  className="w-full h-96 object-cover rounded-lg mb-8"
                  loading="lazy"
                />
              )}
              
              <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>{new Date(event.date).toLocaleDateString()} {event.startTime && `at ${event.startTime}`}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-3 text-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.capacity && (
                  <div className="flex items-center gap-3 text-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>{availableTickets !== null && availableTickets > 0 ? `${availableTickets} tickets available` : "Sold out"}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="prose max-w-none mb-8">
                  <h2 className="text-2xl font-bold mb-4">About this event</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>
                    {event.ticketPrice ? `$${event.ticketPrice} per ticket` : "Free Event"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        value={attendeePhone}
                        onChange={(e) => setAttendeePhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {event.ticketPrice && (
                      <div>
                        <Label htmlFor="quantity">Number of Tickets</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          max={availableTickets || 10}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                      </div>
                    )}

                    <div>
                      <Label>Type</Label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="rsvp"
                            checked={ticketType === "rsvp"}
                            onChange={(e) => setTicketType(e.target.value as "rsvp")}
                          />
                          <span>RSVP</span>
                        </label>
                        {event.ticketPrice && (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              value="paid"
                              checked={ticketType === "paid"}
                              onChange={(e) => setTicketType(e.target.value as "paid")}
                            />
                            <span>Buy Ticket</span>
                          </label>
                        )}
                      </div>
                    </div>

                    {ticketType === "paid" && event.ticketPrice && (
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total:</p>
                        <p className="text-2xl font-bold">${(Number(event.ticketPrice) * quantity).toFixed(2)}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createTicketMutation.isPending || (availableTickets !== null && availableTickets <= 0 && ticketType === "paid")}
                      size="lg"
                    >
                      {createTicketMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : ticketType === "paid" ? (
                        "Buy Ticket"
                      ) : (
                        "RSVP"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 Nvs Click. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
