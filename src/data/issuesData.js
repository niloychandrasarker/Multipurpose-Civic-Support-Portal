// Dummy JSON data for citizen issues - no localStorage needed
let issuesData = [
  {
    id: "ISS001",
    title: "রাস্তায় বড় গর্ত",
    description:
      "মিরপুর ১০ নম্বর রাউন্ডাবাউটের কাছে রাস্তায় একটি বড় গর্ত রয়েছে যা যানবাহন চলাচলে সমস্যা সৃষ্টি করছে। বর্ষাকালে এটি আরও বিপজ্জনক হয়ে উঠেছে।",
    location: {
      address: "মিরপুর ১০, ঢাকা",
      coordinates: { lat: 23.8069, lng: 90.3688 },
    },
    attachments: [
      {
        name: "road_hole_1.jpg",
        type: "image",
        size: "2.3 MB",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=100&fit=crop",
      },
      {
        name: "road_hole_2.jpg",
        type: "image",
        size: "1.8 MB",
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=100&fit=crop",
      },
    ],
    status: "Submitted",
    priority: "High",
    category: "Infrastructure",
    reportedBy: {
      name: "আহমেদ করিম",
      phone: "01712345678",
      email: "ahmed@example.com",
    },
    votes: { upvotes: 45, downvotes: 3, total: 48 },
    createdAt: "2025-09-10T10:30:00Z",
    updatedAt: "2025-09-10T10:30:00Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2025-09-10T10:30:00Z",
        note: "সমস্যা প্রাথমিকভাবে গ্রহণ করা হয়েছে",
      },
    ],
  },
  {
    id: "ISS002",
    title: "স্ট্রিট লাইট নষ্ট",
    description:
      "ধানমন্ডি ২৭ নম্বর এলাকার বেশ কয়েকটি স্ট্রিট লাইট কাজ করছে না। রাতে এই এলাকা অন্ধকার থাকে যা নিরাপত্তার জন্য ঝুঁকিপূর্ণ।",
    location: {
      address: "ধানমন্ডি ২৭, ঢাকা",
      coordinates: { lat: 23.7461, lng: 90.3742 },
    },
    attachments: [
      {
        name: "broken_lights.jpg",
        type: "image",
        size: "1.5 MB",
        url: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=150&h=100&fit=crop",
      },
    ],
    status: "Under Review",
    priority: "Medium",
    category: "Public Safety",
    reportedBy: {
      name: "ফাতেমা খাতুন",
      phone: "01812345678",
      email: "fatema@example.com",
    },
    votes: { upvotes: 28, downvotes: 1, total: 29 },
    createdAt: "2025-09-08T14:20:00Z",
    updatedAt: "2025-09-09T09:15:00Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2025-09-08T14:20:00Z",
        note: "সমস্যা জমা দেওয়া হয়েছে",
      },
      {
        status: "Under Review",
        timestamp: "2025-09-09T09:15:00Z",
        note: "সংশ্লিষ্ট বিভাগে পাঠানো হয়েছে",
      },
    ],
  },
  {
    id: "ISS003",
    title: "পানি জমে থাকা",
    description:
      "উত্তরা সেক্টর ৭ এর রাস্তায় বৃষ্টির পানি জমে থাকে। নিকাশী ব্যবস্থা ঠিক না থাকায় এলাকাবাসী চলাচলে সমস্যার সম্মুখীন হচ্ছেন।",
    location: {
      address: "উত্তরা সেক্টর ৭, ঢাকা",
      coordinates: { lat: 23.8759, lng: 90.3795 },
    },
    attachments: [
      {
        name: "water_logging.mp4",
        type: "video",
        size: "5.2 MB",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=150&h=100&fit=crop",
      },
      {
        name: "drainage_problem.jpg",
        type: "image",
        size: "2.1 MB",
        url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=150&h=100&fit=crop",
      },
    ],
    status: "In Progress",
    priority: "High",
    category: "Sanitation",
    reportedBy: {
      name: "মোহাম্মদ রহিম",
      phone: "01912345678",
      email: "rahim@example.com",
    },
    votes: { upvotes: 67, downvotes: 2, total: 69 },
    createdAt: "2025-09-05T16:45:00Z",
    updatedAt: "2025-09-11T11:30:00Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2025-09-05T16:45:00Z",
        note: "প্রাথমিক রিপোর্ট জমা",
      },
      {
        status: "Under Review",
        timestamp: "2025-09-06T10:00:00Z",
        note: "প্রকৌশল বিভাগে পাঠানো হয়েছে",
      },
      {
        status: "In Progress",
        timestamp: "2025-09-11T11:30:00Z",
        note: "নিকাশী ব্যবস্থা মেরামতের কাজ শুরু হয়েছে",
      },
    ],
  },
  {
    id: "ISS004",
    title: "আবর্জনা সংগ্রহ সমস্যা",
    description:
      "গুলশান ১ এলাকায় গত এক সপ্তাহ ধরে আবর্জনা সংগ্রহ হচ্ছে না। রাস্তায় আবর্জনা জমে স্বাস্থ্যঝুঁকি তৈরি হয়েছে।",
    location: {
      address: "গুলশান ১, ঢাকা",
      coordinates: { lat: 23.7806, lng: 90.4193 },
    },
    attachments: [
      {
        name: "garbage_pile.jpg",
        type: "image",
        size: "2.1 MB",
        url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=150&h=100&fit=crop",
      },
      {
        name: "waste_problem.jpg",
        type: "image",
        size: "1.9 MB",
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=100&fit=crop",
      },
    ],
    status: "Resolved",
    priority: "Medium",
    category: "Sanitation",
    reportedBy: {
      name: "নাসিমা আক্তার",
      phone: "01612345678",
      email: "nasima@example.com",
    },
    votes: { upvotes: 34, downvotes: 0, total: 34 },
    createdAt: "2025-09-01T08:15:00Z",
    updatedAt: "2025-09-12T14:20:00Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2025-09-01T08:15:00Z",
        note: "আবর্জনা সংগ্রহের অভিযোগ জমা",
      },
      {
        status: "Under Review",
        timestamp: "2025-09-02T09:30:00Z",
        note: "পরিচ্ছন্নতা বিভাগে প্রেরণ",
      },
      {
        status: "In Progress",
        timestamp: "2025-09-10T07:00:00Z",
        note: "বিশেষ পরিচ্ছন্নতা অভিযান শুরু",
      },
      {
        status: "Resolved",
        timestamp: "2025-09-12T14:20:00Z",
        note: "এলাকা পরিষ্কার করা হয়েছে, নিয়মিত সংগ্রহ পুনরায় চালু",
      },
    ],
  },
  {
    id: "ISS005",
    title: "শব্দ দূষণ",
    description:
      "বনানী এলাকায় নির্মাণ কাজের কারণে দিনরাত শব্দ দূষণ হচ্ছে। আবাসিক এলাকায় এই অতিরিক্ত শব্দ সমস্যা সৃষ্টি করছে।",
    location: {
      address: "বনানী, ঢাকা",
      coordinates: { lat: 23.7925, lng: 90.4077 },
    },
    attachments: [
      {
        name: "construction_noise.jpg",
        type: "image",
        size: "1.7 MB",
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=150&h=100&fit=crop",
      },
      {
        name: "noise_meter.jpg",
        type: "image",
        size: "1.2 MB",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        preview:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=100&fit=crop",
      },
    ],
    status: "Rejected",
    priority: "Low",
    category: "Noise Pollution",
    reportedBy: {
      name: "তানভীর হাসান",
      phone: "01512345678",
      email: "tanvir@example.com",
    },
    votes: { upvotes: 12, downvotes: 8, total: 20 },
    createdAt: "2025-08-28T12:00:00Z",
    updatedAt: "2025-09-11T16:45:00Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2025-08-28T12:00:00Z",
        note: "শব্দ দূষণের অভিযোগ জমা",
      },
      {
        status: "Under Review",
        timestamp: "2025-08-30T10:20:00Z",
        note: "পরিবেশ বিভাগে পাঠানো হয়েছে",
      },
      {
        status: "Rejected",
        timestamp: "2025-09-11T16:45:00Z",
        note: "বৈধ নির্মাণ কাজ, নির্ধারিত সময়ের মধ্যে সীমিত",
      },
    ],
  },
];

