import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

const LandingPage = () => {
  const services = [
    {
      title: "GD Filing",
      description: "File General Diary reports online with ease",
      icon: "📋",
      link: "/gd-filing",
    },
    {
      title: "Case Tracking",
      description: "Track your cases and fine payments",
      icon: "🔍",
      link: "/case-tracking",
    },
    {
      title: "Legal Aid",
      description: "Get legal assistance through our AI chatbot",
      icon: "⚖️",
      link: "/chatbot",
    },
    {
      title: "Emergency Support",
      description: "Quick access to emergency contacts and services",
      icon: "🚨",
      link: "/support",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Multipurpose Civic Support Portal
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your one-stop solution for all civic services. File reports, track
            cases, pay fines, and get legal assistance - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Access Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access essential civic services from the comfort of your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-100 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <p className="text-gray-600">Get started with these common tasks</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/gd-filing">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              File a GD Report
            </Button>
          </Link>
          <Link to="/case-tracking">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Track My Case
            </Button>
          </Link>
          <Link to="/fine-payment">
            <Button variant="success" size="lg" className="w-full sm:w-auto">
              Pay Fine
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure & Safe</h3>
          <p className="text-gray-600">
            Your data is protected with enterprise-level security
          </p>
        </div>

        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Fast & Efficient</h3>
          <p className="text-gray-600">
            Quick processing and real-time updates
          </p>
        </div>

        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">
            Round-the-clock assistance when you need it
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
