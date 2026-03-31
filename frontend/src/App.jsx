import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Auth guard
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Landing from "./Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected pages
import Dashboard from "./pages/Dashboard";
import Rent from "./pages/Rent";
import Let from "./pages/Let";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Favorites from "./pages/Favorites";
import ItemDetail from "./pages/ItemDetail";
import Messages from "./pages/Messages";
import About from "./pages/About";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes — inside DashboardLayout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/let" element={<Let />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;