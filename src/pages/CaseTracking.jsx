import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";

const CaseTracking = () => {
  const [searchType, setSearchType] = useState("caseId");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  // Mock data for demonstration
  const mockCases = [
    {
      id: "GD001",
      type: "GD Filing",
      title: "Theft Report",
      status: "Under Investigation",
      filedDate: "2025-09-10",
      lastUpdate: "2025-09-11",
      officer: "Inspector Sharma",
      station: "Central Police Station",
      description: "Mobile phone theft case",
      updates: [
        {
          date: "2025-09-10",
          status: "Case Filed",
          description: "GD report submitted successfully",
        },
        {
          date: "2025-09-11",
          status: "Under Investigation",
          description: "Investigation assigned to Detective Unit",
        },
      ],
    },
    {
      id: "CASE002",
      type: "Legal Case",
      title: "Property Dispute",
      status: "Resolved",
      filedDate: "2025-08-15",
      lastUpdate: "2025-09-08",
      officer: "Magistrate Kumar",
      station: "District Court",
      description: "Property boundary dispute resolution",
      updates: [
        {
          date: "2025-08-15",
          status: "Case Filed",
          description: "Legal proceedings initiated",
        },
        {
          date: "2025-08-25",
          status: "Hearing Scheduled",
          description: "First hearing scheduled",
        },
        {
          date: "2025-09-08",
          status: "Resolved",
          description: "Case resolved in favor of plaintiff",
        },
      ],
    },
    {
      id: "FINE003",
      type: "Traffic Fine",
      title: "Speed Violation",
      status: "Pending Payment",
      filedDate: "2025-09-05",
      lastUpdate: "2025-09-05",
      officer: "Traffic Constable Patel",
      station: "Traffic Police",
      amount: "৳3,000",
      description: "Over-speeding fine",
      updates: [
        {
          date: "2025-09-05",
          status: "Fine Issued",
          description: "Speed violation detected at City Highway",
        },
      ],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    // Simulate search
    const results = mockCases.filter((case_) => {
      if (searchType === "caseId") {
        return case_.id.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchType === "mobile") {
        // In real implementation, this would search by mobile number
        return true; // Return all cases for demo
      }
      return false;
    });

    setSearchResults(results);
    setSelectedCase(null);
  };

  const handleCaseSelect = (case_) => {
    setSelectedCase(case_);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "under investigation":
        return "bg-blue-100 text-blue-800";
      case "pending payment":
        return "bg-red-100 text-red-800";
      case "hearing scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Case & Fine Tracking
        </h1>
        <p className="text-gray-600">
          Track the status of your cases and fines
        </p>
      </div>

      {/* Search Section */}
      <Card title="Search Your Cases">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search By
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="caseId"
                  checked={searchType === "caseId"}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                Case ID
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="mobile"
                  checked={searchType === "mobile"}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                Mobile Number
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <FormField
              label={
                searchType === "caseId"
                  ? "Enter Case ID"
                  : "Enter Mobile Number"
              }
              name="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                searchType === "caseId"
                  ? "e.g., GD001, CASE002"
                  : "e.g., +91 9876543210"
              }
              required
              className="flex-1"
            />
            <div className="flex items-end">
              <Button type="submit" className="mb-4">
                Search
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search Results */}
        <div className="lg:col-span-1">
          {searchResults && (
            <Card title="Search Results">
              {searchResults.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No cases found</p>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((case_, index) => (
                    <div
                      key={index}
                      onClick={() => handleCaseSelect(case_)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedCase?.id === case_.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">
                          {case_.id}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            case_.status
                          )}`}
                        >
                          {case_.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{case_.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last updated: {case_.lastUpdate}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <div className="space-y-6">
              <Card title="Case Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Case Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Case ID:</strong> {selectedCase.id}
                      </p>
                      <p>
                        <strong>Type:</strong> {selectedCase.type}
                      </p>
                      <p>
                        <strong>Title:</strong> {selectedCase.title}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                            selectedCase.status
                          )}`}
                        >
                          {selectedCase.status}
                        </span>
                      </p>
                      {selectedCase.amount && (
                        <p>
                          <strong>Amount:</strong> {selectedCase.amount}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Case Management
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Filed Date:</strong> {selectedCase.filedDate}
                      </p>
                      <p>
                        <strong>Last Update:</strong> {selectedCase.lastUpdate}
                      </p>
                      <p>
                        <strong>Assigned Officer:</strong>{" "}
                        {selectedCase.officer}
                      </p>
                      <p>
                        <strong>Station/Court:</strong> {selectedCase.station}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedCase.description}
                  </p>
                </div>
              </Card>

              <Card title="Case Timeline">
                <div className="space-y-4">
                  {selectedCase.updates.map((update, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium text-gray-900">
                            {update.status}
                          </h5>
                          <span className="text-sm text-gray-500">
                            {update.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {selectedCase.type === "Traffic Fine" &&
                selectedCase.status === "Pending Payment" && (
                  <Card title="Actions">
                    <div className="flex space-x-4">
                      <Button variant="success">
                        Pay Fine ({selectedCase.amount})
                      </Button>
                      <Button variant="outline">Contest Fine</Button>
                      <Button variant="outline">Download Challan</Button>
                    </div>
                  </Card>
                )}
            </div>
          ) : searchResults ? (
            <Card>
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Select a Case
                </h3>
                <p className="text-gray-500">
                  Click on a case from the search results to view details
                </p>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Search for Cases
                </h3>
                <p className="text-gray-500">
                  Enter your case ID or mobile number to track your cases and
                  fines
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseTracking;
