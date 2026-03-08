import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPortfolio from "./pages/admin/Portfolio";
import AdminEvents from "./pages/admin/Events";
import AdminBookings from "./pages/admin/Bookings";
import AdminGalleries from "./pages/admin/Galleries";
import { useAuth } from "./_core/hooks/useAuth";
import { Loader2 } from "lucide-react";

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <Switch>
      {/* Public Routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/events"} component={Events} />
      <Route path={"/events/:id"} component={EventDetail} />
      <Route path={"/services"} component={Services} />
      <Route path={"/booking"} component={Booking} />

      {/* Admin Routes */}
      {isAdmin && (
        <>
          <Route path={"/admin"} component={AdminDashboard} />
          <Route path={"/admin/portfolio"} component={AdminPortfolio} />
          <Route path={"/admin/events"} component={AdminEvents} />
          <Route path={"/admin/bookings"} component={AdminBookings} />
          <Route path={"/admin/galleries"} component={AdminGalleries} />
        </>
      )}

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
