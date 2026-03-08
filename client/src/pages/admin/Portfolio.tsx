import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Plus, Trash2, Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function AdminPortfolio() {
  const { user, logout } = useAuth();
  const { data: images, isLoading, refetch } = trpc.portfolio.getImages.useQuery();
  const uploadImageMutation = trpc.portfolio.uploadImage.useMutation();
  const deleteImageMutation = trpc.portfolio.deleteImage.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    imageKey: "",
    category: "weddings" as "weddings" | "corporate" | "concerts" | "portraits" | "other",
    title: "",
    description: "",
    displayOrder: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl || !formData.imageKey) {
      toast.error("Please provide image URL and key");
      return;
    }

    try {
      await uploadImageMutation.mutateAsync({
        imageUrl: formData.imageUrl,
        imageKey: formData.imageKey,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        displayOrder: parseInt(formData.displayOrder),
      });

      toast.success("Image uploaded successfully");
      setShowForm(false);
      setFormData({
        imageUrl: "",
        imageKey: "",
        category: "weddings",
        title: "",
        description: "",
        displayOrder: "0",
      });
      refetch();
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteImageMutation.mutateAsync({ id });
        toast.success("Image deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete image");
      }
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Portfolio Management</h1>
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Portfolio Images</h2>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? "Cancel" : "Upload Image"}
            </Button>
          </div>

          {/* Upload Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Upload Portfolio Image</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="imageUrl">Image URL *</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="imageKey">Image Key *</Label>
                      <Input
                        id="imageKey"
                        name="imageKey"
                        value={formData.imageKey}
                        onChange={handleChange}
                        placeholder="portfolio/image-key"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="weddings">Weddings</option>
                        <option value="corporate">Corporate</option>
                        <option value="concerts">Concerts</option>
                        <option value="portraits">Portraits</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="displayOrder">Display Order</Label>
                      <Input
                        id="displayOrder"
                        name="displayOrder"
                        type="number"
                        value={formData.displayOrder}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Image title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Image description"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" disabled={uploadImageMutation.isPending}>
                    {uploadImageMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload Image"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Images Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : images && images.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title || "Portfolio image"}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <CardContent className="pt-4">
                    {image.title && <h3 className="font-semibold mb-2">{image.title}</h3>}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {image.category}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(image.id)}
                        disabled={deleteImageMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No images yet. Upload your first portfolio image!</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
