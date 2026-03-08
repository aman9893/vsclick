import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Loader2, ArrowRight } from "lucide-react";

const categories = ["All", "Weddings", "Corporate", "Concerts", "Portraits"];

export default function Portfolio() {
  const { data: images, isLoading } = trpc.portfolio.getImages.useQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = images?.filter(
    (img) => selectedCategory === "All" || img.category === selectedCategory.toLowerCase()
  ) || [];

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
            Our <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our collection of stunning photography across different categories
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-white/10 border border-white/20 text-gray-300 hover:border-pink-500/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin h-12 w-12 text-pink-500" />
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className="bg-white/5 border-white/10 overflow-hidden group cursor-pointer hover:border-pink-500/50 transition-all"
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={image.imageUrl}
                      alt={image.title || "Portfolio image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div>
                        {image.title && <h3 className="font-semibold text-lg">{image.title}</h3>}
                        <p className="text-sm text-gray-300 capitalize">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in Our Work?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's create something amazing together. Book your event with us today.
          </p>
          <Link href="/booking">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-lg">
              Book Now
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
