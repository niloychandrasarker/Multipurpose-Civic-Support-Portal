import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";

const FinePayment = () => {
  const [currentStep, setCurrentStep] = useState("search");
  const [searchValue, setSearchValue] = useState("");
  const [selectedFine, setSelectedFine] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    phone: "",
  });

  // Mock fine data
  const mockFines = [
    {
      id: "TF001",
      type: "Traffic Violation",
      description: "Over-speeding on City Highway",
      amount: 3000,
      date: "2025-09-05",
      dueDate: "2025-09-20",
      location: "City Highway, Sector 15",
      vehicle: "DL-01-AB-1234",
      status: "Pending",
    },
    {
      id: "PF002",
      type: "Parking Fine",
      description: "Illegal parking in no-parking zone",
      amount: 600,
      date: "2025-09-08",
      dueDate: "2025-09-23",
      location: "Main Market, Central Delhi",
      vehicle: "DL-01-AB-1234",
      status: "Pending",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // In real implementation, this would fetch from backend
    const foundFines = mockFines.filter(
      (fine) =>
        fine.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        fine.vehicle.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (foundFines.length > 0) {
      setSelectedFine(foundFines[0]);
      setCurrentStep("invoice");
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setCurrentStep("processing");

    setTimeout(() => {
      setCurrentStep("confirmation");
    }, 3000);
  };

  const resetFlow = () => {
    setCurrentStep("search");
    setSearchValue("");
    setSelectedFine(null);
    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      email: "",
      phone: "",
    });
  };

  if (currentStep === "processing") {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we process your payment...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (currentStep === "confirmation") {
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
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your fine payment has been processed successfully.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Transaction ID:</strong> TXN{Date.now()}
                </p>
                <p>
                  <strong>Fine ID:</strong> {selectedFine?.id}
                </p>
                <p>
                  <strong>Amount Paid:</strong> ₹{selectedFine?.amount}
                </p>
                <p>
                  <strong>Payment Date:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-medium">Paid</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline">Download Receipt</Button>
              <Button onClick={resetFlow}>Pay Another Fine</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Fine Payment</h1>
        <p className="text-gray-600">
          Pay your traffic fines and other penalties online
        </p>
      </div>

      {currentStep === "search" && (
        <Card title="Search Your Fine">
          <form onSubmit={handleSearch} className="space-y-4">
            <FormField
              label="Enter Fine ID or Vehicle Number"
              name="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="e.g., TF001 or DL-01-AB-1234"
              required
            />
            <Button type="submit">Search Fine</Button>
          </form>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Sample Fine IDs for Testing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockFines.map((fine, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{fine.id}</p>
                  <p className="text-sm text-gray-600">{fine.description}</p>
                  <p className="text-sm font-medium text-red-600">
                    ৳{fine.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {currentStep === "invoice" && selectedFine && (
        <div className="space-y-6">
          <Card title="Fine Invoice">
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">
                      {selectedFine.type} - {selectedFine.id}
                    </h3>
                    <p className="text-red-700">{selectedFine.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-900">
                      ৳{selectedFine.amount}
                    </p>
                    <p className="text-sm text-red-600">
                      Due: {selectedFine.dueDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Violation Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Date:</strong> {selectedFine.date}
                    </p>
                    <p>
                      <strong>Location:</strong> {selectedFine.location}
                    </p>
                    <p>
                      <strong>Vehicle:</strong> {selectedFine.vehicle}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        {selectedFine.status}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Payment Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Base Fine:</strong> ৳{selectedFine.amount}
                    </p>
                    <p>
                      <strong>Processing Fee:</strong> ৳0
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ৳{selectedFine.amount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setCurrentStep("payment")}
                  variant="success"
                >
                  Proceed to Payment
                </Button>
                <Button
                  onClick={() => setCurrentStep("search")}
                  variant="outline"
                >
                  Back to Search
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {currentStep === "payment" && selectedFine && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card title="Payment Information">
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    Card Details
                  </h4>
                  <div className="space-y-4">
                    <FormField
                      label="Card Number"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handlePaymentInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Expiry Date"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                      <FormField
                        label="CVV"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handlePaymentInputChange}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                    <FormField
                      label="Cardholder Name"
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handlePaymentInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={paymentData.email}
                      onChange={handlePaymentInputChange}
                      placeholder="john@example.com"
                      required
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={paymentData.phone}
                      onChange={handlePaymentInputChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="terms" className="mr-2" required />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the terms and conditions and privacy policy
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" variant="success" className="flex-1">
                    Pay ₹{selectedFine.amount}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("invoice")}
                    variant="outline"
                    type="button"
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          <div>
            <Card title="Payment Summary">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Fine Details
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Fine ID:</strong> {selectedFine.id}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedFine.type}
                    </p>
                    <p>
                      <strong>Vehicle:</strong> {selectedFine.vehicle}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Fine Amount:</span>
                    <span>৳{selectedFine.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee:</span>
                    <span>৳0</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
                    <span>Total:</span>
                    <span>৳{selectedFine.amount}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700">
                    💳 Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinePayment;
