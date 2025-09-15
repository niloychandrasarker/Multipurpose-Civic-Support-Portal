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
import CaseDetails from "./pages/CaseDetails";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import IssueReporting from "./pages/IssueReporting";
import IssueTracking from "./pages/IssueTracking";
import ReportDetail from "./pages/ReportDetail";
import TransparencyDashboard from "./pages/TransparencyDashboard";
import TransparencyDetailPage from "./pages/TransparencyDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<CitizenDashboard />} />
          <Route path="report-issue" element={<IssueReporting />} />
          <Route path="issues" element={<IssueTracking />} />
          <Route path="transparency" element={<TransparencyDashboard />} />
          <Route
            path="transparency/:section"
            element={<TransparencyDetailPage />}
          />
          <Route
            path="transparency/:section/:id"
            element={<TransparencyDetailPage />}
          />
          <Route
            path="transparency/:section/:category/:id"
            element={<TransparencyDetailPage />}
          />
          <Route path="gd-filing" element={<GDFiling />} />
          <Route path="case-tracking" element={<CaseTracking />} />
          <Route path="fine-payment" element={<FinePayment />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="support" element={<SupportContacts />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/cases/:id" element={<CaseDetails />} />
          <Route path="admin/users/:id" element={<UserProfile />} />
          <Route path="admin/reports/:reportId" element={<ReportDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
