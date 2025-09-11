import { Link } from "react-router-dom";
import CivicLogo from "./CivicLogo";
import BangladeshFlag from "./BangladeshFlag";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "GD Filing", href: "/gd-filing" },
      { name: "Case Tracking", href: "/case-tracking" },
      { name: "Fine Payment", href: "/fine-payment" },
      { name: "Legal Aid", href: "/chatbot" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Contact Us", href: "/support" },
      { name: "FAQ", href: "/support" },
      { name: "Live Chat", href: "/chatbot" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Data Protection", href: "#" },
      { name: "Accessibility", href: "#" },
    ],
    government: [
      { name: "Government Portal", href: "https://bangladesh.gov.bd" },
      { name: "National Portal", href: "https://portal.gov.bd" },
      { name: "Digital Bangladesh", href: "https://digitalbangladesh.gov.bd" },
      { name: "Prime Minister's Office", href: "https://pmo.gov.bd" },
    ],
  };

  const emergencyContacts = [
    { name: "Police", number: "999", icon: "🚓" },
    { name: "Fire Service", number: "999", icon: "🚒" },
    { name: "Ambulance", number: "999", icon: "🚑" },
    { name: "Women Helpline", number: "109", icon: "👩" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "YouTube", href: "#", icon: "📺" },
    { name: "LinkedIn", href: "#", icon: "💼" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        {/* Top Section - Logo and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <CivicLogo className="h-10 w-10" textColor="text-blue-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold">Civic Portal</h3>
                  <BangladeshFlag className="h-4 w-6" />
                </div>
                <p className="text-sm text-gray-300">
                  Government of Bangladesh
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your one-stop digital platform for civic services, legal aid, and
              government support. Empowering citizens with easy access to
              essential services.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">
              Government
            </h4>
            <ul className="space-y-2">
              {footerLinks.government.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h4 className="text-lg font-semibold mb-4 text-red-400">
            Emergency Contacts
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="bg-red-600 hover:bg-red-700 rounded-lg p-3 text-center transition-colors duration-200 group"
              >
                <div className="text-2xl mb-1">{contact.icon}</div>
                <div className="text-sm font-medium">{contact.name}</div>
                <div className="text-lg font-bold group-hover:scale-110 transition-transform duration-200">
                  {contact.number}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Legal and Info Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-400">
                Legal
              </h4>
              <div className="flex flex-wrap gap-4">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-right">
              <h4 className="text-sm font-semibold mb-3 text-gray-400">
                Contact
              </h4>
              <div className="text-xs text-gray-400 space-y-1">
                <p>📧 support@civicportal.gov.bd</p>
                <p>📞 +880-2-9999999</p>
                <p>📍 Secretariat, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="mx-auto px-3 sm:px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
            <div className="mb-2 sm:mb-0">
              <p>
                © {currentYear} Government of Bangladesh. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span>🇧🇩 Made in Bangladesh</span>
              <span>•</span>
              <span>Powered by Digital Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
