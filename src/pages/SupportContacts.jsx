import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import MapPlaceholder from "../components/MapPlaceholder";

const SupportContacts = () => {
  const [selectedCategory, setSelectedCategory] = useState("emergency");
  const [searchLocation, setSearchLocation] = useState("");

  const emergencyContacts = [
    {
      name: "Police Emergency",
      number: "100",
      icon: "🚔",
      description: "For immediate police assistance",
    },
    {
      name: "Fire Brigade",
      number: "101",
      icon: "🚒",
      description: "Fire emergencies and rescue",
    },
    {
      name: "Ambulance",
      number: "102",
      icon: "🚑",
      description: "Medical emergencies",
    },
    {
      name: "Disaster Management",
      number: "108",
      icon: "🆘",
      description: "Natural disasters and emergencies",
    },
    {
      name: "Women Helpline",
      number: "1091",
      icon: "👩",
      description: "Women safety and assistance",
    },
    {
      name: "Child Helpline",
      number: "1098",
      icon: "👶",
      description: "Child protection services",
    },
    {
      name: "Senior Citizen Helpline",
      number: "14567",
      icon: "👴",
      description: "Elder care assistance",
    },
    {
      name: "Tourist Helpline",
      number: "1363",
      icon: "🧳",
      description: "Tourist assistance and guidance",
    },
  ];

  const policeStations = [
    {
      name: "Central Police Station",
      address: "MG Road, Central Delhi",
      phone: "011-23456789",
      officer: "Inspector Sharma",
      distance: "2.3 km",
      coordinates: { lat: 28.6139, lng: 77.209 },
    },
    {
      name: "North Delhi Police Station",
      address: "GT Road, North Delhi",
      phone: "011-23456790",
      officer: "Inspector Kumar",
      distance: "4.1 km",
      coordinates: { lat: 28.6448, lng: 77.2167 },
    },
    {
      name: "South Delhi Police Station",
      address: "Ring Road, South Delhi",
      phone: "011-23456791",
      officer: "Inspector Patel",
      distance: "5.8 km",
      coordinates: { lat: 28.5355, lng: 77.249 },
    },
  ];

  const hospitals = [
    {
      name: "City General Hospital",
      address: "Hospital Road, Central City",
      phone: "011-24567890",
      type: "Government",
      speciality: "Emergency Care",
      distance: "1.8 km",
      available24x7: true,
    },
    {
      name: "Metro Medical Center",
      address: "Metro Plaza, Business District",
      phone: "011-24567891",
      type: "Private",
      speciality: "Multi-specialty",
      distance: "3.2 km",
      available24x7: true,
    },
    {
      name: "Children Hospital",
      address: "Kids Care Avenue",
      phone: "011-24567892",
      type: "Specialized",
      speciality: "Pediatrics",
      distance: "4.5 km",
      available24x7: false,
    },
  ];

  const fireStations = [
    {
      name: "Central Fire Station",
      address: "Fire Brigade Road",
      phone: "011-25678901",
      chief: "Fire Officer Singh",
      distance: "2.1 km",
      equipment: ["Fire Engines", "Rescue Vehicles", "Ambulance"],
    },
    {
      name: "Industrial Fire Station",
      address: "Industrial Area, Sector 10",
      phone: "011-25678902",
      chief: "Fire Officer Gupta",
      distance: "6.3 km",
      equipment: ["Chemical Fire Units", "Heavy Rescue"],
    },
  ];

  const govOffices = [
    {
      name: "District Collector Office",
      address: "Civil Lines, Government Complex",
      phone: "011-26789012",
      officer: "District Collector",
      services: ["Revenue", "Land Records", "Certificates"],
      timings: "10:00 AM - 5:00 PM",
    },
    {
      name: "Municipal Corporation",
      address: "Town Hall, City Center",
      phone: "011-26789013",
      officer: "Municipal Commissioner",
      services: ["Birth/Death Certificates", "Property Tax", "Licenses"],
      timings: "9:00 AM - 6:00 PM",
    },
    {
      name: "Sub-Divisional Magistrate",
      address: "Court Complex",
      phone: "011-26789014",
      officer: "SDM",
      services: ["Legal Documentation", "Marriage Registration"],
      timings: "10:00 AM - 4:00 PM",
    },
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`, "_self");
  };

  const handleDirections = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  const categories = [
    { id: "emergency", name: "Emergency", icon: "🚨" },
    { id: "police", name: "Police Stations", icon: "🚔" },
    { id: "hospitals", name: "Hospitals", icon: "🏥" },
    { id: "fire", name: "Fire Stations", icon: "🚒" },
    { id: "government", name: "Gov Offices", icon: "🏛️" },
  ];

  const renderEmergencyContacts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {emergencyContacts.map((contact, index) => (
        <Card key={index}>
          <div className="text-center">
            <div className="text-3xl mb-3">{contact.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{contact.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{contact.description}</p>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => handleCall(contact.number)}
                variant="danger"
                className="w-full"
              >
                Call {contact.number}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPoliceStations = () => (
    <div className="space-y-4">
      {policeStations.map((station, index) => (
        <Card key={index}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                {station.name}
              </h3>
              <p className="text-gray-600 mb-1">📍 {station.address}</p>
              <p className="text-gray-600 mb-1">
                👮 Officer in Charge: {station.officer}
              </p>
              <p className="text-sm text-blue-600 mb-3">
                📍 {station.distance} away
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button
                onClick={() => handleCall(station.phone)}
                size="sm"
                className="whitespace-nowrap"
              >
                Call
              </Button>
              <Button
                onClick={() => handleDirections(station.address)}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                Directions
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderHospitals = () => (
    <div className="space-y-4">
      {hospitals.map((hospital, index) => (
        <Card key={index}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                {hospital.available24x7 && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    24×7
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-1">📍 {hospital.address}</p>
              <p className="text-gray-600 mb-1">🏥 Type: {hospital.type}</p>
              <p className="text-gray-600 mb-1">
                ⚕️ Speciality: {hospital.speciality}
              </p>
              <p className="text-sm text-blue-600 mb-3">
                📍 {hospital.distance} away
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button
                onClick={() => handleCall(hospital.phone)}
                size="sm"
                variant="success"
                className="whitespace-nowrap"
              >
                Call
              </Button>
              <Button
                onClick={() => handleDirections(hospital.address)}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                Directions
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderFireStations = () => (
    <div className="space-y-4">
      {fireStations.map((station, index) => (
        <Card key={index}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                {station.name}
              </h3>
              <p className="text-gray-600 mb-1">📍 {station.address}</p>
              <p className="text-gray-600 mb-1">👨‍🚒 Chief: {station.chief}</p>
              <p className="text-gray-600 mb-1">
                🚒 Equipment: {station.equipment.join(", ")}
              </p>
              <p className="text-sm text-blue-600 mb-3">
                📍 {station.distance} away
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button
                onClick={() => handleCall(station.phone)}
                size="sm"
                variant="danger"
                className="whitespace-nowrap"
              >
                Call
              </Button>
              <Button
                onClick={() => handleDirections(station.address)}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                Directions
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderGovernmentOffices = () => (
    <div className="space-y-4">
      {govOffices.map((office, index) => (
        <Card key={index}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                {office.name}
              </h3>
              <p className="text-gray-600 mb-1">📍 {office.address}</p>
              <p className="text-gray-600 mb-1">👤 {office.officer}</p>
              <p className="text-gray-600 mb-1">
                📋 Services: {office.services.join(", ")}
              </p>
              <p className="text-gray-600 mb-3">🕐 Timings: {office.timings}</p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button
                onClick={() => handleCall(office.phone)}
                size="sm"
                className="whitespace-nowrap"
              >
                Call
              </Button>
              <Button
                onClick={() => handleDirections(office.address)}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                Directions
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case "emergency":
        return renderEmergencyContacts();
      case "police":
        return renderPoliceStations();
      case "hospitals":
        return renderHospitals();
      case "fire":
        return renderFireStations();
      case "government":
        return renderGovernmentOffices();
      default:
        return renderEmergencyContacts();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Support & Emergency Contacts
        </h1>
        <p className="text-gray-600">
          Find nearby emergency services and government offices
        </p>
      </div>

      {/* Interactive Map */}
      <Card title="Location Map">
        <MapPlaceholder height="300px">
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Search location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </MapPlaceholder>
      </Card>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{renderContent()}</div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleCall("100")}
            variant="danger"
            className="flex items-center justify-center"
          >
            <span className="mr-2">🚔</span>
            Emergency Police (100)
          </Button>
          <Button
            onClick={() => handleCall("101")}
            variant="danger"
            className="flex items-center justify-center"
          >
            <span className="mr-2">🚒</span>
            Fire Emergency (101)
          </Button>
          <Button
            onClick={() => handleCall("102")}
            variant="success"
            className="flex items-center justify-center"
          >
            <span className="mr-2">🚑</span>
            Medical Emergency (102)
          </Button>
        </div>
      </Card>

      {/* Important Information */}
      <Card title="Important Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Emergency Guidelines
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Stay calm and provide clear information</li>
              <li>• Know your exact location address</li>
              <li>• Keep important documents handy</li>
              <li>• Don't hang up until told to do so</li>
              <li>• Follow operator instructions carefully</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">What to Share</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your name and contact number</li>
              <li>• Exact location with landmarks</li>
              <li>• Nature of emergency</li>
              <li>• Number of people involved</li>
              <li>• Any immediate medical needs</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupportContacts;
