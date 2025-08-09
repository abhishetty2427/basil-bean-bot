import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your Basil & Beans host. How many of you today, and what are you in the mood for (spicy/veg/healthy/dessert)?",
    },
  ]);
  const [input, setInput] = useState("");

  async function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages([...messages, { role: "user", content: trimmed }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: trimmed }),
      });
      const data = await res.json();
      const reply = data.reply || "Hmm, I didn’t catch that—try again?";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setInput("");
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <header className="mb-3">
          <h1 className="text-2xl font-bold">Basil &amp; Beans</h1>
          <p className="text-sm text-neutral-600">Your table host</p>
        </header>

        <div className="bg-white rounded-2xl shadow p-4 h-[70vh] overflow-y-auto mb-3 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "assistant" ? "text-neutral-900" : "text-right"}
            >
              <div
                className={`inline-block px-3 py-2 rounded-2xl ${
                  m.role === "assistant" ? "bg-neutral-100" : "bg-indigo-100"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <textarea
            className="flex-1 border rounded-xl px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="e.g., 3 of us, veg, medium spicy, want dessert"
            rows={2}
          />
          <button
            onClick={send}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
