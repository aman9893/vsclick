import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { BarChart3, Calendar, FileText, TrendingUp, LogOut, Loader2, Users, Image, Settings, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { data: stats, isLoading } = trpc.admin.getDashboardStats.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Gradient Background */}
      <div className="relative overflow-hidden border-b border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              </div>
              <p className="text-slate-400">Welcome back, <span className="text-blue-400 font-semibold">{user?.name}</span></p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen sticky top-0">
          <nav className="p-6 space-y-2">
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu</p>
            </div>
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                <BarChart3 className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                <Calendar className="h-4 w-4 mr-3" />
                Events
              </Button>
            </Link>
            <Link href="/admin/portfolio">
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                <Image className="h-4 w-4 mr-3" />
                Portfolio
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                <FileText className="h-4 w-4 mr-3" />
                Bookings
              </Button>
            </Link>
            <Link href="/admin/galleries">
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                <Users className="h-4 w-4 mr-3" />
                Client Galleries
              </Button>
            </Link>

            <div className="pt-6 mt-6 border-t border-slate-700">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">General</p>
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                  <Settings className="h-4 w-4 mr-3" />
                  View Website
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
            </div>
          ) : (
            <>
              {/* Welcome Banner with Background */}
              <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative">
                  <h2 className="text-3xl font-bold mb-2">Welcome to Nvs Click</h2>
                  <p className="text-blue-100 text-lg">Manage your events, bookings, and photography portfolio all in one place</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {/* Revenue Card */}
                <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-slate-300">Total Revenue</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">${stats?.totalRevenue?.toFixed(2) || "0.00"}</div>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                      <p className="text-xs text-slate-400">From ticket sales</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Bookings Card */}
                <Card className="bg-slate-800 border-slate-700 hover:border-orange-500 transition-all hover:shadow-xl hover:shadow-orange-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-slate-300">Pending Bookings</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{stats?.pendingBookings || 0}</div>
                    <p className="text-xs text-slate-400 mt-2">Awaiting your approval</p>
                  </CardContent>
                </Card>

                {/* Events This Week Card */}
                <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-all hover:shadow-xl hover:shadow-purple-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-slate-300">Events This Week</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{stats?.upcomingEventsThisWeek || 0}</div>
                    <p className="text-xs text-slate-400 mt-2">Upcoming events</p>
                  </CardContent>
                </Card>

                {/* Website Visits Card */}
                <Card className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-slate-300">Website Visits</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{stats?.totalWebsiteVisits || 0}</div>
                    <p className="text-xs text-slate-400 mt-2">This month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="md:col-span-2">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Settings className="h-5 w-5 text-blue-400" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/admin/events">
                        <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                          <Calendar className="h-4 w-4 mr-3" />
                          Create New Event
                        </Button>
                      </Link>
                      <Link href="/admin/portfolio">
                        <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                          <Image className="h-4 w-4 mr-3" />
                          Upload Portfolio Images
                        </Button>
                      </Link>
                      <Link href="/admin/bookings">
                        <Button className="w-full justify-start bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white">
                          <FileText className="h-4 w-4 mr-3" />
                          Review Pending Bookings
                        </Button>
                      </Link>
                      <Link href="/admin/galleries">
                        <Button className="w-full justify-start bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white">
                          <Users className="h-4 w-4 mr-3" />
                          Create Client Gallery
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats Summary */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Booking Rate</span>
                        <span className="text-lg font-bold text-green-400">85%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Portfolio Complete</span>
                        <span className="text-lg font-bold text-blue-400">60%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Event Coverage</span>
                        <span className="text-lg font-bold text-purple-400">75%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Section */}
              <Card className="bg-slate-800 border-slate-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-white">System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                      <p className="text-sm text-slate-400 mb-1">Active Events</p>
                      <p className="text-2xl font-bold text-blue-400">12</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                      <p className="text-sm text-slate-400 mb-1">Total Bookings</p>
                      <p className="text-2xl font-bold text-purple-400">48</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                      <p className="text-sm text-slate-400 mb-1">Portfolio Images</p>
                      <p className="text-2xl font-bold text-pink-400">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
