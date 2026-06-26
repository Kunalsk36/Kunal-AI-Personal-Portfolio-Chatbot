"use client";

import { useEffect, useState, useRef } from "react";
import ChatInput from "@/components/ChatInput";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
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

    const assistantMessageId = `${new Date().toISOString()}-assistant`;

    // Add empty message placeholder
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ]);

    try {
      // Build conversation history from existing messages (last 10, excluding the empty placeholder)
      const historyForBackend = messages
        .filter((msg) => msg.content && msg.content.trim().length > 0)
        .slice(-10)
        .map(({ role, content }) => ({ role, content }));

      const response = await chatWithAI(content, historyForBackend);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      
      // Stop loading once we start receiving chunks
      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6).trim();
            if (dataStr === "[DONE]") {
              break;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.error) {
                throw new Error(data.error);
              }
              if (data.text) {
                accumulatedText += data.text;
                setMessages((currentMessages) =>
                  currentMessages.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: accumulatedText }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Ignore parse errors from incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      setMessages((currentMessages) =>
        currentMessages.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: error.message || "Unable to connect to Kunal AI. Please try again." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200"
    >
      <Header />

      <main className={`mx-auto min-h-dvh w-full max-w-[1200px] px-4 pt-20 sm:px-6 ${
        messages.length === 0 ? "pb-22" : "pb-16"
      }`}>
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={sendMessage} />
        ) : (
            <section
            aria-label="Chat messages"
            className="mx-auto flex w-full max-w-4xl flex-col gap-4 py-2"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            <div ref={messagesEndRef} className="h-0" />
          </section>
        )}
      </main>

      <ChatInput value={input} onChange={setInput} onSend={() => sendMessage()} isLoading={isLoading} />
    </div>
  );
}
