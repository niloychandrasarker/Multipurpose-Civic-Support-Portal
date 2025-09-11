import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Modal from "../components/Modal";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Mock data
  const stats = [
    {
      label: "Total Cases",
      value: "1,234",
      change: "+12%",
      color: "text-blue-600",
    },
    {
      label: "Pending Cases",
      value: "156",
      change: "-5%",
      color: "text-orange-600",
    },
    {
      label: "Resolved Cases",
      value: "1,078",
      change: "+15%",
      color: "text-green-600",
    },
    {
      label: "Active Users",
      value: "5,432",
      change: "+8%",
      color: "text-purple-600",
    },
  ];

  const recentCases = [
    {
      id: "GD001",
      type: "GD Filing",
      user: "John Doe",
      status: "Under Review",
      date: "2025-09-10",
      priority: "High",
    },
    {
      id: "CASE002",
      type: "Legal Case",
      user: "Jane Smith",
      status: "Resolved",
      date: "2025-09-08",
      priority: "Medium",
    },
    {
      id: "FINE003",
      type: "Traffic Fine",
      user: "Mike Johnson",
      status: "Pending Payment",
      date: "2025-09-05",
      priority: "Low",
    },
    {
      id: "GD004",
      type: "GD Filing",
      user: "Sarah Wilson",
      status: "Investigation",
      date: "2025-09-09",
      priority: "High",
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      status: "Active",
      joinDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      status: "Active",
      joinDate: "2025-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 9876543212",
      status: "Inactive",
      joinDate: "2025-03-10",
    },
  ];

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
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

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "cases", name: "Manage Cases", icon: "📁" },
    { id: "users", name: "Manage Users", icon: "👥" },
    { id: "analytics", name: "Analytics", icon: "📈" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm ${stat.color} font-medium`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCases.slice(0, 5).map((case_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {case_.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {case_.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {case_.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        case_.status
                      )}`}
                    >
                      {case_.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                        case_.priority
                      )}`}
                    >
                      {case_.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {case_.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Case Management">
          <p className="text-gray-600 mb-4">Manage and review all cases</p>
          <Button onClick={() => setActiveTab("cases")} className="w-full">
            Manage Cases
          </Button>
        </Card>
        <Card title="User Management">
          <p className="text-gray-600 mb-4">Add, edit, or remove users</p>
          <Button onClick={() => setActiveTab("users")} className="w-full">
            Manage Users
          </Button>
        </Card>
        <Card title="System Settings">
          <p className="text-gray-600 mb-4">Configure system settings</p>
          <Button onClick={() => setActiveTab("settings")} className="w-full">
            Settings
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderCases = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Case Management</h2>
        <Button onClick={() => openModal("addCase")}>Add New Case</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCases.map((case_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {case_.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {case_.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {case_.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select className="text-xs border rounded px-2 py-1">
                      <option value={case_.status}>{case_.status}</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Investigation">Investigation</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select className="text-xs border rounded px-2 py-1">
                      <option value={case_.priority}>{case_.priority}</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {case_.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <Button onClick={() => openModal("addUser")}>Add New User</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="danger" size="sm">
                        Deactivate
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Case Trends">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600">Chart Placeholder</p>
              <p className="text-sm text-gray-500">
                Cases over time visualization
              </p>
            </div>
          </div>
        </Card>

        <Card title="User Activity">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">👥</div>
              <p className="text-gray-600">Chart Placeholder</p>
              <p className="text-sm text-gray-500">User engagement metrics</p>
            </div>
          </div>
        </Card>

        <Card title="Case Resolution Time">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">⏱️</div>
              <p className="text-gray-600">Chart Placeholder</p>
              <p className="text-sm text-gray-500">Average resolution time</p>
            </div>
          </div>
        </Card>

        <Card title="Department Performance">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🏢</div>
              <p className="text-gray-600">Chart Placeholder</p>
              <p className="text-sm text-gray-500">
                Department-wise statistics
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="General Settings">
          <div className="space-y-4">
            <FormField label="System Name" value="Civic Support Portal" />
            <FormField label="Admin Email" value="admin@civicportal.gov" />
            <FormField label="Support Phone" value="+91-11-12345678" />
            <Button>Update Settings</Button>
          </div>
        </Card>

        <Card title="Security Settings">
          <div className="space-y-4">
            <FormField
              label="Session Timeout (minutes)"
              value="30"
              type="number"
            />
            <FormField label="Password Policy" type="select">
              <option>Strong (recommended)</option>
              <option>Medium</option>
              <option>Basic</option>
            </FormField>
            <div className="flex items-center">
              <input type="checkbox" id="2fa" className="mr-2" />
              <label htmlFor="2fa">Enable Two-Factor Authentication</label>
            </div>
            <Button>Update Security</Button>
          </div>
        </Card>

        <Card title="Notification Settings">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifs"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="emailNotifs">Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifs"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="smsNotifs">SMS Notifications</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="pushNotifs" className="mr-2" />
              <label htmlFor="pushNotifs">Push Notifications</label>
            </div>
            <Button>Update Notifications</Button>
          </div>
        </Card>

        <Card title="Backup & Maintenance">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Last backup: September 10, 2025
            </p>
            <Button variant="outline">Create Backup</Button>
            <Button variant="outline">Schedule Maintenance</Button>
            <Button variant="danger">System Reset</Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderModalContent = () => {
    if (modalType === "addCase") {
      return (
        <div className="space-y-4">
          <FormField label="Case Type" type="select">
            <option>GD Filing</option>
            <option>Legal Case</option>
            <option>Traffic Fine</option>
            <option>Other</option>
          </FormField>
          <FormField label="Case Title" placeholder="Enter case title" />
          <FormField label="Assigned User" type="select">
            <option>Select User</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </FormField>
          <FormField label="Priority" type="select">
            <option>Medium</option>
            <option>High</option>
            <option>Low</option>
          </FormField>
          <FormField
            label="Description"
            type="textarea"
            placeholder="Case description..."
          />
          <div className="flex gap-2">
            <Button onClick={closeModal}>Cancel</Button>
            <Button variant="success">Create Case</Button>
          </div>
        </div>
      );
    }

    if (modalType === "addUser") {
      return (
        <div className="space-y-4">
          <FormField label="Full Name" placeholder="Enter full name" />
          <FormField label="Email" type="email" placeholder="Enter email" />
          <FormField
            label="Phone"
            type="tel"
            placeholder="Enter phone number"
          />
          <FormField label="Role" type="select">
            <option>Citizen</option>
            <option>Officer</option>
            <option>Admin</option>
          </FormField>
          <div className="flex gap-2">
            <Button onClick={closeModal}>Cancel</Button>
            <Button variant="success">Create User</Button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "cases":
        return renderCases();
      case "users":
        return renderUsers();
      case "analytics":
        return renderAnalytics();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage cases, users, and system settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalType === "addCase" ? "Add New Case" : "Add New User"}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
