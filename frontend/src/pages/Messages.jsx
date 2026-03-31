import { useState } from "react";
import Topbar from "../components/Topbar";
import { mockMessages } from "../data/mockData";
import "./Messages.css";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(mockMessages[0]?.id);
  const [messageInput, setMessageInput] = useState("");

  const activeConvo = mockMessages.find(m => m.id === activeChat);

  return (
    <>
      <Topbar title="Messages" subtitle="Chat with other students" />
      <div className="messages-layout">
        <div className="conversations-list">
          {mockMessages.map(msg => (
            <div
              key={msg.id}
              className={`convo-item ${activeChat === msg.id ? "active" : ""}`}
              onClick={() => setActiveChat(msg.id)}
            >
              <div className="convo-avatar">{msg.avatar}</div>
              <div className="convo-info">
                <div className="convo-name">
                  {msg.name}
                  {msg.unread && <span className="unread-dot" />}
                </div>
                <div className="convo-preview">{msg.lastMessage}</div>
              </div>
              <div className="convo-time">{msg.time}</div>
            </div>
          ))}
        </div>

        <div className="chat-area">
          {activeConvo ? (
            <>
              <div className="chat-header">
                <div className="convo-avatar">{activeConvo.avatar}</div>
                <span className="chat-header-name">{activeConvo.name}</span>
              </div>
              <div className="chat-messages">
                <div className="chat-bubble received">
                  <p>{activeConvo.lastMessage}</p>
                  <span className="chat-time">{activeConvo.time}</span>
                </div>
              </div>
              <div className="chat-input-area">
                <input
                  className="input chat-input"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && messageInput.trim()) {
                      setMessageInput("");
                    }
                  }}
                />
                <button className="btn btn-accent">Send</button>
              </div>
            </>
          ) : (
            <div className="chat-empty">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
