import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SOSButton from "../components/SOSButton";
import CivicLogo from "../components/CivicLogo";
import BangladeshFlag from "../components/BangladeshFlag";
import Footer from "../components/Footer";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "Dashboard",
      href: "/dashboard",
      current: location.pathname === "/dashboard",
    },
    {
      name: "Report Issue",
      href: "/report-issue",
      current: location.pathname === "/report-issue",
    },
    {
      name: "Track Issues",
      href: "/issues",
      current: location.pathname === "/issues",
    },
    {
      name: "GD Filing",
      href: "/gd-filing",
      current: location.pathname === "/gd-filing",
    },
    {
      name: "Case Tracking",
      href: "/case-tracking",
      current: location.pathname === "/case-tracking",
    },
    {
      name: "Fine Payment",
      href: "/fine-payment",
      current: location.pathname === "/fine-payment",
    },
    {
      name: "Legal Aid",
      href: "/chatbot",
      current: location.pathname === "/chatbot",
    },
    {
      name: "Support",
      href: "/support",
      current: location.pathname === "/support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo Section - Full Logo on All Screen Sizes */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-2 sm:space-x-3 group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                  <CivicLogo
                    className="h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                    textColor="text-blue-600"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 tracking-tight">
                      Civic Portal
                    </h1>
                    <BangladeshFlag className="h-3 w-4 sm:h-4 sm:w-6 shadow-sm" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium tracking-wide">
                    Government of Bangladesh
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Menu - Hidden on Mobile */}
            <div className="hidden lg:flex lg:space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.current
                      ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } inline-flex items-center px-3 lg:px-4 py-2 border-b-2 text-sm font-medium rounded-t-lg transition-all duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Actions - Professional and Compact */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Mobile Search - Quick Access */}
              <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Desktop Search - Hidden on Mobile */}
              <button className="hidden lg:flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* User Profile - Desktop Only */}
              <Link
                to="/profile"
                className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
                <span className="text-sm font-medium">Profile</span>
              </Link>

              {/* Mobile menu button - Enhanced */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open main menu"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile menu - Professional Design */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
            <div className="pt-3 pb-4 space-y-1 px-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Mobile Navigation Links - Touch Optimized */}
              <div className="grid grid-cols-2 gap-2 py-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.current
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    } flex items-center justify-center px-3 py-4 rounded-xl text-sm font-medium transition-all duration-200 touch-manipulation`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-center">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Quick Actions */}
              <div className="pt-3 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center space-x-2 px-3 py-3 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl transition-colors duration-200">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Search</span>
                  </button>
                  <Link
                    to="/profile"
                    className="flex items-center justify-center space-x-2 px-3 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                </div>
              </div>

              {/* Mobile Emergency Contact */}
              <div className="pt-3 border-t border-gray-100">
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        Emergency
                      </p>
                      <p className="text-xs text-red-600">
                        Call 999 for immediate help
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumbs - Mobile Optimized */}
      {location.pathname !== "/" && (
        <div className="mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-4 bg-gray-50">
          <Breadcrumbs />
        </div>
      )}

      {/* Main content - Mobile First Design */}
      <main className="mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 min-h-[calc(100vh-12rem)]">
        <div className="mobile-scroll">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default Layout;
