import { useState, useRef, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "Hello! I'm your Legal Aid Assistant. I can help you with legal questions, document guidance, and general legal information. How can I assist you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "How to file a GD report?",
    "Legal documentation help",
    "Consumer rights information",
    "Property dispute guidance",
    "Traffic violation laws",
    "Women safety laws",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("gd") ||
      lowerMessage.includes("report") ||
      lowerMessage.includes("file")
    ) {
      return "To file a GD (General Diary) report:\n\n1. Visit our GD Filing page\n2. Fill in your personal details\n3. Provide incident details with date, time, and location\n4. Add witness information if available\n5. Upload supporting documents\n6. Review and submit\n\nYou'll receive a reference number for tracking. The report will be reviewed by the concerned authority within 24-48 hours.";
    }

    if (lowerMessage.includes("consumer") || lowerMessage.includes("rights")) {
      return "Consumer Rights in India:\n\n1. Right to Safety - Protection against hazardous goods\n2. Right to Information - Complete product information\n3. Right to Choose - Access to variety of goods at competitive prices\n4. Right to be Heard - Representation in consumer forums\n5. Right to Redressal - Compensation for defective goods/services\n6. Right to Consumer Education\n\nFor complaints, you can approach District Consumer Forums, State Consumer Commissions, or National Consumer Disputes Redressal Commission.";
    }

    if (lowerMessage.includes("property") || lowerMessage.includes("dispute")) {
      return "Property Dispute Resolution:\n\n1. Document Verification - Ensure all property papers are authentic\n2. Legal Notice - Send notice to the opposing party\n3. Mediation - Try to resolve through mutual agreement\n4. Civil Court - File a suit if mediation fails\n5. Alternative Dispute Resolution - Consider arbitration\n\nRequired Documents:\n- Sale deed, Title documents, Mutation records, Revenue records, Survey settlement records\n\nConsult a property lawyer for specific guidance.";
    }

    if (
      lowerMessage.includes("traffic") ||
      lowerMessage.includes("violation") ||
      lowerMessage.includes("challan")
    ) {
      return "Traffic Violation Laws:\n\n• Over-speeding: ৳1,200-৳2,400\n• No helmet: ৳1,200 + 3 months license suspension\n• Drunk driving: ৳12,000 + 6 months imprisonment\n• No seat belt: ৳1,200\n• Mobile phone use: ৳1,200-৳6,000\n• Wrong side driving: ৳1,200-৳6,000\n\nYou can:\n1. Pay fines online through our Fine Payment page\n2. Contest the challan in traffic court\n3. Apply for driving license reinstatement\n\nAlways carry valid driving license, registration, and insurance papers.";
    }

    if (
      lowerMessage.includes("women") ||
      lowerMessage.includes("safety") ||
      lowerMessage.includes("harassment")
    ) {
      return "Women Safety Laws in India:\n\n1. Protection of Women from Domestic Violence Act, 2005\n2. Sexual Harassment at Workplace Act, 2013\n3. Dowry Prohibition Act, 1961\n4. Indian Penal Code Sections 354, 375, 376, 498A\n\nEmergency Contacts:\n• Women Helpline: 1091\n• Police: 100\n• Ambulance: 108\n\nReporting Options:\n- File FIR at nearest police station\n- Online complaint through cyber crime portal\n- Women's cell in police stations\n- National Commission for Women\n\nSafe to Reach out for help immediately in case of emergency.";
    }

    if (
      lowerMessage.includes("document") ||
      lowerMessage.includes("documentation")
    ) {
      return "Legal Documentation Help:\n\nCommon Documents:\n1. Affidavit - Self-declaration under oath\n2. Power of Attorney - Legal authorization to act\n3. Agreement - Contract between parties\n4. Will - Testament for property distribution\n5. Lease Deed - Property rental agreement\n\nSteps for Documentation:\n1. Draft the document with complete details\n2. Get it reviewed by a legal expert\n3. Notarize on stamp paper of appropriate value\n4. Register if required (property documents)\n5. Keep multiple copies\n\nStamp paper values vary by state and document type. Consult a lawyer for complex documents.";
    }

    return "I understand your query. For specific legal advice, I recommend consulting with a qualified lawyer. However, I can provide general information on:\n\n• Filing complaints and reports\n• Understanding basic legal procedures\n• Document requirements\n• Your legal rights\n• Court procedures\n• Legal aid services\n\nPlease feel free to ask about any specific legal topic, or use the quick reply buttons for common questions.";
  };

  const handleSendMessage = (messageText = null) => {
    const messageToSend = messageText || newMessage.trim();
    if (!messageToSend) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      message: messageToSend,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        message: generateBotResponse(messageToSend),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        message:
          "Hello! I'm your Legal Aid Assistant. I can help you with legal questions, document guidance, and general legal information. How can I assist you today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Professional Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="bg-blue-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              🏛️ Legal Aid Assistant
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              Professional Legal Guidance & Information Portal
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></span>
                Available 24/7
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Government of Bangladesh</span>
              <span className="hidden sm:inline">•</span>
              <span>Free Legal Aid</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Enhanced Chat Interface - Mobile First */}
        <div className="lg:col-span-2 order-1">
          <Card className="shadow-lg sm:shadow-xl border-0 bg-white">
            {/* Professional Chat Header - Mobile Optimized */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2 sm:mr-3 backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg">
                      Legal Aid Assistant
                    </h3>
                    <p className="text-blue-100 text-xs sm:text-sm flex items-center">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1 sm:mr-2 animate-pulse"></span>
                      <span className="hidden sm:inline">
                        Professional Legal Support Online
                      </span>
                      <span className="sm:hidden">Online</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearChat}
                    className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Chat Messages */}
            <div className="h-[28rem] overflow-y-auto py-4 px-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                      </svg>
                    </div>
                    <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm border">
                      <div className="flex space-x-1 items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          Legal Assistant is typing
                        </span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Professional Message Input - Mobile Optimized */}
            <div className="border-t bg-white p-3 sm:p-4 rounded-b-lg">
              <div className="flex space-x-2 sm:space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your legal question here..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    disabled={isTyping}
                  />
                  <svg
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!newMessage.trim() || isTyping}
                  className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Press Enter to send • This is AI-powered legal guidance
              </p>
            </div>
          </Card>
        </div>

        {/* Enhanced Sidebar - Mobile Optimized */}
        <div className="space-y-4 sm:space-y-6 order-0 lg:order-2">
          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="font-bold text-gray-900">Quick Legal Questions</h3>
            </div>
            <div className="space-y-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="w-full text-left px-4 py-3 text-sm bg-white hover:bg-blue-50 border border-blue-100 hover:border-blue-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group"
                  disabled={isTyping}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{reply}</span>
                    <svg
                      className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Professional Legal Resources */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="font-bold text-gray-900">Legal Resources</h3>
            </div>
            <div className="space-y-4 text-sm">
              <div className="bg-white p-3 rounded-lg border border-green-100">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Emergency Legal Help
                </h4>
                <p className="text-gray-600 mt-1">
                  📞 Call 181 for immediate legal aid helpline
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-100">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Free Legal Aid
                </h4>
                <p className="text-gray-600 mt-1">
                  🏛️ Available for economically weaker sections
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-100">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  District Legal Services
                </h4>
                <p className="text-gray-600 mt-1">
                  🏢 Contact your local DLSA office
                </p>
              </div>
            </div>
          </Card>

          {/* Enhanced Disclaimer */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <div className="flex items-center space-x-2 mb-3">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="font-bold text-gray-900">Important Notice</h3>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100">
              <p className="text-xs text-gray-600 leading-relaxed">
                ⚖️ This chatbot provides{" "}
                <strong>general legal information</strong> only and does not
                constitute professional legal advice. For specific legal
                matters, please consult with a qualified lawyer or legal
                professional.
              </p>
              <div className="mt-2 pt-2 border-t border-amber-100">
                <p className="text-xs text-amber-700 font-medium">
                  🇧🇩 Powered by Government of Bangladesh Legal Aid Services
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