// Issue status options
export const ISSUE_STATUS = [
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
  "Rejected",
];

// Issue categories
export const ISSUE_CATEGORIES = [
  "Infrastructure",
  "Public Safety",
  "Sanitation",
  "Noise Pollution",
  "Transportation",
  "Other",
];

// Issue priorities
export const ISSUE_PRIORITIES = ["Low", "Medium", "High", "Critical"];

// Get all issues sorted by votes (highest first)
export const getIssuesByVotes = () => {
  return [...issuesData].sort((a, b) => b.votes.total - a.votes.total);
};

// Get issues by status
export const getIssuesByStatus = (status) => {
  return issuesData.filter((issue) => issue.status === status);
};

// Get issue by ID
export const getIssueById = (id) => {
  return issuesData.find((issue) => issue.id === id);
};

// Add new issue
export const addNewIssue = (issueData) => {
  const newIssue = {
    ...issueData,
    id: `ISS${String(issuesData.length + 1).padStart(3, "0")}`,
    votes: { upvotes: 0, downvotes: 0, total: 0 },
    status: "Submitted",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    statusHistory: [
      {
        status: "Submitted",
        timestamp: new Date().toISOString(),
        note: "নতুন সমস্যা জমা দেওয়া হয়েছে",
      },
    ],
  };

  issuesData.push(newIssue);
  return newIssue;
};

// Vote on an issue
export const voteOnIssue = (issueId, voteType) => {
  const issue = issuesData.find((issue) => issue.id === issueId);
  if (!issue) return false;

  if (voteType === "up") {
    issue.votes.upvotes += 1;
  } else if (voteType === "down") {
    issue.votes.downvotes += 1;
  }

  issue.votes.total = issue.votes.upvotes + issue.votes.downvotes;
  issue.updatedAt = new Date().toISOString();

  return true;
};

// Update issue status (admin function)
export const updateIssueStatus = (issueId, newStatus, note = "") => {
  const issue = issuesData.find((issue) => issue.id === issueId);
  if (!issue) return false;

  issue.status = newStatus;
  issue.updatedAt = new Date().toISOString();

  issue.statusHistory.push({
    status: newStatus,
    timestamp: new Date().toISOString(),
    note: note || `স্ট্যাটাস ${newStatus} এ পরিবর্তন করা হয়েছে`,
  });

  return true;
};

// Get issue statistics
export const getIssueStats = () => {
  const total = issuesData.length;
  const submitted = issuesData.filter(
    (issue) => issue.status === "Submitted"
  ).length;
  const underReview = issuesData.filter(
    (issue) => issue.status === "Under Review"
  ).length;
  const inProgress = issuesData.filter(
    (issue) => issue.status === "In Progress"
  ).length;
  const resolved = issuesData.filter(
    (issue) => issue.status === "Resolved"
  ).length;
  const rejected = issuesData.filter(
    (issue) => issue.status === "Rejected"
  ).length;

  return {
    total,
    submitted,
    underReview,
    inProgress,
    resolved,
    rejected,
  };
};
