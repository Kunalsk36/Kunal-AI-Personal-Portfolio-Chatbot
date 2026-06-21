"use client";

import { useEffect, useState, useRef } from "react";
import ChatInput from "@/components/ChatInput";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { getBackendHealth, chatWithAI } from "@/services/api";

export default function ChatContainer() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function checkBackendHealth() {
      try {
        const health = await getBackendHealth();
        console.log("Backend connection status:", health);
      } catch (error) {
        console.log("Backend connection status:", {
          status: "unavailable",
          message: error.message,
        });
      }
    }

    checkBackendHealth();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  async function sendMessage(nextMessage = input) {
    const content = nextMessage.trim();

    if (!content || isLoading) {
      return;
    }

    const timestamp = new Date().toISOString();

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `${timestamp}-user`,
        role: "user",
        content,
      },
    ]);
    
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithAI(content);
      const resTimestamp = new Date().toISOString();
      
      if (response.success) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: `${resTimestamp}-assistant`,
            role: "assistant",
            content: response.answer,
          },
        ]);
      } else {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: `${resTimestamp}-error`,
            role: "assistant",
            content: response.error || "An error occurred.",
          },
        ]);
      }
    } catch (error) {
      const errTimestamp = new Date().toISOString();
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `${errTimestamp}-error`,
          role: "assistant",
          content: "Unable to connect to Kunal AI. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200"
    >
      <Header />

      <main className="mx-auto min-h-dvh w-full max-w-[1200px] px-4 pb-32 pt-20 sm:px-6">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={sendMessage} />
        ) : (
            <section
            aria-label="Chat messages"
            className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-6"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            <div ref={messagesEndRef} className="h-4" />
          </section>
        )}
      </main>

      <ChatInput value={input} onChange={setInput} onSend={() => sendMessage()} isLoading={isLoading} />
    </div>
  );
}
