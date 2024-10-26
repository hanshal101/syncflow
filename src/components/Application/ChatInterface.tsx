import { useState } from "react";
import axios from "axios";

function ChatInterface() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user message
      const userMessage = { text: inputValue, sender: "User" };
      setMessages((prev) => [...prev, userMessage]);
      // const context="You are a software development company and your name is ros, you manage the productivity of the team with managers and employees with syncflow application. Generate response only with respect to this context or else say I can't respond beyond my limits"

      // Clear the input
      setInputValue("");

      try {
        // Send message to Ollama
        const response = await axios.post("http://localhost:11434/api/generate", {
          prompt: inputValue,
          model: "syncflow:v1",
          stream: false,
        });
        console.log(response);

        // Get the AI response
        const aiResponse = { text: response.data.response, sender: "AI" };
        setMessages((prev) => [...prev, aiResponse]);
      } catch (error) {
        console.error("Error communicating with Ollama:", error);
        const errorMessage = { text: "Error communicating with AI.", sender: "AI" };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  return (
    <div className="chat-container p-4 border border-gray-300 rounded-lg h-full shadow-lg w-md mx-auto">
      <div className="chat-history flex h-4/5 flex-col overflow-y-auto border border-gray-200 p-2 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message flex ${msg.sender === "User" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`p-2 rounded-lg ${msg.sender === "User" ? "bg-blue-500 text-white" : "bg-white"}`}
            >
              <span className="font-bold">{msg.sender}:</span> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border  p-2 rounded-lg"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
