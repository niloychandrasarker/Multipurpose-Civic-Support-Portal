import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userData = {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+880 1712-345678",
    nid: "1234567890123",
    address: "123 Gulshan Avenue, Dhaka-1212, Bangladesh",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    occupation: "Software Engineer",
    emergencyContact: "+880 1712-345679",
    profileImage: null,
    joinDate: "2025-01-15",
    lastLogin: "2025-09-11 03:45 PM",
    verified: true,
    recentCases: [
      {
        id: "GD001",
        type: "GD Filing",
        title: "Theft Report - Missing Mobile Phone",
        status: "Under Review",
        date: "2025-09-10",
        priority: "High",
      },
      {
        id: "FINE002",
        type: "Traffic Fine",
        title: "Speed Violation - Dhaka-Chittagong Highway",
        status: "Paid",
        date: "2025-08-25",
        priority: "Low",
      },
    ],
    notifications: [
      {
        id: 1,
        message: "Your case GD001 status has been updated",
        date: "2025-09-11",
        read: false,
      },
      {
        id: 2,
        message: "Traffic fine payment confirmation received",
        date: "2025-08-25",
        read: true,
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
      case "paid":
        return "bg-green-100 text-green-800";
      case "under review":
      case "investigation":
        return "bg-blue-100 text-blue-800";
      case "pending payment":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and settings
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview */}
          <Card title="Profile Information">
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt={userData.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gray-600">
                      {userData.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {userData.name}
                  </h2>
                  {userData.verified && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-600">{userData.phone}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Member since: {userData.joinDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <FormField value={userData.name} />
                  ) : (
                    <p className="text-gray-900">{userData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <FormField type="email" value={userData.email} />
                  ) : (
                    <p className="text-gray-900">{userData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  {isEditing ? (
                    <FormField type="tel" value={userData.phone} />
                  ) : (
                    <p className="text-gray-900">{userData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    National ID
                  </label>
                  <p className="text-gray-900">{userData.nid}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <FormField type="date" value={userData.dateOfBirth} />
                  ) : (
                    <p className="text-gray-900">{userData.dateOfBirth}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  {isEditing ? (
                    <FormField type="select" value={userData.gender}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </FormField>
                  ) : (
                    <p className="text-gray-900">{userData.gender}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  {isEditing ? (
                    <FormField value={userData.occupation} />
                  ) : (
                    <p className="text-gray-900">{userData.occupation}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <FormField type="tel" value={userData.emergencyContact} />
                  ) : (
                    <p className="text-gray-900">{userData.emergencyContact}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              {isEditing ? (
                <FormField type="textarea" value={userData.address} rows={3} />
              ) : (
                <p className="text-gray-900">{userData.address}</p>
              )}
            </div>

            {isEditing && (
              <div className="mt-6 pt-6 border-t flex gap-3">
                <Button variant="success">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </Card>

          {/* Recent Cases */}
          <Card title="My Recent Cases">
            <div className="space-y-4">
              {userData.recentCases.map((case_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{case_.id}</h4>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                          case_.priority
                        )}`}
                      >
                        {case_.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{case_.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{case_.type}</span>
                      <span>•</span>
                      <span>{case_.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        case_.status
                      )}`}
                    >
                      {case_.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Button className="w-full">File New Case</Button>
              <Button variant="outline" className="w-full">
                Track Existing Case
              </Button>
              <Button variant="outline" className="w-full">
                Pay Traffic Fine
              </Button>
              <Button variant="outline" className="w-full">
                Download Documents
              </Button>
            </div>
          </Card>

          {/* Account Security */}
          <Card title="Account Security">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Password</span>
                <Button variant="ghost" size="sm">
                  Change
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Two-Factor Auth</span>
                <span className="text-sm text-red-600">Disabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Login Sessions</span>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card title="Recent Notifications">
            <div className="space-y-3">
              {userData.notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.read ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <p className="text-sm text-gray-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.date}
                  </p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </div>
          </Card>

          {/* Account Stats */}
          <Card title="Account Statistics">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Cases</span>
                <span className="font-medium">
                  {userData.recentCases.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Cases</span>
                <span className="font-medium">
                  {
                    userData.recentCases.filter(
                      (c) => c.status === "Under Review"
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Resolved Cases</span>
                <span className="font-medium">
                  {
                    userData.recentCases.filter(
                      (c) => c.status === "Resolved" || c.status === "Paid"
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Login</span>
                <span className="font-medium text-xs">
                  {userData.lastLogin}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
