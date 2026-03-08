import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Plus, Copy, Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function AdminGalleries() {
  const { user, logout } = useAuth();
  const createGalleryMutation = trpc.galleries.create.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    password: "",
    expiresAt: "",
  });
  const [createdGalleries, setCreatedGalleries] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName || !formData.clientEmail) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const result = await createGalleryMutation.mutateAsync({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        password: formData.password,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined,
      });

      toast.success("Gallery created successfully");
      setCreatedGalleries((prev) => [...prev, result]);
      setShowForm(false);
      setFormData({
        clientName: "",
        clientEmail: "",
        password: "",
        expiresAt: "",
      });
    } catch (error) {
      toast.error("Failed to create gallery");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
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
          <h1 className="text-2xl font-bold">Client Gallery Management</h1>
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
            <h2 className="text-3xl font-bold">Client Galleries</h2>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? "Cancel" : "Create Gallery"}
            </Button>
          </div>

          {/* Create Gallery Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Client Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        placeholder="Client name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientEmail">Client Email *</Label>
                      <Input
                        id="clientEmail"
                        name="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        placeholder="client@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Password (Optional)</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Leave empty for no password"
                      />
                    </div>

                    <div>
                      <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
                      <Input
                        id="expiresAt"
                        name="expiresAt"
                        type="date"
                        value={formData.expiresAt}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={createGalleryMutation.isPending}>
                    {createGalleryMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Gallery"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Created Galleries */}
          {createdGalleries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Created Galleries</h3>
              {createdGalleries.map((gallery) => (
                <Card key={gallery.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{gallery.clientName}</h4>
                        <p className="text-sm text-gray-600">{gallery.clientEmail}</p>
                        {gallery.expiresAt && (
                          <p className="text-sm text-gray-500 mt-2">
                            Expires: {new Date(gallery.expiresAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(gallery.accessToken)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Token
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-100 rounded text-sm font-mono break-all">
                      {gallery.accessToken}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {createdGalleries.length === 0 && !showForm && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No galleries created yet. Create one to get started!</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
