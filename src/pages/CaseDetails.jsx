import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock case data - in real app, fetch from API based on id
  const caseData = {
    id: id || "GD001",
    type: "GD Filing",
    title: "Theft Report - Missing Mobile Phone",
    user: "John Doe",
    userEmail: "john.doe@email.com",
    userPhone: "+880 1712-345678",
    status: "Under Review",
    priority: "High",
    date: "2025-09-10",
    createdAt: "2025-09-10 10:30 AM",
    updatedAt: "2025-09-11 02:15 PM",
    assignedOfficer: "Inspector Rahman",
    department: "Cyber Crime Unit",
    location: "Dhaka Metropolitan Police",
    description:
      "Mobile phone was stolen from Gulshan area near DCC Market. The victim reported that a Samsung Galaxy S23 was taken while shopping. CCTV footage is available and witness statements have been collected.",
    evidence: [
      { type: "CCTV Footage", status: "Collected", date: "2025-09-10" },
      { type: "Witness Statement", status: "Recorded", date: "2025-09-10" },
      { type: "Mobile IMEI", status: "Tracked", date: "2025-09-11" },
    ],
    timeline: [
      {
        date: "2025-09-10 10:30 AM",
        action: "Case Filed",
        officer: "Constable Ahmed",
        note: "Initial complaint received",
      },
      {
        date: "2025-09-10 02:00 PM",
        action: "Investigation Started",
        officer: "Inspector Rahman",
        note: "Assigned to cyber crime unit",
      },
      {
        date: "2025-09-11 10:00 AM",
        action: "Evidence Collection",
        officer: "Detective Khan",
        note: "CCTV footage and witness statements collected",
      },
      {
        date: "2025-09-11 02:15 PM",
        action: "Status Updated",
        officer: "Inspector Rahman",
        note: "Under review for further investigation",
      },
    ],
    attachments: [
      { name: "Complaint_Form.pdf", size: "245 KB", uploadDate: "2025-09-10" },
      { name: "CCTV_Footage.mp4", size: "15.2 MB", uploadDate: "2025-09-11" },
      {
        name: "Witness_Statement.pdf",
        size: "180 KB",
        uploadDate: "2025-09-10",
      },
    ],
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
      case "collected":
      case "recorded":
      case "tracked":
        return "bg-green-100 text-green-800";
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
            <h1 className="text-3xl font-bold text-gray-900">Case Details</h1>
            <p className="text-gray-600 mt-2">Case ID: {caseData.id}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel Edit" : "Edit Case"}
            </Button>
            <Button variant="success">Print Report</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Overview */}
          <Card title="Case Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Case Title
                  </label>
                  {isEditing ? (
                    <FormField value={caseData.title} />
                  ) : (
                    <p className="text-gray-900">{caseData.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  {isEditing ? (
                    <FormField type="select" value={caseData.type}>
                      <option>GD Filing</option>
                      <option>Legal Case</option>
                      <option>Traffic Fine</option>
                      <option>Other</option>
                    </FormField>
                  ) : (
                    <p className="text-gray-900">{caseData.type}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  {isEditing ? (
                    <FormField type="select" value={caseData.status}>
                      <option>Under Review</option>
                      <option>Investigation</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </FormField>
                  ) : (
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        caseData.status
                      )}`}
                    >
                      {caseData.status}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  {isEditing ? (
                    <FormField type="select" value={caseData.priority}>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </FormField>
                  ) : (
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(
                        caseData.priority
                      )}`}
                    >
                      {caseData.priority}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned Officer
                  </label>
                  {isEditing ? (
                    <FormField value={caseData.assignedOfficer} />
                  ) : (
                    <p className="text-gray-900">{caseData.assignedOfficer}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <p className="text-gray-900">{caseData.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <p className="text-gray-900">{caseData.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filed Date
                  </label>
                  <p className="text-gray-900">{caseData.createdAt}</p>
                </div>
              </div>
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

          {/* Case Description */}
          <Card title="Case Description">
            {isEditing ? (
              <FormField
                type="textarea"
                value={caseData.description}
                rows={6}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {caseData.description}
              </p>
            )}
          </Card>

          {/* Evidence */}
          <Card title="Evidence Collected">
            <div className="space-y-4">
              {caseData.evidence.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-600">
                      Collected on: {item.date}
                    </p>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card title="Case Timeline">
            <div className="space-y-4">
              {caseData.timeline.map((event, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {event.action}
                        </p>
                        <p className="text-sm text-gray-600">
                          by {event.officer}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {event.note}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {event.date}
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
          {/* Complainant Details */}
          <Card title="Complainant Details">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <p className="text-gray-900">{caseData.user}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{caseData.userEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-gray-900">{caseData.userPhone}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/admin/users/${caseData.user}`)}
              >
                View Full Profile
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Button className="w-full">Send Notification</Button>
              <Button variant="outline" className="w-full">
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full">
                Add Note
              </Button>
              <Button variant="outline" className="w-full">
                Upload Document
              </Button>
              <Button variant="danger" className="w-full">
                Close Case
              </Button>
            </div>
          </Card>

          {/* Attachments */}
          <Card title="Attachments">
            <div className="space-y-3">
              {caseData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {file.size} • {file.uploadDate}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    📄 View
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                + Add Attachment
              </Button>
            </div>
          </Card>

          {/* Case Statistics */}
          <Card title="Case Statistics">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Days Open</span>
                <span className="font-medium">3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Updates</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Evidence Items</span>
                <span className="font-medium">{caseData.evidence.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Attachments</span>
                <span className="font-medium">
                  {caseData.attachments.length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
