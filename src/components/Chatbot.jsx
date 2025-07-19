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

  return (
    <div>
 
    </div>
  );
};

export default ChatBot;