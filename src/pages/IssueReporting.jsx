import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";
import {
  addNewIssue,
  ISSUE_CATEGORIES,
  ISSUE_PRIORITIES,
} from "../data/issuesData";

const IssueReporting = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    location: {
      address: "",
      coordinates: { lat: null, lng: null },
    },
    reportedBy: {
      name: "",
      phone: "",
      email: "",
    },
  });
  const [attachments, setAttachments] = useState([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested objects like reportedBy.name
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLocationChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: e.target.value,
      },
    }));
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: { lat: latitude, lng: longitude },
            },
          }));
          setIsGettingLocation(false);

          // Optional: Reverse geocoding to get address
          // You could add a service here to convert coordinates to address
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
          alert("অবস্থান নির্ধারণে সমস্যা হয়েছে। দয়া করে ঠিকানা লিখুন।");
        }
      );
    } else {
      setIsGettingLocation(false);
      alert("আপনার ব্রাউজার GPS সুবিধা সমর্থন করে না।");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const fileData = {
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "video",
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        file: file, // Store the actual file object
      };

      setAttachments((prev) => [...prev, fileData]);
    });

    // Reset the input
    e.target.value = "";
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.reportedBy.name.trim() ||
      !formData.reportedBy.phone.trim()
    ) {
      alert("দয়া করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    if (
      !formData.location.address.trim() &&
      !formData.location.coordinates.lat
    ) {
      alert("দয়া করে অবস্থান প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare issue data
      const issueData = {
        ...formData,
        attachments: attachments.map(({ file, ...rest }) => rest), // eslint-disable-line no-unused-vars
        category: formData.category || "Other",
      };

      // Add the issue
      const newIssue = addNewIssue(issueData);

      // Navigate to tracking page with highlight
      navigate(`/issues?highlight=${newIssue.id}`);
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("সমস্যা জমা দিতে ত্রুটি হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          নাগরিক সমস্যা রিপোর্ট
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          আপনার এলাকার সমস্যা জানান এবং সমাধানে সহায়তা করুন
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">মূল তথ্য</h2>

          <div className="space-y-4">
            <FormField
              label="সমস্যার শিরোনাম *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="সংক্ষেপে সমস্যার বিষয় লিখুন..."
              required
            />

            <FormField
              label="বিস্তারিত বর্ণনা *"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="সমস্যার বিস্তারিত বর্ণনা দিন..."
              rows={4}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="সমস্যার ধরন"
                type="select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">ধরন নির্বাচন করুন</option>
                {ISSUE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </FormField>

              <FormField
                label="গুরুত্ব"
                type="select"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                {ISSUE_PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </FormField>
            </div>
          </div>
        </Card>

        {/* Location Information */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            অবস্থানের তথ্য
          </h2>

          <div className="space-y-4">
            <FormField
              label="ঠিকানা *"
              name="location.address"
              value={formData.location.address}
              onChange={handleLocationChange}
              placeholder="এলাকা, রাস্তা, ল্যান্ডমার্ক ইত্যাদি..."
              required
            />

            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="flex items-center space-x-2"
              >
                <span>📍</span>
                <span>
                  {isGettingLocation
                    ? "অবস্থান নির্ধারণ হচ্ছে..."
                    : "বর্তমান অবস্থান ব্যবহার করুন"}
                </span>
              </Button>

              {formData.location.coordinates.lat && (
                <span className="text-sm text-green-600">
                  ✓ GPS অবস্থান সংরক্ষিত
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* File Attachments */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ছবি ও ভিডিও সংযুক্তি
          </h2>

          <div className="space-y-4">
            {/* File Upload Button */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-blue-600">+</span>
                </div>
                <p className="text-gray-600">ছবি বা ভিডিও যোগ করুন</p>
                <p className="text-sm text-gray-500">
                  একাধিক ফাইল নির্বাচন করা যাবে
                </p>
              </label>
            </div>

            {/* Uploaded Files List */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">সংযুক্ত ফাইলসমূহ:</h3>
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {attachment.type === "image" ? "📷" : "🎥"}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{attachment.name}</p>
                        <p className="text-xs text-gray-500">
                          {attachment.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Reporter Information */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            যোগাযোগের তথ্য
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="নাম *"
              name="reportedBy.name"
              value={formData.reportedBy.name}
              onChange={handleInputChange}
              placeholder="আপনার পূর্ণ নাম..."
              required
            />

            <FormField
              label="মোবাইল নম্বর *"
              name="reportedBy.phone"
              value={formData.reportedBy.phone}
              onChange={handleInputChange}
              placeholder="01XXXXXXXXX"
              required
            />

            <FormField
              label="ইমেইল (ঐচ্ছিক)"
              type="email"
              name="reportedBy.email"
              value={formData.reportedBy.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
            />
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-lg"
          >
            {isSubmitting ? "জমা দেওয়া হচ্ছে..." : "সমস্যা রিপোর্ট করুন"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueReporting;
