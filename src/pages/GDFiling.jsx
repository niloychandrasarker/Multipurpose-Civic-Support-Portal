import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";

const GDFiling = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    phone: "",
    email: "",
    address: "",

    // Incident Details
    incidentType: "",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    description: "",

    // Additional Information
    witnessName: "",
    witnessPhone: "",
    evidenceFiles: [],

    // Declaration
    declaration: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, ...files],
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmissionStatus("success");
    setTimeout(() => {
      setSubmissionStatus(null);
      setCurrentStep(1);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        incidentType: "",
        incidentDate: "",
        incidentTime: "",
        incidentLocation: "",
        description: "",
        witnessName: "",
        witnessPhone: "",
        evidenceFiles: [],
        declaration: false,
      });
    }, 3000);
  };

  const steps = [
    {
      id: 1,
      name: "Personal Information",
      description: "Your contact details",
    },
    { id: 2, name: "Incident Details", description: "What happened and where" },
    {
      id: 3,
      name: "Evidence & Witnesses",
      description: "Supporting information",
    },
    { id: 4, name: "Review & Submit", description: "Confirm your submission" },
  ];

  if (submissionStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              GD Report Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your report has been filed with reference number:{" "}
              <strong>GD{Date.now()}</strong>
            </p>
            <p className="text-sm text-gray-500">
              You will receive updates via SMS and email. Please keep this
              reference number for tracking.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          File General Diary (GD) Report
        </h1>
        <p className="text-gray-600">
          Submit your incident report through our secure online system
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step.id ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div className="text-center mt-2">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-1 mt-4 ${
                    currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Address"
                  name="address"
                  type="textarea"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="md:col-span-2"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Incident Details */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Incident Details</h3>
              <div className="space-y-4">
                <FormField
                  label="Type of Incident"
                  name="incidentType"
                  type="select"
                  value={formData.incidentType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select incident type</option>
                  <option value="theft">Theft</option>
                  <option value="fraud">Fraud</option>
                  <option value="accident">Accident</option>
                  <option value="harassment">Harassment</option>
                  <option value="vandalism">Vandalism</option>
                  <option value="other">Other</option>
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Date of Incident"
                    name="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Time of Incident"
                    name="incidentTime"
                    type="time"
                    value={formData.incidentTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <FormField
                  label="Location of Incident"
                  name="incidentLocation"
                  value={formData.incidentLocation}
                  onChange={handleInputChange}
                  placeholder="Detailed address where incident occurred"
                  required
                />

                <FormField
                  label="Detailed Description"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of the incident..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Evidence & Witnesses */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Evidence & Witnesses
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Witness Name (if any)"
                    name="witnessName"
                    value={formData.witnessName}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Witness Phone (if any)"
                    name="witnessPhone"
                    type="tel"
                    value={formData.witnessPhone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Evidence Files (Photos, Documents, etc.)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: Images, PDF, DOC, DOCX (Max 5MB per file)
                  </p>
                </div>

                {formData.evidenceFiles.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Uploaded Files:</h4>
                    <div className="space-y-2">
                      {formData.evidenceFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <span className="text-sm">{file.name}</span>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeFile(index)}
                            type="button"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Personal Information</h4>
                  <p>
                    <strong>Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Incident Details</h4>
                  <p>
                    <strong>Type:</strong> {formData.incidentType}
                  </p>
                  <p>
                    <strong>Date & Time:</strong> {formData.incidentDate} at{" "}
                    {formData.incidentTime}
                  </p>
                  <p>
                    <strong>Location:</strong> {formData.incidentLocation}
                  </p>
                  <p>
                    <strong>Description:</strong> {formData.description}
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="declaration"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  <label
                    htmlFor="declaration"
                    className="text-sm text-gray-700"
                  >
                    I declare that the information provided is true and accurate
                    to the best of my knowledge.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="secondary"
              onClick={prevStep}
              disabled={currentStep === 1}
              type="button"
            >
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep} type="button">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!formData.declaration}
                variant="success"
              >
                Submit GD Report
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
};

export default GDFiling;
