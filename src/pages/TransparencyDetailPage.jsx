import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const TransparencyDetailPage = () => {
  const { section, category, id } = useParams();
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDetailData = useCallback(() => {
    setLoading(true);

    // If individual item is requested, show specific item details
    if (id) {
      // Handle individual item details
      setDetailData(getIndividualItemData(section, category, id));
      setLoading(false);
      return;
    }

    // Mock detailed data based on section
    const mockData = {
      budget: {
        title: "বাজেট বিশ্লেষণ বিস্তারিত",
        icon: "💰",
        sections: [
          {
            title: "মাসিক বাজেট ব্রেকডাউন",
            data: [
              {
                month: "জানুয়ারি ২০২৫",
                allocated: 4200000,
                spent: 3800000,
                percentage: 90,
              },
              {
                month: "ফেব্রুয়ারি ২০২৫",
                allocated: 4500000,
                spent: 4100000,
                percentage: 91,
              },
              {
                month: "মার্চ ২০২৫",
                allocated: 4800000,
                spent: 4200000,
                percentage: 88,
              },
              {
                month: "এপ্রিল ২০২৫",
                allocated: 5000000,
                spent: 4500000,
                percentage: 90,
              },
              {
                month: "মে ২০২৫",
                allocated: 5200000,
                spent: 4800000,
                percentage: 92,
              },
              {
                month: "জুন ২০২৫",
                allocated: 4900000,
                spent: 4400000,
                percentage: 90,
              },
            ],
          },
          {
            title: "বিভাগওয়ারী বিস্তারিত ব্যয়",
            data: [
              {
                department: "রাস্তা ও জনপথ বিভাগ",
                totalBudget: 15000000,
                spent: 12500000,
                projects: 8,
                efficiency: 95,
                details: "প্রধান সড়ক মেরামত, ব্রিজ নির্মাণ, ফুটপাথ সংস্কার",
              },
              {
                department: "বিদ্যুৎ বিভাগ",
                totalBudget: 12000000,
                spent: 11200000,
                projects: 6,
                efficiency: 98,
                details: "লাইন সম্প্রসারণ, ট্রান্সফরমার স্থাপন, মেইনটেন্যান্স",
              },
              {
                department: "পানি সরবরাহ",
                totalBudget: 8000000,
                spent: 6800000,
                projects: 5,
                efficiency: 92,
                details: "পাইপলাইন সম্প্রসারণ, পাম্প স্থাপন, জল পরিশোধন",
              },
            ],
          },
        ],
      },
      projects: {
        title: "সরকারি প্রকল্প বিস্তারিত",
        icon: "🏗️",
        sections: [
          {
            title: "সকল প্রকল্প",
            data: [
              {
                id: 1,
                name: "ঢাকা-চট্টগ্রাম হাইওয়ে সম্প্রসারণ",
                totalBudget: 15000000,
                spentBudget: 8500000,
                progress: 65,
                timeline: {
                  start: "2024-01-15",
                  expected: "2025-12-31",
                  phases: [
                    {
                      name: "জমি অধিগ্রহণ",
                      status: "সম্পন্ন",
                      completion: 100,
                    },
                    {
                      name: "নকশা প্রণয়ন",
                      status: "সম্পন্ন",
                      completion: 100,
                    },
                    { name: "নির্মাণ কাজ", status: "চলমান", completion: 65 },
                    { name: "ফিনিশিং", status: "পেন্ডিং", completion: 0 },
                  ],
                },
                contractor: "বাংলাদেশ সড়ক নির্মাণ কর্পোরেশন",
                beneficiaries: 500000,
                location: "ঢাকা-চট্টগ্রাম",
                keyFeatures: [
                  "৪ লেনের আধুনিক হাইওয়ে",
                  "১৫টি ওভারব্রিজ",
                  "৮টি আন্ডারপাস",
                  "LED স্ট্রিট লাইটিং",
                  "জরুরি সেবা স্টেশন",
                ],
              },
              {
                id: 2,
                name: "গ্রামীণ বিদ্যুতায়ন প্রকল্প",
                totalBudget: 8000000,
                spentBudget: 6200000,
                progress: 78,
                startDate: "2024-03-10",
                expectedEnd: "2025-08-15",
                contractor: "গ্রামীণ বিদ্যুৎ বোর্ড",
                beneficiaries: 250000,
                location: "সারাদেশ",
              },
              {
                id: 3,
                name: "জল নিষ্কাশন ব্যবস্থা উন্নয়ন",
                totalBudget: 5500000,
                spentBudget: 5500000,
                progress: 100,
                completionDate: "2024-05-30",
                contractor: "ওয়াসা",
                beneficiaries: 150000,
                location: "ঢাকা",
                impact: "ঢাকার ৫০% এলাকায় জলাবদ্ধতা সমস্যার সমাধান",
              },
              {
                id: 4,
                name: "ডিজিটাল সেবা কেন্দ্র স্থাপন",
                totalBudget: 3200000,
                spentBudget: 2100000,
                progress: 45,
                startDate: "2024-06-15",
                expectedEnd: "2025-11-30",
                contractor: "আইসিটি বিভাগ",
                beneficiaries: 75000,
                location: "সব জেলা",
              },
              {
                id: 5,
                name: "পার্ক ও বিনোদন কেন্দ্র নির্মাণ",
                totalBudget: 2800000,
                spentBudget: 1500000,
                progress: 35,
                startDate: "2024-08-01",
                expectedEnd: "2025-09-30",
                contractor: "গ্রীন ল্যান্ডস্কেপ লিমিটেড",
                beneficiaries: 100000,
                location: "ঢাকা",
              },
            ],
          },
        ],
      },
      officers: {
        title: "কর্মকর্তাগণের বিস্তারিত",
        icon: "👥",
        sections: [
          {
            title: "সকল কর্মকর্তা",
            data: [
              {
                id: 1,
                name: "জনাব আবদুর রহমান",
                department: "রাস্তা ও জনপথ",
                resolvedCases: 45,
                averageTime: "৭ দিন",
                rating: 4.8,
                experience: "১২ বছর",
                qualification: "সিভিল ইঞ্জিনিয়ারিং",
                contactInfo: "01711234567",
              },
              {
                id: 2,
                name: "জনাবা ফাতিমা খাতুন",
                department: "বিদ্যুৎ বিভাগ",
                resolvedCases: 38,
                averageTime: "৫ দিন",
                rating: 4.9,
                experience: "৮ বছর",
                qualification: "ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং",
                contactInfo: "01811234567",
              },
              {
                id: 3,
                name: "জনাব মোহাম্মদ করিম",
                department: "পানি সরবরাহ",
                resolvedCases: 32,
                averageTime: "৬ দিন",
                rating: 4.6,
                experience: "১০ বছর",
                qualification: "পানি সম্পদ ইঞ্জিনিয়ারিং",
                contactInfo: "01911234567",
              },
              {
                id: 4,
                name: "জনাবা রাবেয়া বেগম",
                department: "পরিবেশ বিভাগ",
                resolvedCases: 28,
                averageTime: "৮ দিন",
                rating: 4.7,
                experience: "৬ বছর",
                qualification: "পরিবেশ বিজ্ঞান",
                contactInfo: "01511234567",
              },
            ],
          },
        ],
      },
      meetings: {
        title: "সভা ও কার্যক্রম বিস্তারিত",
        icon: "🏛️",
        sections: [
          {
            title: "সকল সভা ও কার্যক্রম",
            data: [
              {
                id: 1,
                title: "মাসিক নাগরিক সভা",
                date: "2025-09-20",
                time: "১০:০০ AM",
                venue: "জেলা প্রশাসকের কার্যালয়",
                agenda: "রাস্তা মেরামত ও জনসেবা নিয়ে আলোচনা",
                status: "আসন্ন",
                organizer: "জেলা প্রশাসক",
                participants: "নাগরিক প্রতিনিধিগণ",
                expectedAttendees: 150,
              },
              {
                id: 2,
                title: "বাজেট অনুমোদন সভা",
                date: "2025-09-25",
                time: "২:০০ PM",
                venue: "সিটি কর্পোরেশন হল",
                agenda: "আগামী বছরের বাজেট পরিকল্পনা",
                status: "আসন্ন",
                organizer: "মেয়র কার্যালয়",
                participants: "কাউন্সিলর ও বিভাগীয় প্রধানগণ",
                expectedAttendees: 80,
              },
              {
                id: 3,
                title: "উন্নয়ন প্রকল্প পর্যালোচনা",
                date: "2025-09-12",
                time: "১১:০০ AM",
                venue: "জেলা পরিষদ হল",
                agenda: "চলমান প্রকল্পের অগ্রগতি পর্যালোচনা",
                status: "সম্পন্ন",
                organizer: "জেলা পরিষদ",
                participants: "প্রকল্প ম্যানেজার ও ঠিকাদারগণ",
                expectedAttendees: 120,
              },
            ],
          },
        ],
      },
      tenders: {
        title: "টেন্ডার ও দরপত্র বিস্তারিত",
        icon: "📋",
        sections: [
          {
            title: "সকল টেন্ডার ও দরপত্র",
            data: [
              {
                id: 1,
                title: "ঢাকা শহরের রাস্তা মেরামত",
                budget: 2500000,
                deadline: "2025-09-30",
                status: "খোলা",
                department: "রাস্তা ও জনপথ বিভাগ",
                documents: "tender_road_repair.pdf",
                publishDate: "2025-09-01",
                submissionDeadline: "2025-09-30 ১৭:০০",
                contactPerson: "প্রকৌশলী মোহাম্মদ আলী",
                requirements: "ন্যূনতম ৫ বছরের অভিজ্ঞতা প্রয়োজন",
              },
              {
                id: 2,
                title: "স্কুল নির্মাণ প্রকল্প",
                budget: 5000000,
                deadline: "2025-10-15",
                status: "খোলা",
                department: "শিক্ষা বিভাগ",
                documents: "tender_school_construction.pdf",
                publishDate: "2025-08-15",
                submissionDeadline: "2025-10-15 ১৬:০০",
                contactPerson: "স্থপতি ফারিদা আক্তার",
                requirements: "স্কুল নির্মাণে অভিজ্ঞতা আবশ্যক",
              },
              {
                id: 3,
                title: "পার্ক সংস্কার কাজ",
                budget: 800000,
                deadline: "2025-09-18",
                status: "বন্ধ",
                department: "পার্ক ও বিনোদন",
                documents: "tender_park_renovation.pdf",
                publishDate: "2025-08-01",
                submissionDeadline: "2025-09-18 ১৫:০০",
                contactPerson: "ল্যান্ডস্কেপ আর্কিটেক্ট রহিম উদ্দিন",
                requirements: "পার্ক ডিজাইনে দক্ষতা প্রয়োজন",
              },
            ],
          },
        ],
      },
      audits: {
        title: "অডিট ও পরিদর্শন বিস্তারিত",
        icon: "🔍",
        sections: [
          {
            title: "সকল অডিট ও পরিদর্শন রিপোর্ট",
            data: [
              {
                id: 1,
                title: "২০২৪ সালের বার্ষিক অডিট রিপোর্ট",
                date: "2025-01-15",
                findings: "সামগ্রিক আর্থিক ব্যবস্থাপনা সন্তোষজনক",
                recommendations: "ডিজিটাল পেমেন্ট সিস্টেম উন্নত করুন",
                file: "annual_audit_2024.pdf",
                auditor: "জাতীয় অডিট অধিদপ্তর",
                scope: "সম্পূর্ণ আর্থিক বিভাগ",
                status: "সম্পন্ন",
                followUpRequired: "হ্যাঁ",
              },
              {
                id: 2,
                title: "রাস্তা নির্মাণ প্রকল্প অডিট",
                date: "2025-03-20",
                findings: "বাজেট অনুযায়ী ব্যয় হয়েছে",
                recommendations: "গুণগত মান আরো উন্নত করুন",
                file: "road_construction_audit.pdf",
                auditor: "প্রকৌশল অডিট টিম",
                scope: "রাস্তা নির্মাণ প্রকল্প",
                status: "সম্পন্ন",
                followUpRequired: "না",
              },
              {
                id: 3,
                title: "পানি সরবরাহ প্রকল্প অডিট",
                date: "2025-05-10",
                findings: "পানির গুণগত মান উন্নত করা প্রয়োজন",
                recommendations: "ফিল্টার সিস্টেম আপগ্রেড করুন",
                file: "water_supply_audit.pdf",
                auditor: "পরিবেশ অডিট বিভাগ",
                scope: "পানি সরবরাহ ব্যবস্থা",
                status: "চলমান",
                followUpRequired: "হ্যাঁ",
              },
            ],
          },
        ],
      },
    };

    setDetailData(
      mockData[section] || {
        title: "তথ্য পাওয়া যায়নি",
        icon: "❓",
        sections: [],
      }
    );
    setLoading(false);
  }, [section, category, id]);

  // Function to get individual item data
  const getIndividualItemData = (section, category, id) => {
    // Get data from mockData structure
    const mockData = {
      budget: {
        title: "বাজেট বিশ্লেষণ বিস্তারিত",
        icon: "💰",
        sections: [
          {
            title: "মাসিক বাজেট ব্রেকডাউন",
            data: [],
          },
        ],
      },
      projects: {
        title: "প্রকল্প বিস্তারিত",
        icon: "🏗️",
        sections: [
          {
            title: "চলমান প্রকল্পসমূহ",
            data: [
              {
                id: 1,
                name: "ঢাকা-চট্টগ্রাম হাইওয়ে সম্প্রসারণ",
                description:
                  "দেশের প্রধান দুই শহরের মধ্যে যোগাযোগ ব্যবস্থা উন্নয়নের জন্য এই প্রকল্প বাস্তবায়িত হচ্ছে।",
                contractor: "বাংলাদেশ সড়ক নির্মাণ কর্পোরেশন",
                totalBudget: 15000000,
                spentBudget: 8500000,
                budget: 15000000,
                spent: 8500000,
                progress: 65,
                beneficiaries: 500000,
                status: "চলমান",
                startDate: "২০২৪-০১-১৫",
                expectedEnd: "২০২৫-১২-৩১",
                completionDate: "২০২৫-১২-৩১",
                location: "ঢাকা-চট্টগ্রাম",
                category: "সড়ক উন্নয়ন",
                timeline: {
                  start: "2024-01-15",
                  expected: "2025-12-31",
                  phases: [
                    {
                      name: "জমি অধিগ্রহণ",
                      status: "সম্পন্ন",
                      completion: 100,
                      duration: "৩ মাস",
                    },
                    {
                      name: "নকশা প্রণয়ন",
                      status: "সম্পন্ন",
                      completion: 100,
                      duration: "৪ মাস",
                    },
                    {
                      name: "নির্মাণ কাজ",
                      status: "চলমান",
                      completion: 65,
                      duration: "১৮ মাস",
                    },
                    {
                      name: "ফিনিশিং",
                      status: "পেন্ডিং",
                      completion: 0,
                      duration: "৬ মাস",
                    },
                  ],
                },
                keyFeatures: [
                  "৪ লেনের আধুনিক হাইওয়ে",
                  "১৫টি ওভারব্রিজ",
                  "৮টি আন্ডারপাস",
                  "LED স্ট্রিট লাইটিং",
                  "জরুরি সেবা স্টেশন",
                ],
                expectedBenefits: [
                  "যাতায়াত সময় ৫০% কমে যাবে",
                  "দুর্ঘটনা ৪০% কমবে",
                  "জ্বালানি সাশ্রয় ৩০%",
                  "পরিবহন খরচ ২৫% কম",
                  "১০,০০০ নতুন কর্মসংস্থান",
                ],
              },
            ],
          },
        ],
      },
      officers: {
        title: "কর্মকর্তাগণের বিস্তারিত",
        icon: "👥",
        sections: [
          {
            title: "সকল কর্মকর্তা",
            data: [
              {
                id: 1,
                name: "জনাব আবদুর রহমান",
                department: "রাস্তা ও জনপথ",
                resolvedCases: 45,
                averageTime: "৭ দিন",
                rating: 4.8,
                experience: "১২ বছর",
                qualification: "সিভিল ইঞ্জিনিয়ারিং",
                contactInfo: "01711234567",
              },
              {
                id: 2,
                name: "জনাবা ফাতিমা খাতুন",
                department: "বিদ্যুৎ বিভাগ",
                resolvedCases: 38,
                averageTime: "৫ দিন",
                rating: 4.9,
                experience: "৮ বছর",
                qualification: "ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং",
                contactInfo: "01811234567",
              },
              {
                id: 3,
                name: "জনাব মোহাম্মদ করিম",
                department: "পানি সরবরাহ",
                resolvedCases: 32,
                averageTime: "৬ দিন",
                rating: 4.6,
                experience: "১০ বছর",
                qualification: "পানি সম্পদ ইঞ্জিনিয়ারিং",
                contactInfo: "01911234567",
              },
              {
                id: 4,
                name: "জনাবা রাবেয়া বেগম",
                department: "পরিবেশ বিভাগ",
                resolvedCases: 28,
                averageTime: "৮ দিন",
                rating: 4.7,
                experience: "৬ বছর",
                qualification: "পরিবেশ বিজ্ঞান",
                contactInfo: "01511234567",
              },
            ],
          },
        ],
      },
      meetings: {
        title: "সভা ও কার্যক্রম বিস্তারিত",
        icon: "🏛️",
        sections: [
          {
            title: "সকল সভা ও কার্যক্রম",
            data: [
              {
                id: 1,
                title: "মাসিক নাগরিক সভা",
                date: "2025-09-20",
                time: "১০:০০ AM",
                venue: "জেলা প্রশাসকের কার্যালয়",
                agenda: "রাস্তা মেরামত ও জনসেবা নিয়ে আলোচনা",
                status: "আসন্ন",
                organizer: "জেলা প্রশাসক",
                participants: "নাগরিক প্রতিনিধিগণ",
                expectedAttendees: 150,
              },
              {
                id: 2,
                title: "বাজেট অনুমোদন সভা",
                date: "2025-09-25",
                time: "২:০০ PM",
                venue: "সিটি কর্পোরেশন হল",
                agenda: "আগামী বছরের বাজেট পরিকল্পনা",
                status: "আসন্ন",
                organizer: "মেয়র কার্যালয়",
                participants: "কাউন্সিলর ও বিভাগীয় প্রধানগণ",
                expectedAttendees: 80,
              },
              {
                id: 3,
                title: "উন্নয়ন প্রকল্প পর্যালোচনা",
                date: "2025-09-12",
                time: "১১:০০ AM",
                venue: "জেলা পরিষদ হল",
                agenda: "চলমান প্রকল্পের অগ্রগতি পর্যালোচনা",
                status: "সম্পন্ন",
                organizer: "জেলা পরিষদ",
                participants: "প্রকল্প ম্যানেজার ও ঠিকাদারগণ",
                expectedAttendees: 120,
              },
            ],
          },
        ],
      },
      tenders: {
        title: "টেন্ডার ও দরপত্র বিস্তারিত",
        icon: "📋",
        sections: [
          {
            title: "সকল টেন্ডার ও দরপত্র",
            data: [
              {
                id: 1,
                title: "ঢাকা শহরের রাস্তা মেরামত",
                budget: 2500000,
                deadline: "2025-09-30",
                status: "খোলা",
                department: "রাস্তা ও জনপথ বিভাগ",
                documents: "tender_road_repair.pdf",
                publishDate: "2025-09-01",
                submissionDeadline: "2025-09-30 ১৭:০০",
                contactPerson: "প্রকৌশলী মোহাম্মদ আলী",
                requirements: "ন্যূনতম ৫ বছরের অভিজ্ঞতা প্রয়োজন",
              },
              {
                id: 2,
                title: "স্কুল নির্মাণ প্রকল্প",
                budget: 5000000,
                deadline: "2025-10-15",
                status: "খোলা",
                department: "শিক্ষা বিভাগ",
                documents: "tender_school_construction.pdf",
                publishDate: "2025-08-15",
                submissionDeadline: "2025-10-15 ১৬:০০",
                contactPerson: "স্থপতি ফারিদা আক্তার",
                requirements: "স্কুল নির্মাণে অভিজ্ঞতা আবশ্যক",
              },
              {
                id: 3,
                title: "পার্ক সংস্কার কাজ",
                budget: 800000,
                deadline: "2025-09-18",
                status: "বন্ধ",
                department: "পার্ক ও বিনোদন",
                documents: "tender_park_renovation.pdf",
                publishDate: "2025-08-01",
                submissionDeadline: "2025-09-18 ১৫:০০",
                contactPerson: "ল্যান্ডস্কেপ আর্কিটেক্ট রহিম উদ্দিন",
                requirements: "পার্ক ডিজাইনে দক্ষতা প্রয়োজন",
              },
            ],
          },
        ],
      },
      audits: {
        title: "অডিট ও পরিদর্শন বিস্তারিত",
        icon: "🔍",
        sections: [
          {
            title: "সকল অডিট ও পরিদর্শন রিপোর্ট",
            data: [
              {
                id: 1,
                title: "২০২৪ সালের বার্ষিক অডিট রিপোর্ট",
                date: "2025-01-15",
                findings: "সামগ্রিক আর্থিক ব্যবস্থাপনা সন্তোষজনক",
                recommendations: "ডিজিটাল পেমেন্ট সিস্টেম উন্নত করুন",
                file: "annual_audit_2024.pdf",
                auditor: "জাতীয় অডিট অধিদপ্তর",
                scope: "সম্পূর্ণ আর্থিক বিভাগ",
                status: "সম্পন্ন",
                followUpRequired: "হ্যাঁ",
              },
              {
                id: 2,
                title: "রাস্তা নির্মাণ প্রকল্প অডিট",
                date: "2025-03-20",
                findings: "বাজেট অনুযায়ী ব্যয় হয়েছে",
                recommendations: "গুণগত মান আরো উন্নত করুন",
                file: "road_construction_audit.pdf",
                auditor: "প্রকৌশল অডিট টিম",
                scope: "রাস্তা নির্মাণ প্রকল্প",
                status: "সম্পন্ন",
                followUpRequired: "না",
              },
              {
                id: 3,
                title: "পানি সরবরাহ প্রকল্প অডিট",
                date: "2025-05-10",
                findings: "পানির গুণগত মান উন্নত করা প্রয়োজন",
                recommendations: "ফিল্টার সিস্টেম আপগ্রেড করুন",
                file: "water_supply_audit.pdf",
                auditor: "পরিবেশ অডিট বিভাগ",
                scope: "পানি সরবরাহ ব্যবস্থা",
                status: "চলমান",
                followUpRequired: "হ্যাঁ",
              },
            ],
          },
        ],
      },
    };

    // Find the specific item data
    const sectionData = mockData[section];
    if (sectionData && sectionData.sections && sectionData.sections[0]) {
      const itemId = parseInt(id);
      const item = sectionData.sections[0].data.find(
        (item) => item.id === itemId
      );

      if (item) {
        return {
          title: item.name || item.title,
          icon: sectionData.icon,
          data: item,
          isIndividualItem: true,
          section: section,
        };
      }
    }

    if (section === "projects") {
      // Mock project data for individual project
      const projectData = {
        id: parseInt(id),
        name: "ঢাকা-চট্টগ্রাম হাইওয়ে সম্প্রসারণ",
        description:
          "দেশের প্রধান দুই শহরের মধ্যে যোগাযোগ ব্যবস্থা উন্নয়নের জন্য এই প্রকল্প বাস্তবায়িত হচ্ছে।",
        totalBudget: 15000000,
        spentBudget: 8500000,
        progress: 65,
        beneficiaries: 500000,
        contractor: "বাংলাদেশ সড়ক নির্মাণ কর্পোরেশন",
        location: "ঢাকা-চট্টগ্রাম",
        timeline: {
          start: "2024-01-15",
          expected: "2025-12-31",
          phases: [
            {
              name: "জমি অধিগ্রহণ",
              status: "সম্পন্ন",
              completion: 100,
              duration: "৩ মাস",
              description: "প্রয়োজনীয় জমি অধিগ্রহণ এবং ক্ষতিপূরণ প্রদান",
            },
            {
              name: "নকশা প্রণয়ন",
              status: "সম্পন্ন",
              completion: 100,
              duration: "৪ মাস",
              description: "প্রকৌশল নকশা এবং পরিবেশগত মূল্যায়ন",
            },
            {
              name: "নির্মাণ কাজ",
              status: "চলমান",
              completion: 65,
              duration: "১৮ মাস",
              description: "প্রধান নির্মাণ কাজ এবং অবকাঠামো উন্নয়ন",
            },
            {
              name: "ফিনিশিং",
              status: "পেন্ডিং",
              completion: 0,
              duration: "৬ মাস",
              description: "চূড়ান্ত কাজ এবং গুণমান নিয়ন্ত্রণ",
            },
          ],
        },
        keyFeatures: [
          "৪ লেনের আধুনিক হাইওয়ে",
          "১৫টি ওভারব্রিজ",
          "৮টি আন্ডারপাস",
          "LED স্ট্রিট লাইটিং",
          "জরুরি সেবা স্টেশন",
        ],
        expectedBenefits: [
          "যাতায়াত সময় ৫০% কমে যাবে",
          "দুর্ঘটনা ৪০% কমবে",
          "জ্বালানি সাশ্রয় ৩০%",
          "পরিবহন খরচ ২৫% কম",
          "১০,০০০ নতুন কর্মসংস্থান",
        ],
      };

      return {
        title: `প্রকল্প বিস্তারিত - ${projectData.name}`,
        icon: "🏗️",
        isIndividualItem: true,
        data: projectData,
      };
    }

    if (section === "budget") {
      // Mock budget data for individual budget item
      const budgetData = {
        name:
          category === "monthly"
            ? `মাসিক বাজেট - ${id}`
            : `বিভাগীয় বাজেট - ${id}`,
        description: "বিস্তারিত বাজেট বিশ্লেষণ এবং ব্যয়ের হিসাব।",
        totalBudget: 5000000,
        spentBudget: 4200000,
        remainingBudget: 800000,
        efficiency: 85,
        monthlyBreakdown: [
          { month: "জানুয়ারি", allocated: 800000, spent: 750000 },
          { month: "ফেব্রুয়ারি", allocated: 850000, spent: 820000 },
          { month: "মার্চ", allocated: 900000, spent: 880000 },
        ],
        majorProjects: [
          { name: "সড়ক মেরামত", budget: 1500000, spent: 1200000 },
          { name: "বিদ্যুৎ সংযোগ", budget: 1200000, spent: 1100000 },
          { name: "পানি সরবরাহ", budget: 800000, spent: 700000 },
        ],
      };

      return {
        title: `বাজেট বিস্তারিত - ${budgetData.name}`,
        icon: "💰",
        isIndividualItem: true,
        data: budgetData,
      };
    }

    if (section === "officers") {
      // Mock officer data for individual officer
      const officerData = {
        name: `কর্মকর্তা #${id}`,
        department: "সংশ্লিষ্ট বিভাগ",
        description: "বিস্তারিত কর্মকর্তার তথ্য এবং কর্মক্ষমতা।",
        experience: "১০ বছর",
        qualification: "সংশ্লিষ্ট বিষয়ে স্নাতক ডিগ্রি",
        resolvedCases: 45,
        averageTime: "৭ দিন",
        rating: 4.8,
        contactInfo: "01711234567",
        recentAchievements: [
          "সময়মতো সকল কাজ সম্পন্ন",
          "নাগরিক সেবায় উৎকর্ষতা",
          "ডিজিটাল সেবা চালু করা",
        ],
        responsibilities: [
          "নাগরিক সমস্যা সমাধান",
          "প্রকল্প তদারকি",
          "বাজেট ব্যবস্থাপনা",
        ],
      };

      return {
        title: `কর্মকর্তা বিস্তারিত - ${officerData.name}`,
        icon: "👥",
        isIndividualItem: true,
        data: officerData,
      };
    }

    if (section === "meetings") {
      // Mock meeting data for individual meeting
      const meetingData = {
        title: `সভা #${id}`,
        description: "বিস্তারিত সভার তথ্য এবং কার্যসূচি।",
        date: "2025-09-20",
        time: "১০:০০ AM",
        venue: "জেলা প্রশাসকের কার্যালয়",
        organizer: "জেলা প্রশাসক",
        agenda: "রাস্তা মেরামত ও জনসেবা নিয়ে আলোচনা",
        status: "আসন্ন",
        participants: "নাগরিক প্রতিনিধিগণ",
        expectedAttendees: 150,
        keyPoints: [
          "রাস্তা মেরামতের অগ্রগতি পর্যালোচনা",
          "নতুন প্রকল্প অনুমোদন",
          "নাগরিক অভিযোগ শুনানি",
        ],
        decisions: [
          "রাস্তা মেরামত কাজ ত্বরান্বিত করা",
          "নতুন পানি সরবরাহ প্রকল্প শুরু",
          "মাসিক নাগরিক সভা নিয়মিত রাখা",
        ],
      };

      return {
        title: `সভা বিস্তারিত - ${meetingData.title}`,
        icon: "🏛️",
        isIndividualItem: true,
        data: meetingData,
      };
    }

    if (section === "tenders") {
      // Mock tender data for individual tender
      const tenderData = {
        title: `টেন্ডার #${id}`,
        description: "বিস্তারিত টেন্ডার তথ্য এবং শর্তাবলী।",
        budget: 2500000,
        deadline: "2025-09-30",
        status: "খোলা",
        department: "রাস্তা ও জনপথ বিভাগ",
        publishDate: "2025-09-01",
        submissionDeadline: "2025-09-30 ১৭:০০",
        contactPerson: "প্রকৌশলী মোহাম্মদ আলী",
        requirements: "ন্যূনতম ৫ বছরের অভিজ্ঞতা প্রয়োজন",
        documents: "tender_document.pdf",
        technicalSpecs: [
          "সিমেন্ট কংক্রিট গ্রেড M25",
          "স্টিল রড গ্রেড Fe415",
          "মান নিয়ন্ত্রণ প্রয়োজন",
        ],
        eligibilityCriteria: [
          "কোম্পানি নিবন্ধন প্রয়োজন",
          "VAT নিবন্ধন আবশ্যক",
          "পূর্ব অভিজ্ঞতার সার্টিফিকেট",
        ],
      };

      return {
        title: `টেন্ডার বিস্তারিত - ${tenderData.title}`,
        icon: "📋",
        isIndividualItem: true,
        data: tenderData,
      };
    }

    if (section === "audits") {
      // Mock audit data for individual audit
      const auditData = {
        title: `অডিট রিপোর্ট #${id}`,
        description: "বিস্তারিত অডিট রিপোর্ট এবং সুপারিশ।",
        date: "2025-01-15",
        auditor: "জাতীয় অডিট অধিদপ্তর",
        findings: "সামগ্রিক আর্থিক ব্যবস্থাপনা সন্তোষজনক",
        recommendations: "ডিজিটাল পেমেন্ট সিস্টেম উন্নত করুন",
        scope: "সম্পূর্ণ আর্থিক বিভাগ",
        status: "সম্পন্ন",
        followUpRequired: "হ্যাঁ",
        file: "audit_report.pdf",
        keyFindings: [
          "বাজেট অনুযায়ী ব্যয় হয়েছে",
          "স্বচ্ছতা বজায় রাখা হয়েছে",
          "কিছু প্রক্রিয়া উন্নতি প্রয়োজন",
        ],
        actionItems: [
          "ডিজিটাল সিস্টেম আপগ্রেড",
          "স্টাফ প্রশিক্ষণ প্রয়োজন",
          "নিয়মিত পর্যবেক্ষণ বৃদ্ধি",
        ],
      };

      return {
        title: `অডিট বিস্তারিত - ${auditData.title}`,
        icon: "🔍",
        isIndividualItem: true,
        data: auditData,
      };
    }

    // Default return for other sections
    return {
      title: "বিস্তারিত তথ্য",
      icon: "📋",
      isIndividualItem: true,
      data: {
        message: "এই আইটেমের বিস্তারিত তথ্য শীঘ্রই যোগ করা হবে।",
      },
    };
  };

  useEffect(() => {
    loadDetailData();
  }, [loadDetailData]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">তথ্য লোড হচ্ছে...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!detailData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              তথ্য পাওয়া যায়নি
            </h1>
            <button
              onClick={() => navigate("/transparency")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              ফিরে যান
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => navigate("/transparency")}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors self-start"
              >
                ← ফিরে যান
              </button>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                  <span className="text-white text-xl sm:text-2xl">
                    {detailData.icon}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {detailData.title}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    সম্পূর্ণ বিস্তারিত তথ্য ও বিশ্লেষণ
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 w-full sm:w-auto">
                <span>📊</span>
                <span>রিপোর্ট ডাউনলোড</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 w-full sm:w-auto">
                <span>📧</span>
                <span>শেয়ার করুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {detailData.isIndividualItem ? (
          <div className="space-y-8">
            {/* Individual Item Display */}
            <Card title="সম্পূর্ণ বিস্তারিত তথ্য">
              <div className="space-y-6">
                {section === "projects" && (
                  <div className="space-y-6">
                    {/* Project Header */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-blue-800 mb-2">
                        {detailData.data.name}
                      </h2>
                      <p className="text-gray-700">
                        {detailData.data.description}
                      </p>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(detailData.data.totalBudget)}
                        </div>
                        <div className="text-sm text-gray-600">মোট বাজেট</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(detailData.data.spentBudget)}
                        </div>
                        <div className="text-sm text-gray-600">ব্যয়িত</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {detailData.data.progress}%
                        </div>
                        <div className="text-sm text-gray-600">সম্পন্ন</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {detailData.data.beneficiaries
                            ? detailData.data.beneficiaries.toLocaleString()
                            : "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">উপকারভোগী</div>
                      </div>
                    </div>

                    {/* Project Timeline */}
                    <div className="bg-white border rounded-lg p-4 sm:p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        প্রকল্পের পর্যায়সমূহ
                      </h3>
                      <div className="space-y-4">
                        {(detailData.data.timeline?.phases || []).map(
                          (phase, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4 space-y-4 sm:space-y-0"
                            >
                              {/* Mobile: Stacked layout */}
                              <div className="sm:hidden space-y-3">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-800 text-sm">
                                      {phase.name}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                      সময়কাল: {phase.duration}
                                    </p>
                                  </div>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
                                      phase.status === "সম্পন্ন"
                                        ? "bg-green-100 text-green-800"
                                        : phase.status === "চলমান"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {phase.status}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${getProgressColor(
                                        phase.completion
                                      )}`}
                                      style={{ width: `${phase.completion}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
                                    {phase.completion}%
                                  </span>
                                </div>
                              </div>

                              {/* Desktop: Horizontal layout */}
                              <div className="hidden sm:flex sm:items-center sm:justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-800">
                                    {phase.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    সময়কাল: {phase.duration}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-4 ml-4">
                                  <div className="w-24 lg:w-32 bg-gray-200 rounded-full h-3">
                                    <div
                                      className={`h-3 rounded-full ${getProgressColor(
                                        phase.completion
                                      )}`}
                                      style={{ width: `${phase.completion}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                                    {phase.completion}%
                                  </span>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                      phase.status === "সম্পন্ন"
                                        ? "bg-green-100 text-green-800"
                                        : phase.status === "চলমান"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {phase.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Project Features */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-green-800">
                          মূল বৈশিষ্ট্য
                        </h3>
                        <ul className="space-y-2">
                          {(detailData.data.keyFeatures || []).map(
                            (feature, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <span className="text-green-500">✓</span>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-800">
                          প্রত্যাশিত সুবিধা
                        </h3>
                        <ul className="space-y-2">
                          {(detailData.data.expectedBenefits || []).map(
                            (benefit, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <span className="text-blue-500">→</span>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {section === "budget" && (
                  <div className="space-y-6">
                    {/* Budget Header */}
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-green-800 mb-2">
                        {detailData.data.name}
                      </h2>
                      <p className="text-gray-700">
                        {detailData.data.description}
                      </p>
                    </div>

                    {/* Budget Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(detailData.data.totalBudget)}
                        </div>
                        <div className="text-sm text-gray-600">মোট বাজেট</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {formatCurrency(detailData.data.spentBudget)}
                        </div>
                        <div className="text-sm text-gray-600">ব্যয়িত</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(detailData.data.remainingBudget)}
                        </div>
                        <div className="text-sm text-gray-600">অবশিষ্ট</div>
                      </div>
                    </div>

                    {/* Monthly Breakdown */}
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        মাসিক ভাঙ্গন
                      </h3>
                      <div className="space-y-3">
                        {(detailData.data.monthlyBreakdown || []).map(
                          (month, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded"
                            >
                              <span className="font-medium">{month.month}</span>
                              <div className="flex space-x-4 text-sm">
                                <span>
                                  বরাদ্দ: {formatCurrency(month.allocated)}
                                </span>
                                <span>
                                  ব্যয়: {formatCurrency(month.spent)}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Major Projects */}
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        প্রধান প্রকল্পসমূহ
                      </h3>
                      <div className="space-y-3">
                        {(detailData.data.majorProjects || []).map(
                          (project, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded"
                            >
                              <span className="font-medium">
                                {project.name}
                              </span>
                              <div className="flex space-x-4 text-sm">
                                <span>
                                  বাজেট: {formatCurrency(project.budget)}
                                </span>
                                <span>
                                  ব্যয়: {formatCurrency(project.spent)}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {section === "officers" && (
                  <div className="space-y-6">
                    {/* Officer Header */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-blue-800 mb-2">
                        {detailData.data.name}
                      </h2>
                      <p className="text-gray-700">
                        {detailData.data.description}
                      </p>
                    </div>

                    {/* Officer Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {detailData.data.resolvedCases}
                        </div>
                        <div className="text-sm text-gray-600">
                          সমাধানকৃত মামলা
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {detailData.data.averageTime}
                        </div>
                        <div className="text-sm text-gray-600">গড় সময়</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {detailData.data.rating} ⭐
                        </div>
                        <div className="text-sm text-gray-600">রেটিং</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {detailData.data.experience}
                        </div>
                        <div className="text-sm text-gray-600">অভিজ্ঞতা</div>
                      </div>
                    </div>

                    {/* Officer Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-green-800">
                          সাম্প্রতিক অর্জন
                        </h3>
                        <ul className="space-y-2">
                          {(detailData.data.recentAchievements || []).map(
                            (achievement, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <span className="text-green-500">✓</span>
                                <span className="text-gray-700">
                                  {achievement}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-800">
                          দায়িত্বসমূহ
                        </h3>
                        <ul className="space-y-2">
                          {(detailData.data.responsibilities || []).map(
                            (responsibility, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <span className="text-blue-500">→</span>
                                <span className="text-gray-700">
                                  {responsibility}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {section === "officers" && (
                  <div className="space-y-6">
                    {/* Officer Header */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-blue-800 mb-2">
                        {detailData.data.name}
                      </h2>
                      <p className="text-gray-700">
                        {detailData.data.department} বিভাগের কর্মকর্তা
                      </p>
                    </div>

                    {/* Officer Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {detailData.data.resolvedCases}
                        </div>
                        <div className="text-sm text-gray-600">
                          সমাধানকৃত মামলা
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {detailData.data.averageTime}
                        </div>
                        <div className="text-sm text-gray-600">গড় সময়</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {detailData.data.rating}/5.0
                        </div>
                        <div className="text-sm text-gray-600">রেটিং</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {detailData.data.experience}
                        </div>
                        <div className="text-sm text-gray-600">অভিজ্ঞতা</div>
                      </div>
                    </div>

                    {/* Officer Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-green-800">
                          ব্যক্তিগত তথ্য
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              নাম:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              বিভাগ:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.department}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              যোগ্যতা:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.qualification}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              যোগাযোগ:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.contactInfo}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-800">
                          কর্মক্ষমতা
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              সমাধানকৃত মামলা:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.resolvedCases}টি
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              গড় সমাধান সময়:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.averageTime}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              কর্মক্ষমতা রেটিং:
                            </span>
                            <div className="flex items-center">
                              <span className="text-yellow-500">
                                {"★".repeat(Math.floor(detailData.data.rating))}
                              </span>
                              <span className="ml-1 text-gray-800">
                                {detailData.data.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              কর্মক্ষেত্রে অভিজ্ঞতা:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {section === "meetings" && (
                  <div className="space-y-6">
                    {/* Meeting Header */}
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-purple-800 mb-2">
                        {detailData.data.title}
                      </h2>
                      <p className="text-gray-700">{detailData.data.agenda}</p>
                    </div>

                    {/* Meeting Details */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {new Date(detailData.data.date).toLocaleDateString(
                            "bn-BD"
                          )}
                        </div>
                        <div className="text-sm text-gray-600">তারিখ</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {detailData.data.time}
                        </div>
                        <div className="text-sm text-gray-600">সময়</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {detailData.data.expectedAttendees}
                        </div>
                        <div className="text-sm text-gray-600">
                          প্রত্যাশিত উপস্থিতি
                        </div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div
                          className={`text-2xl font-bold ${
                            detailData.data.status === "আসন্ন"
                              ? "text-blue-600"
                              : detailData.data.status === "সম্পন্ন"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {detailData.data.status}
                        </div>
                        <div className="text-sm text-gray-600">অবস্থা</div>
                      </div>
                    </div>

                    {/* Meeting Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-green-800">
                          সভার তথ্য
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              স্থান:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.venue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              আয়োজক:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.organizer}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              অংশগ্রহণকারী:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.participants}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-800">
                          এজেন্ডা
                        </h3>
                        <p className="text-gray-700">
                          {detailData.data.agenda}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {section === "tenders" && (
                  <div className="space-y-6">
                    {/* Tender Header */}
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-orange-800 mb-2">
                        {detailData.data.title}
                      </h2>
                      <p className="text-gray-700">
                        {detailData.data.department} থেকে প্রকাশিত টেন্ডার
                      </p>
                    </div>

                    {/* Tender Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(detailData.data.budget)}
                        </div>
                        <div className="text-sm text-gray-600">মোট বাজেট</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {new Date(
                            detailData.data.publishDate
                          ).toLocaleDateString("bn-BD")}
                        </div>
                        <div className="text-sm text-gray-600">
                          প্রকাশের তারিখ
                        </div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {new Date(
                            detailData.data.deadline
                          ).toLocaleDateString("bn-BD")}
                        </div>
                        <div className="text-sm text-gray-600">শেষ তারিখ</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div
                          className={`text-2xl font-bold ${
                            detailData.data.status === "খোলা"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {detailData.data.status}
                        </div>
                        <div className="text-sm text-gray-600">অবস্থা</div>
                      </div>
                    </div>

                    {/* Tender Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-green-800">
                          টেন্ডারের তথ্য
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              বিভাগ:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.department}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              যোগাযোগ ব্যক্তি:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.contactPerson}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              জমা দেয়ার শেষ সময়:
                            </span>
                            <span className="text-gray-800">
                              {detailData.data.submissionDeadline}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">
                              ডকুমেন্ট:
                            </span>
                            <span className="text-blue-600 hover:underline cursor-pointer">
                              {detailData.data.documents}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-800">
                          প্রয়োজনীয়তা
                        </h3>
                        <p className="text-gray-700">
                          {detailData.data.requirements}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {section === "audits" && (
                  <div className="space-y-6">
                    {/* Audit Header */}
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-red-800 mb-2">
                        {detailData.data.title}
                      </h2>
                      <p className="text-gray-700">
                        {detailData.data.auditor} কর্তৃক পরিচালিত অডিট
                      </p>
                    </div>

                    {/* Audit Details */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {new Date(detailData.data.date).toLocaleDateString(
                            "bn-BD"
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          অডিটের তারিখ
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div
                          className={`text-2xl font-bold ${
                            detailData.data.status === "সম্পন্ন"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {detailData.data.status}
                        </div>
                        <div className="text-sm text-gray-600">অবস্থা</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold text-green-600">
                          {detailData.data.scope}
                        </div>
                        <div className="text-sm text-gray-600">পরিধি</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div
                          className={`text-2xl font-bold ${
                            detailData.data.followUpRequired === "হ্যাঁ"
                              ? "text-orange-600"
                              : "text-green-600"
                          }`}
                        >
                          {detailData.data.followUpRequired}
                        </div>
                        <div className="text-sm text-gray-600">
                          ফলোআপ প্রয়োজন
                        </div>
                      </div>
                    </div>

                    {/* Audit Findings and Recommendations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-green-800">
                          অডিটের ফলাফল
                        </h3>
                        <p className="text-gray-700">
                          {detailData.data.findings}
                        </p>
                      </div>
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-800">
                          সুপারিশসমূহ
                        </h3>
                        <p className="text-gray-700">
                          {detailData.data.recommendations}
                        </p>
                      </div>
                    </div>

                    {/* Additional Audit Info */}
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-red-800">
                        অতিরিক্ত তথ্য
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">
                            অডিটর:
                          </span>
                          <span className="text-gray-800">
                            {detailData.data.auditor}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">
                            রিপোর্ট ফাইল:
                          </span>
                          <span className="text-blue-600 hover:underline cursor-pointer">
                            {detailData.data.file}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : (
          // Section Overview Page - Show all items in list format with detail buttons
          <div className="space-y-8">
            {section === "projects" && detailData.sections[0] && (
              <Card title="সকল প্রকল্প">
                <div className="space-y-4">
                  {detailData.sections[0].data.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            প্রকল্প আইডি: {project.id}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            এলাকা: {project.location}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              navigate(`/transparency/projects/${project.id}`)
                            }
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm flex items-center space-x-2 shrink-0 font-semibold shadow-md"
                          >
                            <span>বিস্তারিত দেখুন</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {formatCurrency(project.totalBudget)}
                          </div>
                          <div className="text-xs text-gray-600">মোট বাজেট</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(project.spentBudget)}
                          </div>
                          <div className="text-xs text-gray-600">ব্যয়িত</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center relative">
                          {/* Status badge positioned above the progress percentage */}
                          <div className="absolute -top-3 right-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.progress === 100
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {project.progress === 100 ? "সম্পন্ন" : "চলমান"}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-purple-600">
                            {project.progress}%
                          </div>
                          <div className="text-xs text-gray-600">সম্পন্ন</div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-orange-600">
                            {project.beneficiaries
                              ? project.beneficiaries.toLocaleString()
                              : "N/A"}
                          </div>
                          <div className="text-xs text-gray-600">উপকারভোগী</div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                        <span>
                          <strong>ঠিকাদার:</strong> {project.contractor}
                        </span>
                        <span>
                          <strong>সময়কাল:</strong>{" "}
                          {project.startDate || "তথ্য নেই"} -{" "}
                          {project.expectedEnd ||
                            project.completionDate ||
                            "তথ্য নেই"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {section === "budget" && detailData.sections && (
              <div className="space-y-6">
                {/* Monthly Budget List */}
                {detailData.sections[0] && (
                  <Card title="মাসিক বাজেট ব্রেকডাউন">
                    <div className="space-y-4">
                      {detailData.sections[0].data.map((budget, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-gray-800">
                              {budget.month}
                            </h4>
                            <button
                              onClick={() =>
                                navigate(
                                  `/transparency/budget/${budget.month
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}`
                                )
                              }
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm flex items-center space-x-2 font-semibold shadow-md"
                            >
                              <span>বিস্তারিত দেখুন</span>
                              <span>→</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="bg-blue-50 p-2 rounded">
                              <strong>বরাদ্দ:</strong>{" "}
                              {formatCurrency(budget.allocated)}
                            </div>
                            <div className="bg-red-50 p-2 rounded">
                              <strong>ব্যয়:</strong>{" "}
                              {formatCurrency(budget.spent)}
                            </div>
                            <div className="bg-green-50 p-2 rounded">
                              <strong>সাশ্রয়:</strong>{" "}
                              {formatCurrency(budget.allocated - budget.spent)}
                            </div>
                            <div className="flex items-center bg-gray-50 p-2 rounded">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className={`h-2 rounded-full ${getProgressColor(
                                    budget.percentage
                                  )}`}
                                  style={{ width: `${budget.percentage}%` }}
                                ></div>
                              </div>
                              <span>{budget.percentage}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Department Budget List */}
                {detailData.sections[1] && (
                  <Card title="বিভাগওয়ারী বাজেট">
                    <div className="space-y-4">
                      {detailData.sections[1].data.map((dept, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {dept.department}
                            </h3>
                            <button
                              onClick={() =>
                                navigate(
                                  `/transparency/budget/${dept.department
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}`
                                )
                              }
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm flex items-center space-x-2 font-semibold shadow-md"
                            >
                              <span>বিস্তারিত দেখুন</span>
                              <span>→</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-lg font-bold text-blue-600">
                                {formatCurrency(dept.totalBudget)}
                              </div>
                              <div className="text-sm text-gray-600">
                                মোট বাজেট
                              </div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <div className="text-lg font-bold text-green-600">
                                {formatCurrency(dept.spent)}
                              </div>
                              <div className="text-sm text-gray-600">
                                ব্যয়িত
                              </div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                              <div className="text-lg font-bold text-purple-600">
                                {dept.projects}
                              </div>
                              <div className="text-sm text-gray-600">
                                প্রকল্প সংখ্যা
                              </div>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded-lg">
                              <div className="text-lg font-bold text-orange-600">
                                {dept.efficiency}%
                              </div>
                              <div className="text-sm text-gray-600">
                                দক্ষতা
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                            <strong>কার্যক্রম:</strong> {dept.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Officers Section */}
            {section === "officers" && detailData.sections[0] && (
              <Card title={detailData.sections[0].title}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {detailData.sections[0].data.map((officer) => (
                    <div
                      key={officer.id}
                      className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
                    >
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">👤</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {officer.name}
                        </h3>
                        <p className="text-sm text-blue-600">
                          {officer.department}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>
                          <strong>অভিজ্ঞতা:</strong> {officer.experience}
                        </p>
                        <p>
                          <strong>যোগ্যতা:</strong> {officer.qualification}
                        </p>
                        <p>
                          <strong>সমাধানকৃত মামলা:</strong>{" "}
                          {officer.resolvedCases}
                        </p>
                        <p>
                          <strong>গড় সময়:</strong> {officer.averageTime}
                        </p>
                        <div className="flex items-center">
                          <strong>রেটিং:</strong>
                          <span className="ml-2 text-yellow-400">
                            {"★".repeat(Math.floor(officer.rating))}
                          </span>
                          <span className="ml-1 text-gray-600">
                            {officer.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            navigate(`/transparency/officers/${officer.id}`)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors"
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Meetings Section */}
            {section === "meetings" && detailData.sections[0] && (
              <Card title={detailData.sections[0].title}>
                <div className="space-y-6">
                  {detailData.sections[0].data.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {meeting.title}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
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
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            meeting.status === "আসন্ন"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {meeting.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>
                          <strong>আয়োজক:</strong> {meeting.organizer}
                        </p>
                        <p>
                          <strong>অংশগ্রহণকারী:</strong> {meeting.participants}
                        </p>
                        <p>
                          <strong>প্রত্যাশিত উপস্থিতি:</strong>{" "}
                          {meeting.expectedAttendees} জন
                        </p>
                        <p>
                          <strong>আলোচ্য বিষয়:</strong> {meeting.agenda}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            navigate(`/transparency/meetings/${meeting.id}`)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors"
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tenders Section */}
            {section === "tenders" && detailData.sections[0] && (
              <Card title={detailData.sections[0].title}>
                <div className="space-y-6">
                  {detailData.sections[0].data.map((tender) => (
                    <div
                      key={tender.id}
                      className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {tender.title}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <p>
                              <strong>বাজেট:</strong>{" "}
                              {formatCurrency(tender.budget)}
                            </p>
                            <p>
                              <strong>শেষ তারিখ:</strong> {tender.deadline}
                            </p>
                            <p>
                              <strong>বিভাগ:</strong> {tender.department}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            tender.status === "খোলা"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {tender.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>
                          <strong>প্রকাশের তারিখ:</strong> {tender.publishDate}
                        </p>
                        <p>
                          <strong>দাখিলের শেষ তারিখ:</strong>{" "}
                          {tender.submissionDeadline}
                        </p>
                        <p>
                          <strong>যোগাযোগ:</strong> {tender.contactPerson}
                        </p>
                        <p>
                          <strong>শর্তাবলী:</strong> {tender.requirements}
                        </p>
                        <p className="text-blue-600 cursor-pointer hover:underline">
                          📄 {tender.documents}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            navigate(`/transparency/tenders/${tender.id}`)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors"
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Audits Section */}
            {section === "audits" && detailData.sections[0] && (
              <Card title={detailData.sections[0].title}>
                <div className="space-y-6">
                  {detailData.sections[0].data.map((audit) => (
                    <div
                      key={audit.id}
                      className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {audit.title}
                          </h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-gray-600">
                            <p>
                              <strong>তারিখ:</strong> {audit.date}
                            </p>
                            <p>
                              <strong>অডিটর:</strong> {audit.auditor}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            audit.status === "সম্পন্ন"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {audit.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>
                          <strong>পরিধি:</strong> {audit.scope}
                        </p>
                        <p>
                          <strong>ফলাফল:</strong> {audit.findings}
                        </p>
                        <p>
                          <strong>সুপারিশ:</strong> {audit.recommendations}
                        </p>
                        <p>
                          <strong>ফলো-আপ প্রয়োজন:</strong>{" "}
                          {audit.followUpRequired}
                        </p>
                        <p className="text-blue-600 cursor-pointer hover:underline">
                          📄 {audit.file}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            navigate(`/transparency/audits/${audit.id}`)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors"
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Generic message for other sections */}
            {![
              "projects",
              "budget",
              "officers",
              "meetings",
              "tenders",
              "audits",
            ].includes(section) && (
              <Card title={detailData.title}>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🔧</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    উন্নয়ন চলছে
                  </h3>
                  <p className="text-gray-600">
                    এই বিভাগের তালিকা ভিউ শীঘ্রই যোগ করা হবে।
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransparencyDetailPage;
