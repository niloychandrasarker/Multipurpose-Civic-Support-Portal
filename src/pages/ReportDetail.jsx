import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  getIssuesByVotes,
  updateIssueStatus,
  ISSUE_STATUS,
} from "../data/issuesData";

const ReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      const allReports = getIssuesByVotes();
      const foundReport = allReports.find((r) => r.id === reportId);

      if (foundReport) {
        setReport(foundReport);
        setNewStatus(foundReport.status);
      }
      setLoading(false);
    };

    loadData();
  }, [reportId]);

  const loadReportDetails = () => {
    setLoading(true);
    const allReports = getIssuesByVotes();
    const foundReport = allReports.find((r) => r.id === reportId);

    if (foundReport) {
      setReport(foundReport);
      setNewStatus(foundReport.status);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async () => {
    if (!report || newStatus === report.status) return;

    setUpdating(true);
    const success = updateIssueStatus(report.id, newStatus);

    if (success) {
      // Reload report details
      loadReportDetails();
      alert(`রিপোর্ট স্ট্যাটাস সফলভাবে আপডেট হয়েছে: ${newStatus}`);
    } else {
      alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে");
    }
    setUpdating(false);
  };

  const handleReject = () => {
    if (
      window.confirm("আপনি কি নিশ্চিত যে এই রিপোর্টটি প্রত্যাখ্যান করতে চান?")
    ) {
      setNewStatus("Rejected");
      setTimeout(() => {
        handleStatusUpdate();
      }, 100);
    }
  };

  const handleRemove = () => {
    if (
      window.confirm(
        "আপনি কি নিশ্চিত যে এই রিপোর্টটি সম্পূর্ণভাবে মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।"
      )
    ) {
      // For now, we'll just navigate back since we don't have a delete function
      // In a real app, you would call a delete function here
      alert("রিপোর্ট মুছে ফেলার কার্যকারিতা শীঘ্রই যোগ করা হবে");
      navigate("/admin");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "under review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">রিপোর্ট লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          রিপোর্ট পাওয়া যায়নি
        </h2>
        <p className="text-gray-600 mb-6">
          দুঃখিত, এই ID এর কোন রিপোর্ট খুঁজে পাওয়া যায়নি।
        </p>
        <Button onClick={() => navigate("/admin")} variant="ghost">
          ← অ্যাডমিন ড্যাশবোর্ডে ফিরে যান
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <Button
            onClick={() => navigate("/admin")}
            variant="ghost"
            size="sm"
            className="mb-4"
          >
            ← অ্যাডমিন ড্যাশবোর্ডে ফিরে যান
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">{report.title}</h1>
          <p className="text-gray-600 mt-1">রিপোর্ট ID: {report.id}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
              report.status
            )}`}
          >
            {report.status}
          </span>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
              report.priority
            )}`}
          >
            {report.priority}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card title="রিপোর্ট বিবরণ">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {report.description}
            </p>
          </Card>

          {/* Location Details */}
          <Card title="লোকেশন তথ্য">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">ঠিকানা</p>
                <p className="text-gray-900">{report.location.address}</p>
              </div>
              {report.location.coordinates && (
                <div>
                  <p className="text-sm font-medium text-gray-700">স্থানাঙ্ক</p>
                  <p className="text-gray-600 text-sm">
                    অক্ষাংশ: {report.location.coordinates.lat}, দ্রাঘিমাংশ:{" "}
                    {report.location.coordinates.lng}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Attachments */}
          {report.attachments && report.attachments.length > 0 && (
            <Card title="সংযুক্ত ফাইল">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    {file.type === "image" && file.url ? (
                      <div className="space-y-3">
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="hidden w-full h-full items-center justify-center bg-gray-100">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🖼️</div>
                              <p className="text-sm text-gray-500">
                                ছবি লোড হতে পারেনি
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">{file.size}</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(file.url, "_blank")}
                            >
                              👁️ দেখুন
                            </Button>
                            <Button variant="ghost" size="sm">
                              📥 ডাউনলোড
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : file.type === "video" && file.url ? (
                      <div className="space-y-3">
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          {file.thumbnail ? (
                            <div className="relative w-full h-full">
                              <img
                                src={file.thumbnail}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                  <div className="text-2xl">▶️</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <div className="text-center">
                                <div className="text-4xl mb-2">🎥</div>
                                <p className="text-sm text-gray-500">
                                  ভিডিও ফাইল
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">{file.size}</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(file.url, "_blank")}
                            >
                              ▶️ চালান
                            </Button>
                            <Button variant="ghost" size="sm">
                              📥 ডাউনলোড
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">📎</div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          📥 ডাউনলোড
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Status History */}
          {report.statusHistory && report.statusHistory.length > 0 && (
            <Card title="স্ট্যাটাস ইতিহাস">
              <div className="space-y-4">
                {report.statusHistory.map((entry, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {entry.status}
                        </p>
                        {entry.note && (
                          <p className="text-sm text-gray-600 mt-1">
                            {entry.note}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString("bn-BD")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Reporter Info */}
          <Card title="রিপোর্টার তথ্য">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">নাম</p>
                <p className="text-gray-900">{report.reportedBy.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">ফোন</p>
                <p className="text-gray-900">{report.reportedBy.phone}</p>
              </div>
              {report.reportedBy.email && (
                <div>
                  <p className="text-sm font-medium text-gray-700">ইমেইল</p>
                  <p className="text-gray-900">{report.reportedBy.email}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Report Stats */}
          <Card title="রিপোর্ট পরিসংখ্যান">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">ক্যাটেগরি</p>
                <p className="text-gray-900">{report.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">তৈরির তারিখ</p>
                <p className="text-gray-900">
                  {new Date(report.createdAt).toLocaleDateString("bn-BD")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  সর্বশেষ আপডেট
                </p>
                <p className="text-gray-900">
                  {new Date(report.updatedAt).toLocaleDateString("bn-BD")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">নাগরিক ভোট</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-green-600">
                    👍 {report.votes.upvotes}
                  </span>
                  <span className="text-red-600">
                    👎 {report.votes.downvotes}
                  </span>
                  <span className="text-gray-600">
                    মোট: {report.votes.total}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Admin Actions */}
          <Card title="অ্যাডমিন অ্যাকশন">
            <div className="space-y-4">
              {/* Status Update */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  স্ট্যাটাস আপডেট করুন
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.values(ISSUE_STATUS).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleStatusUpdate}
                  disabled={newStatus === report.status || updating}
                  className="w-full"
                  variant={newStatus === report.status ? "ghost" : "primary"}
                >
                  {updating ? "আপডেট হচ্ছে..." : "স্ট্যাটাস আপডেট করুন"}
                </Button>

                <Button
                  onClick={handleReject}
                  disabled={report.status === "Rejected" || updating}
                  variant="danger"
                  className="w-full"
                >
                  রিপোর্ট প্রত্যাখ্যান করুন
                </Button>

                <Button
                  onClick={handleRemove}
                  disabled={updating}
                  variant="danger"
                  className="w-full"
                >
                  রিপোর্ট মুছে ফেলুন
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
