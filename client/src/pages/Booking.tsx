import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Booking() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "photography" as "photography" | "eventManagement" | "both",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
    estimatedGuests: "",
    budget: "",
  });

  const createBookingMutation = trpc.bookings.create.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName || !formData.clientEmail || !formData.eventDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createBookingMutation.mutateAsync({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        serviceType: formData.serviceType,
        eventDate: new Date(formData.eventDate),
        eventLocation: formData.eventLocation,
        eventDescription: formData.eventDescription,
        estimatedGuests: formData.estimatedGuests ? parseInt(formData.estimatedGuests) : undefined,
        budget: formData.budget,
      });

      toast.success("Booking request submitted successfully! We'll contact you soon.");
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        serviceType: "photography",
        eventDate: "",
        eventLocation: "",
        eventDescription: "",
        estimatedGuests: "",
        budget: "",
      });
    } catch (error) {
      toast.error("Failed to submit booking request");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Book Our Services</h1>
          <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
        </div>
      </div>

      {/* Booking Form */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Service Request Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Your Information</h3>

                  <div>
                    <Label htmlFor="clientName">Full Name *</Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientEmail">Email *</Label>
                    <Input
                      id="clientEmail"
                      name="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientPhone">Phone Number</Label>
                    <Input
                      id="clientPhone"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Service Details</h3>

                  <div>
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="photography">Photography Only</option>
                      <option value="eventManagement">Event Management Only</option>
                      <option value="both">Both Photography & Event Management</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="eventLocation">Event Location</Label>
                    <Input
                      id="eventLocation"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={handleChange}
                      placeholder="City, Venue, or Address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="estimatedGuests">Estimated Number of Guests</Label>
                    <Input
                      id="estimatedGuests"
                      name="estimatedGuests"
                      type="number"
                      value={formData.estimatedGuests}
                      onChange={handleChange}
                      placeholder="50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., $2000 - $5000"
                    />
                  </div>
                </div>

                {/* Event Description */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Event Details</h3>

                  <div>
                    <Label htmlFor="eventDescription">Event Description</Label>
                    <Textarea
                      id="eventDescription"
                      name="eventDescription"
                      value={formData.eventDescription}
                      onChange={handleChange}
                      placeholder="Tell us about your event, your vision, and any special requirements..."
                      rows={6}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createBookingMutation.isPending}
                  size="lg"
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  We'll review your request and contact you within 24 hours to discuss details and pricing.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 EventPhotoHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
