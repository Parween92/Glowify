import { useState, useRef, useEffect } from "react";
import { FaRobot, FaSpinner } from "react-icons/fa";
import { IoSend, IoClose } from "react-icons/io5";
import axios from "axios";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hallo! 👋 Ich bin dein Glowify Shop Assistent. Wie kann ich dir heute helfen?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      from: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.from === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await axios.post("http://localhost:8000/chat", {
        message: input,
        conversationHistory: conversationHistory,
      });

      if (response.data.success) {
        const botMessage = {
          from: "bot",
          text: response.data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(response.data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        from: "bot",
        text: "Entschuldigung, es gab ein Problem. Bitte versuche es später noch einmal oder kontaktiere unseren Support direkt.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearChat = () => {
    setMessages([
      {
        from: "bot",
        text: "Chat wurde geleert. Wie kann ich dir helfen?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/*  Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 b text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
        style={{
          background: "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 90%)",
          hover:"linear-gradient(50deg, #E8B09E 25%, #D59C8C 85%, #326287 90%)",
          transition: "background 0.5s ease-in-out"
        }}>
        <FaRobot size={24} />
      </button>

 
      {open && (
        <div className="fixed bottom-20 right-6 bg-white shadow-2xl w-80 max-h-[600px] rounded-xl overflow-hidden flex flex-col z-50 border border-gray-200">
     
          <div className="bg-gradient-to-r from-[#326287] to-[#264a66] text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaRobot size={20} />
              <span className="font-semibold">Glowify Assistant</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200 text-xs px-2 py-1 rounded"
                title="Chat leeren"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <IoClose size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <div>{msg.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      msg.from === "user" ? "text-purple-100" : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 max-w-[85%] p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FaSpinner className="animate-spin" />
                    <span>Assistent tippt...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-200 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Schreib deine Frage..."
              className="flex-1 px-4 py-3 outline-none text-sm border-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-[#326287] to-[#264a66] text-white px-4 hover:from-[#264a66] hover:to-[#326287] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <IoSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;