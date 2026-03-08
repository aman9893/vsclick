import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { CheckCircle, Clock, XCircle, Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function AdminBookings() {
  const { user, logout } = useAuth();
  const { data: bookings, isLoading, refetch } = trpc.bookings.getAll.useQuery();
  const updateStatusMutation = trpc.bookings.updateStatus.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const handleStatusChange = async (id: number, newStatus: "pending" | "approved" | "completed" | "cancelled") => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: newStatus,
        notes: notes,
      });
      toast.success("Booking status updated");
      setSelectedBooking(null);
      setNotes("");
      refetch();
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6 space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button variant="ghost" className="w-full justify-start">
                Events
              </Button>
            </Link>
            <Link href="/admin/portfolio">
              <Button variant="ghost" className="w-full justify-start">
                Portfolio
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="ghost" className="w-full justify-start">
                Bookings
              </Button>
            </Link>
            <Link href="/admin/galleries">
              <Button variant="ghost" className="w-full justify-start">
                Client Galleries
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Booking Requests</h2>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Booking Info */}
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{booking.clientName}</h3>
                        <p className="text-sm text-gray-600 mb-1">{booking.clientEmail}</p>
                        {booking.clientPhone && (
                          <p className="text-sm text-gray-600 mb-3">{booking.clientPhone}</p>
                        )}
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status)}
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      {/* Event Info */}
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Event Date</p>
                        <p className="font-semibold mb-3">
                          {new Date(booking.eventDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">Service Type</p>
                        <p className="font-semibold mb-3 capitalize">{booking.serviceType}</p>
                        {booking.budget && (
                          <>
                            <p className="text-sm text-gray-500 mb-1">Budget</p>
                            <p className="font-semibold">{booking.budget}</p>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      <div>
                        {selectedBooking === booking.id ? (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor={`notes-${booking.id}`} className="text-xs">
                                Notes
                              </Label>
                              <Textarea
                                id={`notes-${booking.id}`}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add notes..."
                                rows={2}
                                className="text-sm"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(booking.id, "approved")}
                                disabled={updateStatusMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(booking.id, "completed")}
                                disabled={updateStatusMutation.isPending}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Mark Complete
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedBooking(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setSelectedBooking(booking.id)}
                          >
                            Manage
                          </Button>
                        )}
                      </div>
                    </div>

                    {booking.eventDescription && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 line-clamp-2">{booking.eventDescription}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No booking requests yet</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
