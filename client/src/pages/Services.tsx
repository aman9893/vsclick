import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Check, Loader2, ArrowRight, Star } from "lucide-react";
import { useState } from "react";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("photography");
  const { data: services, isLoading } = trpc.services.getAll.useQuery({
    category: selectedCategory,
  });

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
            Services & <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect package for your event. All packages include professional editing and delivery.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-12 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setSelectedCategory("photography")}
              className={`px-8 py-3 rounded-lg transition-all ${
                selectedCategory === "photography"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "bg-white/10 border border-white/20 text-gray-300 hover:border-pink-500/50"
              }`}
            >
              Photography Services
            </Button>
            <Button
              onClick={() => setSelectedCategory("eventManagement")}
              className={`px-8 py-3 rounded-lg transition-all ${
                selectedCategory === "eventManagement"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "bg-white/10 border border-white/20 text-gray-300 hover:border-pink-500/50"
              }`}
            >
              Event Management
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin h-12 w-12 text-pink-500" />
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const features = service.features
                  ? service.features.split("\n").filter((f) => f.trim())
                  : [];
                const isPopular = idx === 1;

                return (
                  <Card
                    key={service.id}
                    className={`relative flex flex-col transition-all ${
                      isPopular
                        ? "bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-500/50 ring-2 ring-pink-500/20 md:scale-105"
                        : "bg-white/5 border-white/10 hover:border-pink-500/50"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <p className="text-gray-400 text-sm mt-2">{service.description}</p>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-8">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            ${service.basePrice}
                          </span>
                          <span className="text-gray-400">Starting price</span>
                        </div>
                      </div>

                      {features.length > 0 && (
                        <div className="mb-8 flex-1">
                          <p className="font-semibold mb-4 text-white">What's Included:</p>
                          <ul className="space-y-3">
                            {features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                                <span>{feature.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link href="/booking" className="w-full">
                        <Button
                          className={`w-full py-3 rounded-lg font-semibold transition-all ${
                            isPopular
                              ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                              : "bg-white/10 border border-white/20 text-white hover:border-pink-500/50 hover:bg-white/20"
                          }`}
                        >
                          Book Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">No services available in this category</p>
              <Link href="/booking">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Create Custom Package
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Custom Package?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Don't see exactly what you need? Let's create a custom package tailored to your specific requirements.
          </p>
          <Link href="/booking">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-lg">
              Get in Touch
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
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
