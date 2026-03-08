import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Calendar, MapPin, Loader2, ArrowRight, Ticket } from "lucide-react";

export default function Events() {
  const { data: events, isLoading } = trpc.events.getUpcoming.useQuery({ limit: 100 });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                EPH
              </div>
              <span className="text-xl font-bold">EventPhotoHub</span>
            </div>
          </Link>
          <Link href="/booking">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              Book Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Upcoming <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover and book tickets for our upcoming events and experiences
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin h-12 w-12 text-pink-500" />
            </div>
          ) : events && events.length > 0 ? (
            <div className="space-y-8">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="bg-white/5 border-white/10 hover:border-pink-500/50 transition-all overflow-hidden cursor-pointer group">
                    <div className="flex flex-col md:flex-row">
                      {event.coverImageUrl && (
                        <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden">
                          <img
                            src={event.coverImageUrl}
                            alt={event.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                        </div>
                      )}
                      <CardContent className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-bold mb-4 group-hover:text-pink-400 transition">{event.name}</h3>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-300">
                              <Calendar className="h-5 w-5 text-pink-500" />
                              <span className="text-lg">
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                                {event.startTime && ` at ${event.startTime}`}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-3 text-gray-300">
                                <MapPin className="h-5 w-5 text-pink-500" />
                                <span className="text-lg">{event.location}</span>
                              </div>
                            )}
                          </div>
                          {event.description && (
                            <p className="text-gray-400 mb-6 line-clamp-2">{event.description}</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div className="flex items-center gap-4">
                            {event.capacity && (
                              <div>
                                <p className="text-sm text-gray-400">Tickets Available</p>
                                <p className="text-lg font-semibold">
                                  {Math.max(0, event.capacity - (event.ticketsSold || 0))} / {event.capacity}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            {event.ticketPrice && (
                              <div className="text-right">
                                <p className="text-sm text-gray-400">From</p>
                                <p className="text-2xl font-bold text-pink-400">${event.ticketPrice}</p>
                              </div>
                            )}
                            <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
                              <Ticket className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl mb-4">No upcoming events at the moment</p>
              <p className="text-gray-500 mb-8">Check back soon for new events</p>
              <Link href="/booking">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Book a Custom Event
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 EventPhotoHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
