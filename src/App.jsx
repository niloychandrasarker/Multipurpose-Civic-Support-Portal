import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/LandingPage";
import CitizenDashboard from "./pages/CitizenDashboard";
import GDFiling from "./pages/GDFiling";
import CaseTracking from "./pages/CaseTracking";
import FinePayment from "./pages/FinePayment";
import Chatbot from "./pages/Chatbot";
import SupportContacts from "./pages/SupportContacts";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<CitizenDashboard />} />
          <Route path="gd-filing" element={<GDFiling />} />
          <Route path="case-tracking" element={<CaseTracking />} />
          <Route path="fine-payment" element={<FinePayment />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="support" element={<SupportContacts />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
