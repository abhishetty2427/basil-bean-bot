import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to Basil & Beans! 🌿☕ I'm your AI host and I'm excited to help you discover amazing vegetarian dishes! How many people are dining today, and what sounds good? (healthy options, comfort food, fusion dishes, desserts, or something creative?)",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages([...messages, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: trimmed }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      const reply = data.reply || "I'm having trouble understanding. Could you try rephrasing that?";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm experiencing some technical difficulties. Please try again in a moment, or feel free to ask our staff for assistance!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 px-4 py-4 sm:py-6">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <header className="mb-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <h1 className="text-2xl font-bold text-green-800">🌿 Basil & Beans ☕</h1>
            <p className="text-sm text-green-600">Your AI Table Host</p>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-4 flex-1 overflow-y-auto mb-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                  m.role === "assistant" 
                    ? "bg-green-100 text-green-900 rounded-bl-md" 
                    : "bg-amber-100 text-amber-900 rounded-br-md"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 bg-white rounded-2xl shadow-lg p-3">
          <textarea
            className="flex-1 border-0 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Tell me what you're craving..."
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={send}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">Powered by AI • Basil & Beans</p>
        </div>
      </div>
    </main>
  );
}