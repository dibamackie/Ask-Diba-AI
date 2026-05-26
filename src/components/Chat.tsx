'use client';

import { useChat, type UIMessage } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.css';

const SUGGESTED_PROMPTS = [
  "What kind of developer is Diba?",
  "Tell me about her work at The Fly Bottle",
  "Which projects best show her skills?",
  "How can I contact or view her work?"
];

export default function Chat() {
  const [input, setInput] = useState('');
  
  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: '1',
        role: 'assistant',
        parts: [{ type: 'text', text: "Hi, I'm an interactive assistant for Diba Makki. Feel free to ask anything about her experience, projects, or fit for your team." }]
      }
    ] as UIMessage[]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map(m => (
          <div key={m.id} className={`${styles.messageWrapper} ${m.role === 'user' ? styles.messageWrapperUser : styles.messageWrapperAssistant}`}>
            <div className={`${styles.message} ${m.role === 'user' ? styles.messageUser : styles.messageAssistant}`}>
              {m.parts.map((part, index) => (
                part.type === 'text' ? <span key={index}>{part.text}</span> : null
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className={styles.suggestedPromptsContainer}>
          {SUGGESTED_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedPrompt(prompt)}
              className={styles.suggestedPromptButton}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          className={styles.inputField}
          value={input}
          placeholder="Ask a question about Diba..."
          onChange={handleInputChange}
          autoFocus
          disabled={status !== 'ready'}
        />
        <button type="submit" disabled={!input?.trim() || status !== 'ready'} className={styles.sendButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}
