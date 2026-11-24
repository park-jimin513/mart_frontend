"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

const suggestedQuestions = [
  "Where is my order?",
  "Delivery and service area",
  "Medicine or prescription",
  "Talk to support"
];

function getSupportReply(question) {
  const normalizedQuestion = question.toLowerCase();

  if (/order|track|status/.test(normalizedQuestion)) {
    return {
      text: "You can check the latest updates for your order on the tracking page.",
      href: "/tracking",
      linkLabel: "Track an order"
    };
  }

  if (/medicine|pharmacy|prescription|rx/.test(normalizedQuestion)) {
    return {
      text: "For medicine orders and prescription uploads, visit our Pharmacy page.",
      href: "/pharmacy",
      linkLabel: "Open Pharmacy"
    };
  }

  if (/delivery|area|shipping|arrive|time/.test(normalizedQuestion)) {
    return {
      text: "VillageKart delivers within a 20 km service radius. For help with your village or delivery, contact our support team.",
      href: "/contact",
      linkLabel: "Contact support"
    };
  }

  return {
    text: "I don't have an instant answer for that yet. Send your question to our support team and they can help.",
    href: "/contact",
    linkLabel: "Contact VillageKart"
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I can help with orders, delivery, and prescriptions. What would you like to know?"
    }
  ]);
  const messagesRef = useRef(null);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendQuestion = (value) => {
    const trimmedQuestion = value.trim();
    if (!trimmedQuestion) return;

    const reply = getSupportReply(trimmedQuestion);
    const userMessage = {
      id: nextMessageId.current++,
      role: "user",
      text: trimmedQuestion
    };
    const assistantMessage = {
      id: nextMessageId.current++,
      role: "assistant",
      ...reply
    };
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage
    ]);
    setQuestion("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendQuestion(question);
  };

  return (
    <div className="support-chat-widget">
      {isOpen && (
        <section
          id="support-chat-panel"
          className="support-chat-panel"
          aria-label="VillageKart support chat"
        >
          <div className="support-chat-header">
            <div className="support-chat-brand">
              <span className="support-chat-avatar"><MessageCircle size={19} /></span>
              <div>
                <h2>VillageKart Support</h2>
                <span>Quick answers for your questions</span>
              </div>
            </div>
            <button
              type="button"
              className="support-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={19} />
            </button>
          </div>

          <div className="support-chat-messages" ref={messagesRef} role="log" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`support-chat-message ${message.role}`}>
                {message.role === "assistant" && (
                  <span className="support-chat-sparkle"><Sparkles size={13} /></span>
                )}
                <div className="support-chat-bubble">
                  <p>{message.text}</p>
                  {message.href && (
                    <Link
                      href={message.href}
                      className="support-chat-action"
                      onClick={() => setIsOpen(false)}
                    >
                      {message.linkLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="support-chat-suggestions" aria-label="Suggested questions">
              {suggestedQuestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => sendQuestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form className="support-chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Type your question..."
              aria-label="Type your question"
              maxLength={300}
            />
            <button type="submit" disabled={!question.trim()} aria-label="Send question">
              <Send size={17} />
            </button>
          </form>
          <p className="support-chat-note">
            Automated quick help. For personal assistance, contact our support team.
          </p>
        </section>
      )}

      <button
        type="button"
        className="support-chat-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close support chat" : "Chat with us"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "support-chat-panel" : undefined}
      >
        {isOpen ? <X size={21} /> : <MessageCircle size={22} />}
        {!isOpen && <span>Chat with us</span>}
      </button>
    </div>
  );
}
