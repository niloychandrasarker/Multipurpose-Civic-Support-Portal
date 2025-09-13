import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";
import {
  getIssuesByVotes,
  voteOnIssue,
  getIssueStats,
  ISSUE_STATUS,
  ISSUE_CATEGORIES,
} from "../data/issuesData";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const IssueTracking = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const highlightId = query.get("highlight");

  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("votes"); // votes, date, status
  const [stats, setStats] = useState({});
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadIssues = () => {
    const allIssues = getIssuesByVotes();
    setIssues(allIssues);
    setStats(getIssueStats());
  };

  const filterAndSortIssues = useCallback(() => {
    let filtered = [...issues];

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter((issue) => issue.status === selectedStatus);
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (issue) => issue.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (issue) =>
          issue.title.toLowerCase().includes(term) ||
          issue.description.toLowerCase().includes(term) ||
          issue.location.address.toLowerCase().includes(term) ||
          issue.reportedBy.name.toLowerCase().includes(term)
      );
    }

    // Sort issues
    if (sortBy === "votes") {
      filtered.sort((a, b) => b.votes.total - a.votes.total);
    } else if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "status") {
      filtered.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredIssues(filtered);
  }, [issues, selectedStatus, selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    loadIssues();
  }, []);

  useEffect(() => {
    filterAndSortIssues();
  }, [filterAndSortIssues]);

  const handleVote = (issueId, voteType) => {
    const success = voteOnIssue(issueId, voteType);
    if (success) {
      loadIssues(); // Reload to get updated vote counts
    }
  };

  const viewIssueDetails = (issue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "text-red-600";
      case "High":
        return "text-orange-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getVotePercentage = (issue) => {
    if (issue.votes.total === 0) return 0;
    return Math.round((issue.votes.upvotes / issue.votes.total) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            নাগরিক সমস্যা ট্র্যাকিং
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            সমস্যাগুলির অগ্রগতি দেখুন এবং ভোট দিয়ে সহায়তা করুন
          </p>
        </div>
        <Button onClick={() => navigate("/report-issue")} className="lg:w-auto">
          📝 নতুন সমস্যা রিপোর্ট করুন
        </Button>
      </div>

      {/* Voting Info Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🗳️ নাগরিক ভোটিং সিস্টেম
          </h3>
          <p className="text-gray-700 mb-3">
            গুরুত্বপূর্ণ সমস্যাগুলিকে অগ্রাধিকার দিতে ভোট দিন! আপনার ভোট
            কর্তৃপক্ষকে জনগণের অগ্রাধিকার বুঝতে সাহায্য করে।
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span>👍</span>
              <span>সমর্থন করি</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👎</span>
              <span>সমর্থন করি না</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📊</span>
              <span>ভোটের শতাংশ জনসমর্থন দেখায়</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">
              {stats.total || 0}
            </div>
            <div className="text-sm text-blue-600">মোট সমস্যা</div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-800">
              {stats.submitted || 0}
            </div>
            <div className="text-sm text-yellow-600">জমা দেওয়া</div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-800">
              {stats.underReview || 0}
            </div>
            <div className="text-sm text-orange-600">পর্যালোচনাধীন</div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-800">
              {stats.inProgress || 0}
            </div>
            <div className="text-sm text-purple-600">কাজ চলমান</div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">
              {stats.resolved || 0}
            </div>
            <div className="text-sm text-green-600">সমাধান হয়েছে</div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-800">
              {stats.rejected || 0}
            </div>
            <div className="text-sm text-red-600">প্রত্যাখ্যাত</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <FormField
              label=""
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 সমস্যা খুঁজুন..."
            />

            <FormField
              label=""
              type="select"
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">সব অবস্থা</option>
              {ISSUE_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </FormField>

            <FormField
              label=""
              type="select"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">সব ধরন</option>
              {ISSUE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FormField>

            <FormField
              label=""
              type="select"
              name="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="votes">ভোট অনুযায়ী</option>
              <option value="date">তারিখ অনুযায়ী</option>
              <option value="status">অবস্থা অনুযায়ী</option>
            </FormField>
          </div>
        </div>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো সমস্যা পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedStatus || selectedCategory
                  ? "অনুসন্ধানের শর্ত পরিবর্তন করে আবার চেষ্টা করুন"
                  : "এখনো কোনো সমস্যা রিপোর্ট করা হয়নি"}
              </p>
              <Button onClick={() => navigate("/report-issue")}>
                প্রথম সমস্যা রিপোর্ট করুন
              </Button>
            </div>
          </Card>
        ) : (
          filteredIssues.map((issue, index) => (
            <Card
              key={issue.id}
              className={`transition-all duration-200 ${
                issue.id === highlightId
                  ? "ring-2 ring-blue-400 bg-blue-50"
                  : "hover:shadow-md"
              }`}
            >
              <div className="space-y-4">
                {/* Issue Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {issue.id}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          issue.status
                        )}`}
                      >
                        {issue.status}
                      </span>
                      <span
                        className={`text-xs font-medium ${getPriorityColor(
                          issue.priority
                        )}`}
                      >
                        🔥 {issue.priority}
                      </span>
                      <span className="text-xs text-gray-500">
                        {issue.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {issue.title}
                    </h3>

                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {issue.description}
                    </p>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📅 রিপোর্ট: {formatDate(issue.createdAt)}</p>
                      <p>
                        📞 যোগাযোগ: {issue.reportedBy.name} -{" "}
                        {issue.reportedBy.phone}
                      </p>
                      <p>📍 স্থান: {issue.location.address}</p>
                      {issue.attachments.length > 0 && (
                        <p>📎 সংযুক্তি: {issue.attachments.length} টি ফাইল</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end gap-2">
                    <div className="text-xs text-gray-500">
                      সর্বশেষ আপডেট: {formatDate(issue.updatedAt)}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => viewIssueDetails(issue)}
                      className="lg:w-auto"
                    >
                      👁️ বিস্তারিত দেখুন
                    </Button>
                  </div>
                </div>

                {/* Voting Section */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">জনসমর্থন:</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote(issue.id, "up")}
                        className="flex items-center space-x-1 px-2 py-1 rounded-md transition-colors bg-white text-gray-600 hover:bg-green-50 border"
                      >
                        <span>👍</span>
                        <span className="text-sm font-medium">
                          {issue.votes.upvotes}
                        </span>
                      </button>

                      <button
                        onClick={() => handleVote(issue.id, "down")}
                        className="flex items-center space-x-1 px-2 py-1 rounded-md transition-colors bg-white text-gray-600 hover:bg-red-50 border"
                      >
                        <span>👎</span>
                        <span className="text-sm font-medium">
                          {issue.votes.downvotes}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{issue.votes.total}</span>{" "}
                      ভোট
                    </div>
                    {issue.votes.total > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-l-full"
                            style={{ width: `${getVotePercentage(issue)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {getVotePercentage(issue)}% সমর্থন
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Issue Details Modal */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedIssue.title}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {selectedIssue.id}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedIssue.status
                    )}`}
                  >
                    {selectedIssue.status}
                  </span>
                  <span
                    className={`text-xs font-medium ${getPriorityColor(
                      selectedIssue.priority
                    )}`}
                  >
                    🔥 {selectedIssue.priority}
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedIssue.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  বিস্তারিত বর্ণনা
                </h3>
                <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                  {selectedIssue.description}
                </p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  অবস্থান
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <strong>ঠিকানা:</strong> {selectedIssue.location.address}
                  </p>
                  {selectedIssue.location.coordinates.lat &&
                    selectedIssue.location.coordinates.lng && (
                      <p>
                        <strong>স্থানাঙ্ক:</strong>{" "}
                        {selectedIssue.location.coordinates.lat},{" "}
                        {selectedIssue.location.coordinates.lng}
                      </p>
                    )}
                </div>
              </div>

              {/* Reporter Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  রিপোর্টার তথ্য
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <strong>নাম:</strong> {selectedIssue.reportedBy.name}
                  </p>
                  <p>
                    <strong>ফোন:</strong> {selectedIssue.reportedBy.phone}
                  </p>
                  {selectedIssue.reportedBy.email && (
                    <p>
                      <strong>ইমেইল:</strong> {selectedIssue.reportedBy.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Attachments */}
              {selectedIssue.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    সংযুক্তি ({selectedIssue.attachments.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedIssue.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-3 bg-gray-50"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">
                            {attachment.type === "image" ? "📷" : "🎥"}
                          </span>
                          <div>
                            <p className="text-sm font-medium">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {attachment.size}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Voting Stats */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  জনসমর্থন
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-6 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">👍</span>
                      <span className="font-medium">
                        {selectedIssue.votes.upvotes} সমর্থন
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">👎</span>
                      <span className="font-medium">
                        {selectedIssue.votes.downvotes} বিরোধিতা
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {selectedIssue.votes.total} মোট ভোট
                      </span>
                    </div>
                  </div>
                  {selectedIssue.votes.total > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${getVotePercentage(selectedIssue)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {getVotePercentage(selectedIssue)}% সমর্থন
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  অবস্থার ইতিহাস
                </h3>
                <div className="space-y-3">
                  {selectedIssue.statusHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg"
                    >
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          entry.status
                        )}`}
                      >
                        {entry.status}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          {formatDate(entry.timestamp)}
                        </p>
                        {entry.note && (
                          <p className="text-sm text-gray-700 mt-1">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end">
              <Button onClick={() => setShowModal(false)}>বন্ধ করুন</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueTracking;
