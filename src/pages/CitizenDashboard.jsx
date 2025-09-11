import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

const CitizenDashboard = () => {
  const quickTiles = [
    {
      title: "File GD Report",
      description: "Submit a new General Diary report",
      icon: "📋",
      link: "/gd-filing",
      color: "bg-blue-500",
    },
    {
      title: "Track Cases",
      description: "Monitor your case status",
      icon: "🔍",
      link: "/case-tracking",
      color: "bg-green-500",
    },
    {
      title: "Pay Fines",
      description: "Clear pending fines",
      icon: "💳",
      link: "/fine-payment",
      color: "bg-orange-500",
    },
    {
      title: "Legal Aid",
      description: "Get legal assistance",
      icon: "⚖️",
      link: "/chatbot",
      color: "bg-purple-500",
    },
    {
      title: "Support Contacts",
      description: "Emergency and support contacts",
      icon: "📞",
      link: "/support",
      color: "bg-red-500",
    },
    {
      title: "Admin Panel",
      description: "Administrative functions",
      icon: "⚙️",
      link: "/admin",
      color: "bg-gray-500",
    },
  ];

  const recentActivity = [
    {
      id: "GD001",
      type: "GD Filing",
      status: "Under Review",
      date: "2025-09-10",
    },
    {
      id: "CASE002",
      type: "Case Tracking",
      status: "Resolved",
      date: "2025-09-08",
    },
    { id: "FINE003", type: "Fine Payment", status: "Paid", date: "2025-09-05" },
  ];

  const stats = [
    { label: "Active Cases", value: "3", change: "+1", color: "text-blue-600" },
    {
      label: "Pending Fines",
      value: "৳3,000",
      change: "-৳600",
      color: "text-red-600",
    },
    {
      label: "Resolved Cases",
      value: "12",
      change: "+2",
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-blue-100">
          Manage all your civic services from one place
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm ${stat.color} font-medium`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Action Tiles */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickTiles.map((tile, index) => (
            <Link key={index} to={tile.link}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105">
                <div className="text-center">
                  <div
                    className={`${tile.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-2xl text-white">{tile.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tile.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tile.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Access
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          activity.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "Paid"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Quick Help */}
      <Card title="Need Help?">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Frequently Asked Questions
            </h4>
            <p className="text-gray-600 text-sm mb-3">
              Find answers to common questions
            </p>
            <Button variant="outline" size="sm">
              View FAQ
            </Button>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Contact Support</h4>
            <p className="text-gray-600 text-sm mb-3">
              Get help from our support team
            </p>
            <Link to="/support">
              <Button variant="outline" size="sm">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CitizenDashboard;
