import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in real app, fetch from API based on id
  const userData = {
    id: id || "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+880 1712-345678",
    nid: "1234567890123",
    address: "123 Gulshan Avenue, Dhaka-1212, Bangladesh",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    occupation: "Software Engineer",
    emergencyContact: "+880 1712-345679",
    status: "Active",
    joinDate: "2025-01-15",
    lastLogin: "2025-09-11 03:45 PM",
    verified: true,
    profileImage: null,
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
      {
        id: "CASE003",
        type: "Legal Case",
        title: "Property Dispute Resolution",
        status: "Resolved",
        date: "2025-07-10",
        priority: "Medium",
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
      {
        id: 3,
        message: "Welcome to Civic Support Portal",
        date: "2025-01-15",
        read: true,
      },
    ],
    documents: [
      {
        name: "National_ID_Copy.pdf",
        type: "Identity",
        uploadDate: "2025-01-15",
        verified: true,
      },
      {
        name: "Address_Proof.pdf",
        type: "Address",
        uploadDate: "2025-01-15",
        verified: true,
      },
      {
        name: "Income_Certificate.pdf",
        type: "Financial",
        uploadDate: "2025-02-01",
        verified: false,
      },
    ],
    activityLog: [
      {
        date: "2025-09-11 03:45 PM",
        action: "Logged In",
        ip: "103.230.104.***",
      },
      {
        date: "2025-09-11 02:30 PM",
        action: "Case Status Checked",
        details: "Viewed case GD001",
      },
      {
        date: "2025-09-10 10:30 AM",
        action: "New Case Filed",
        details: "Filed GD001 - Theft Report",
      },
      {
        date: "2025-09-09 06:15 PM",
        action: "Logged In",
        ip: "103.230.104.***",
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
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/admin")}
              className="mb-4 text-blue-600 hover:text-blue-800"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="text-gray-600 mt-2">User ID: {userData.id}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
            <Button variant="success">Export Data</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview */}
          <Card title="Profile Information">
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt={userData.name}
                      className="w-24 h-24 rounded-full object-cover"
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
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userData.name}
                  </h2>
                  {userData.verified && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      userData.status
                    )}`}
                  >
                    {userData.status}
                  </span>
                </div>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-600">{userData.phone}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Last login: {userData.lastLogin}
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
              </div>

              <div className="space-y-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  {isEditing ? (
                    <FormField type="select" value={userData.status}>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Suspended</option>
                    </FormField>
                  ) : (
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        userData.status
                      )}`}
                    >
                      {userData.status}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <p className="text-gray-900">{userData.joinDate}</p>
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
          <Card title="Recent Cases">
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/cases/${case_.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Log */}
          <Card title="Recent Activity">
            <div className="space-y-4">
              {userData.activityLog.map((activity, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.action}
                        </p>
                        {activity.details && (
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.details}
                          </p>
                        )}
                        {activity.ip && (
                          <p className="text-xs text-gray-500 mt-1">
                            IP: {activity.ip}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {activity.date}
                      </span>
                    </div>
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
              <Button className="w-full">Send Message</Button>
              <Button variant="outline" className="w-full">
                Schedule Call
              </Button>
              <Button variant="outline" className="w-full">
                Reset Password
              </Button>
              <Button variant="outline" className="w-full">
                View All Cases
              </Button>
              {userData.status === "Active" ? (
                <Button variant="danger" className="w-full">
                  Suspend User
                </Button>
              ) : (
                <Button variant="success" className="w-full">
                  Activate User
                </Button>
              )}
            </div>
          </Card>

          {/* User Statistics */}
          <Card title="User Statistics">
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
                <span className="text-sm text-gray-600">Account Age</span>
                <span className="font-medium">8 months</span>
              </div>
            </div>
          </Card>

          {/* Documents */}
          <Card title="Documents">
            <div className="space-y-3">
              {userData.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {doc.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                      {doc.verified && (
                        <>
                          <span>•</span>
                          <span className="text-green-600 font-medium">
                            ✓ Verified
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    📄 View
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                + Upload Document
              </Button>
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
