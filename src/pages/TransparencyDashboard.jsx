import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getIssuesByVotes } from "../data/issuesData";

const TransparencyDashboard = () => {
  const navigate = useNavigate();
  const [publicData, setPublicData] = useState({
    totalReports: 0,
    resolvedReports: 0,
    pendingReports: 0,
    activeOfficers: 0,
    totalBudget: 0,
    usedBudget: 0,
    publicProjects: [],
    governmentExpenses: [],
    reportStats: [],
    officerPerformance: [],
    publicMeetings: [],
    tenderInfo: [],
    auditReports: [],
  });

  const [timeFilter, setTimeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedView, setSelectedView] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTransparencyData();
  }, [timeFilter, categoryFilter]);

  const loadTransparencyData = () => {
    const issues = getIssuesByVotes();

    // Calculate transparent statistics
    const totalReports = issues.length;
    const resolvedReports = issues.filter(
      (issue) => issue.status === "সমাধানকৃত"
    ).length;
    const pendingReports = issues.filter(
      (issue) => issue.status === "প্রক্রিয়াধীন"
    ).length;

    // Enhanced government data for transparency
    const governmentExpenses = [
      {
        category: "রাস্তা মেরামত",
        allocated: 5000000,
        spent: 3200000,
        percentage: 64,
        lastUpdated: "2025-09-10",
      },
      {
        category: "বিদ্যুৎ সেবা",
        allocated: 3000000,
        spent: 2800000,
        percentage: 93,
        lastUpdated: "2025-09-08",
      },
      {
        category: "পানি সরবরাহ",
        allocated: 2500000,
        spent: 1900000,
        percentage: 76,
        lastUpdated: "2025-09-12",
      },
      {
        category: "আবর্জনা ব্যবস্থাপনা",
        allocated: 1500000,
        spent: 1200000,
        percentage: 80,
        lastUpdated: "2025-09-09",
      },
      {
        category: "স্ট্রিট লাইট",
        allocated: 1000000,
        spent: 850000,
        percentage: 85,
        lastUpdated: "2025-09-11",
      },
      {
        category: "পার্ক ও বিনোদন",
        allocated: 800000,
        spent: 600000,
        percentage: 75,
        lastUpdated: "2025-09-07",
      },
    ];

    const publicProjects = [
      {
        id: 1,
        name: "ঢাকা-চট্টগ্রাম হাইওয়ে সম্প্রসারণ",
        budget: 15000000,
        spent: 8500000,
        progress: 65,
        startDate: "2024-01-15",
        expectedEnd: "2025-12-31",
        contractor: "বাংলাদেশ সড়ক নির্মাণ কর্পোরেশন",
        status: "চলমান",
        category: "অবকাঠামো",
        location: "ঢাকা-চট্টগ্রাম",
      },
      {
        id: 2,
        name: "গ্রামীণ বিদ্যুতায়ন প্রকল্প",
        budget: 8000000,
        spent: 6200000,
        progress: 78,
        startDate: "2024-03-10",
        expectedEnd: "2025-08-15",
        contractor: "গ্রামীণ বিদ্যুৎ বোর্ড",
        status: "চলমান",
        category: "ইউটিলিটি",
        location: "সারাদেশ",
      },
      {
        id: 3,
        name: "জল নিষ্কাশন ব্যবস্থা উন্নয়ন",
        budget: 5500000,
        spent: 5500000,
        progress: 100,
        startDate: "2023-06-01",
        expectedEnd: "2024-05-30",
        contractor: "ওয়াসা",
        status: "সম্পন্ন",
        category: "অবকাঠামো",
        location: "ঢাকা",
      },
      {
        id: 4,
        name: "ডিজিটাল সেবা কেন্দ্র স্থাপন",
        budget: 3200000,
        spent: 2100000,
        progress: 45,
        startDate: "2024-06-15",
        expectedEnd: "2025-11-30",
        contractor: "আইসিটি বিভাগ",
        status: "চলমান",
        category: "প্রযুক্তি",
        location: "সব জেলা",
      },
    ];

    // Officer Performance Data
    const officerPerformance = [
      {
        name: "জনাব আবদুর রহমান",
        department: "রাস্তা ও জনপথ",
        resolvedCases: 45,
        averageTime: "৭ দিন",
        rating: 4.8,
      },
      {
        name: "জনাবা ফাতিমা খাতুন",
        department: "বিদ্যুৎ বিভাগ",
        resolvedCases: 38,
        averageTime: "৫ দিন",
        rating: 4.9,
      },
      {
        name: "জনাব মোহাম্মদ করিম",
        department: "পানি সরবরাহ",
        resolvedCases: 32,
        averageTime: "৬ দিন",
        rating: 4.6,
      },
      {
        name: "জনাবা রাবেয়া বেগম",
        department: "পরিবেশ বিভাগ",
        resolvedCases: 28,
        averageTime: "৮ দিন",
        rating: 4.7,
      },
    ];

    // Public Meetings & Events
    const publicMeetings = [
      {
        title: "মাসিক নাগরিক সভা",
        date: "2025-09-20",
        time: "১০:০০ AM",
        venue: "জেলা প্রশাসকের কার্যালয়",
        agenda: "রাস্তা মেরামত ও জনসেবা নিয়ে আলোচনা",
        status: "আসন্ন",
      },
      {
        title: "বাজেট অনুমোদন সভা",
        date: "2025-09-25",
        time: "২:০০ PM",
        venue: "সিটি কর্পোরেশন হল",
        agenda: "আগামী বছরের বাজেট পরিকল্পনা",
        status: "আসন্ন",
      },
      {
        title: "উন্নয়ন প্রকল্প পর্যালোচনা",
        date: "2025-09-12",
        time: "১১:০০ AM",
        venue: "জেলা পরিষদ হল",
        agenda: "চলমান প্রকল্পের অগ্রগতি পর্যালোচনা",
        status: "সম্পন্ন",
      },
    ];

    // Tender Information
    const tenderInfo = [
      {
        title: "ঢাকা শহরের রাস্তা মেরামত",
        budget: 2500000,
        deadline: "2025-09-30",
        status: "খোলা",
        department: "রাস্তা ও জনপথ বিভাগ",
        documents: "tender_road_repair.pdf",
      },
      {
        title: "স্কুল নির্মাণ প্রকল্প",
        budget: 5000000,
        deadline: "2025-10-15",
        status: "খোলা",
        department: "শিক্ষা বিভাগ",
        documents: "tender_school_construction.pdf",
      },
      {
        title: "পার্ক সংস্কার কাজ",
        budget: 800000,
        deadline: "2025-09-18",
        status: "বন্ধ",
        department: "পার্ক ও বিনোদন",
        documents: "tender_park_renovation.pdf",
      },
    ];

    // Audit Reports
    const auditReports = [
      {
        title: "২০২৪ সালের বার্ষিক অডিট রিপোর্ট",
        date: "2025-01-15",
        findings: "সামগ্রিক আর্থিক ব্যবস্থাপনা সন্তোষজনক",
        recommendations: "ডিজিটাল পেমেন্ট সিস্টেম উন্নত করুন",
        file: "annual_audit_2024.pdf",
      },
      {
        title: "রাস্তা নির্মাণ প্রকল্প অডিট",
        date: "2025-03-20",
        findings: "বাজেট অনুযায়ী ব্যয় হয়েছে",
        recommendations: "গুণগত মান আরো উন্নত করুন",
        file: "road_construction_audit.pdf",
      },
    ];

    setPublicData({
      totalReports,
      resolvedReports,
      pendingReports,
      activeOfficers: 45,
      totalBudget: 50000000,
      usedBudget: 32500000,
      publicProjects,
      governmentExpenses,
      reportStats: issues,
      officerPerformance,
      publicMeetings,
      tenderInfo,
      auditReports,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "সম্পন্ন":
        return "bg-green-100 text-green-800";
      case "চলমান":
        return "bg-blue-100 text-blue-800";
      case "বিলম্বিত":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-2 sm:p-3 lg:p-4 rounded-xl shadow-lg flex-shrink-0">
              <span className="text-white text-xl sm:text-2xl lg:text-3xl">
                🔍
              </span>
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  OpenGovt Lens
                </h1>
                <div className="px-2 py-1 sm:px-3 bg-green-100 text-green-800 text-xs sm:text-sm font-semibold rounded-full self-start">
                  LIVE
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-3">
                সরকার ও নাগরিকদের মধ্যে সম্পূর্ণ স্বচ্ছতা • Real-time Government
                Transparency
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    রিয়েল-টাইম ডাটা
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    ১০০% স্বচ্ছ
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    নিরাপদ
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            {/* <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                স্বচ্ছতার অঙ্গীকার
              </h3>
            </div> */}

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-blue-700">OpenGovt Lens</strong> এর
                মাধ্যমে সরকারি সকল তথ্য, বাজেট বরাদ্দ, প্রকল্পের অগ্রগতি এবং
                নাগরিক সেবার সম্পূর্ণ বিবরণ উন্মুক্তভাবে প্রকাশ করা হয়েছে।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      যাচাইকৃত তথ্য
                    </div>
                    <div className="text-xs text-gray-500">১০০% সত্যায়িত</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      রিয়েল-টাইম
                    </div>
                    <div className="text-xs text-gray-500">লাইভ আপডেট</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      নিরাপদ
                    </div>
                    <div className="text-xs text-gray-500">
                      সুরক্ষিত সিস্টেম
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter and Search Controls */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="সার্চ করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">সব সময়</option>
            <option value="month">এই মাস</option>
            <option value="quarter">এই ত্রৈমাসিক</option>
            <option value="year">এই বছর</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">সব বিভাগ</option>
            <option value="infrastructure">অবকাঠামো</option>
            <option value="utilities">ইউটিলিটি</option>
            <option value="environment">পরিবেশ</option>
            <option value="safety">নিরাপত্তা</option>
          </select>

          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="overview">সারসংক্ষেপ</option>
            <option value="projects">প্রকল্প</option>
            <option value="budget">বাজেট</option>
            <option value="officers">কর্মকর্তা</option>
            <option value="meetings">সভা</option>
            <option value="tenders">টেন্ডার</option>
            <option value="audits">অডিট</option>
          </select>
        </div>

        {/* View Selector Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
              {[
                { id: "overview", name: "সারসংক্ষেপ", icon: "📊" },
                { id: "projects", name: "প্রকল্প", icon: "🏗️" },
                { id: "budget", name: "বাজেট", icon: "💰" },
                { id: "officers", name: "কর্মকর্তা", icon: "👥" },
                { id: "meetings", name: "সভা", icon: "🏛️" },
                { id: "tenders", name: "টেন্ডার", icon: "📋" },
                { id: "audits", name: "অডিট", icon: "🔍" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id)}
                  className={`${
                    selectedView === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 flex-shrink-0`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Statistics Cards - Always Show */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-2xl font-bold text-blue-600">
                {publicData.totalReports}
              </p>
              <p className="text-sm text-gray-600">মোট রিপোর্ট</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-2xl font-bold text-green-600">
                {publicData.resolvedReports}
              </p>
              <p className="text-sm text-gray-600">সমাধানকৃত</p>
              <p className="text-xs text-gray-500 mt-1">
                {publicData.totalReports > 0
                  ? Math.round(
                      (publicData.resolvedReports / publicData.totalReports) *
                        100
                    )
                  : 0}
                % সফলতার হার
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-2xl font-bold text-purple-600">
                {publicData.activeOfficers}
              </p>
              <p className="text-sm text-gray-600">সক্রিয় কর্মকর্তা</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-xl font-bold text-orange-600">
                {Math.round(
                  (publicData.usedBudget / publicData.totalBudget) * 100
                )}
                %
              </p>
              <p className="text-sm text-gray-600">বাজেট ব্যবহার</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(publicData.usedBudget)} /{" "}
                {formatCurrency(publicData.totalBudget)}
              </p>
            </div>
          </Card>
        </div>

        {/* Conditional Content Based on Selected View */}
        {selectedView === "overview" && (
          <div className="space-y-8">
            {/* Government Expenses */}
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>সরকারি ব্যয় বিবরণী</span>
                  <button
                    onClick={() => navigate("/transparency/budget")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
                  >
                    <span>আরো দেখুন</span>
                    <span>→</span>
                  </button>
                </div>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        বিভাগ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        বরাদ্দ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ব্যয়িত
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        অগ্রগতি
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        সর্বশেষ আপডেট
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        অ্যাকশন
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {publicData.governmentExpenses.map((expense, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expense.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(expense.allocated)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(expense.spent)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${getProgressColor(
                                  expense.percentage
                                )}`}
                                style={{ width: `${expense.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {expense.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {expense.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() =>
                              navigate(`/transparency/budget/${index + 1}`)
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold shadow-md transition-colors"
                          >
                            বিস্তারিত
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Citizens Reports Summary */}
            <Card title="নাগরিক রিপোর্ট সারসংক্ষেপ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {publicData.pendingReports}
                  </div>
                  <div className="text-sm text-gray-600">
                    প্রক্রিয়াধীন রিপোর্ট
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {publicData.resolvedReports}
                  </div>
                  <div className="text-sm text-gray-600">সমাধানকৃত রিপোর্ট</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {publicData.totalReports > 0
                      ? Math.round(
                          (publicData.resolvedReports /
                            publicData.totalReports) *
                            100
                        )
                      : 0}
                    %
                  </div>
                  <div className="text-sm text-gray-600">সফলতার হার</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {selectedView === "projects" && (
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>চলমান সরকারি প্রকল্প</span>
                <button
                  onClick={() => navigate("/transparency/projects")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
                >
                  <span>আরো দেখুন</span>
                  <span>→</span>
                </button>
              </div>
            }
          >
            <div className="space-y-6">
              {publicData.publicProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-6 bg-gray-50 relative"
                >
                  {/* Status badge positioned at top-right corner */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="pr-20 sm:pr-24">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="space-y-1">
                          <p>
                            <strong>ঠিকাদার:</strong> {project.contractor}
                          </p>
                          <p>
                            <strong>শুরুর তারিখ:</strong> {project.startDate}
                          </p>
                          <p>
                            <strong>এলাকা:</strong> {project.location}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p>
                            <strong>সমাপ্তির তারিখ:</strong>{" "}
                            {project.expectedEnd}
                          </p>
                          <p>
                            <strong>বাজেট:</strong>{" "}
                            {formatCurrency(project.budget)}
                          </p>
                          <p>
                            <strong>ক্যাটেগরি:</strong> {project.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          অগ্রগতি
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${getProgressColor(
                            project.progress
                          )}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <p>
                        <strong>ব্যয়িত:</strong>{" "}
                        {formatCurrency(project.spent)} (
                        {Math.round((project.spent / project.budget) * 100)}%)
                      </p>
                    </div>

                    <div className="flex justify-center sm:justify-end">
                      <button
                        onClick={() =>
                          navigate(`/transparency/projects/${project.id}`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors w-full sm:w-auto"
                      >
                        বিস্তারিত দেখুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedView === "officers" && (
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>কর্মকর্তাদের কর্মক্ষমতা</span>
                <button
                  onClick={() => navigate("/transparency/officers")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
                >
                  <span>আরো দেখুন</span>
                  <span>→</span>
                </button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      নাম
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      বিভাগ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      সমাধানকৃত মামলা
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      গড় সময়
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      রেটিং
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publicData.officerPerformance.map((officer, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {officer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {officer.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {officer.resolvedCases}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {officer.averageTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-yellow-400">
                            {"★".repeat(Math.floor(officer.rating))}
                          </span>
                          <span className="ml-2 text-sm text-gray-600">
                            {officer.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() =>
                            navigate(`/transparency/officers/${index + 1}`)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold shadow-md transition-colors"
                        >
                          বিস্তারিত
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {selectedView === "meetings" && (
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>পাবলিক মিটিং ও ইভেন্ট</span>
                <button
                  onClick={() => navigate("/transparency/meetings")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
                >
                  <span>আরো দেখুন</span>
                  <span>→</span>
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              {publicData.publicMeetings.map((meeting, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {meeting.title}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium self-start ${
                        meeting.status === "আসন্ন"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                    <p>
                      <strong>তারিখ:</strong> {meeting.date}
                    </p>
                    <p>
                      <strong>সময়:</strong> {meeting.time}
                    </p>
                    <p>
                      <strong>স্থান:</strong> {meeting.venue}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 mb-4">
                    <strong>আলোচ্য বিষয়:</strong> {meeting.agenda}
                  </p>
                  <div className="flex justify-center sm:justify-end">
                    <button
                      onClick={() =>
                        navigate(`/transparency/meetings/${index + 1}`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors w-full sm:w-auto"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedView === "tenders" && (
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>টেন্ডার তথ্য</span>
                <button
                  onClick={() => navigate("/transparency/tenders")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
                >
                  <span>আরো দেখুন</span>
                  <span>→</span>
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              {publicData.tenderInfo.map((tender, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tender.title}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium self-start ${
                        tender.status === "খোলা"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tender.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 mb-3">
                    <p>
                      <strong>বাজেট:</strong> {formatCurrency(tender.budget)}
                    </p>
                    <p>
                      <strong>শেষ তারিখ:</strong> {tender.deadline}
                    </p>
                    <p>
                      <strong>বিভাগ:</strong> {tender.department}
                    </p>
                  </div>
                  <p className="text-sm text-blue-600 cursor-pointer hover:underline mb-4">
                    📄 {tender.documents}
                  </p>
                  <div className="flex justify-center sm:justify-end">
                    <button
                      onClick={() =>
                        navigate(`/transparency/tenders/${index + 1}`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors w-full sm:w-auto"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedView === "audits" && (
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>অডিট রিপোর্ট</span>
                <button
                  onClick={() => navigate("/transparency/audits")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
                >
                  <span>আরো দেখুন</span>
                  <span>→</span>
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              {publicData.auditReports.map((audit, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {audit.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>তারিখ:</strong> {audit.date}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>ফলাফল:</strong> {audit.findings}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>সুপারিশ:</strong> {audit.recommendations}
                  </p>
                  <p className="text-sm text-blue-600 cursor-pointer hover:underline mb-3">
                    📄 {audit.file}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        navigate(`/transparency/audits/${index + 1}`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors"
                    >
                      বিস্তারিত
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedView === "budget" && (
          <div className="space-y-8">
            {/* Budget Overview */}
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>বাজেট বিশ্লেষণ</span>
                  <button
                    onClick={() => navigate("/transparency/budget")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
                  >
                    <span>আরো দেখুন</span>
                    <span>→</span>
                  </button>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    মোট বাজেট
                  </h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(publicData.totalBudget)}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    ব্যয়িত বাজেট
                  </h4>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(publicData.usedBudget)}
                  </p>
                </div>
              </div>

              {/* Budget Breakdown Chart */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-4">
                  বিভাগওয়ারী বাজেট বিতরণ
                </h4>
                <div className="space-y-3">
                  {publicData.governmentExpenses.map((expense, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {expense.category}
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              expense.percentage
                            )}`}
                            style={{ width: `${expense.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">
                          {expense.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Transparency Policy Footer */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400 text-xl">🔒</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>স্বচ্ছতা নীতি:</strong> এই সব তথ্য রিয়েল-টাইমে আপডেট
                হয় এবং সব নাগরিকের জন্য উন্মুক্ত। কোনো তথ্য গোপন বা পরিবর্তন
                করা হয় না। সব ডাটা সরকারি অডিট এবং যাচাইয়ের মাধ্যমে প্রমাণিত।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyDashboard;
