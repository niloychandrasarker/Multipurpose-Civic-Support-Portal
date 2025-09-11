import { useState } from "react";

const SOSButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const emergencyContacts = [
    { name: "Police", number: "100", color: "bg-red-600" },
    { name: "Fire", number: "101", color: "bg-orange-600" },
    { name: "Ambulance", number: "102", color: "bg-green-600" },
    { name: "Disaster", number: "108", color: "bg-blue-600" },
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`, "_self");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 space-y-2">
          {emergencyContacts.map((contact, index) => (
            <button
              key={index}
              onClick={() => handleCall(contact.number)}
              className={`flex items-center ${contact.color} text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
            >
              <span className="mr-2">{contact.name}</span>
              <span className="font-bold">{contact.number}</span>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${
          isExpanded ? "bg-gray-600" : "bg-red-600"
        } text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center`}
      >
        {isExpanded ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <span className="font-bold text-lg">SOS</span>
        )}
      </button>
    </div>
  );
};

export default SOSButton;
