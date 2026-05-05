import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import Icon from "../components/Icon";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import {
  subscribeToConversations,
  subscribeToMessages,
  sendMessage,
  getOrCreateConversation,
  fetchAllUsers,
} from "../services/firestoreService";
import "./Messages.css";

export default function Messages() {
  const { user, userProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [activeConvoId, setActiveConvoId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const messagesEndRef = useRef(null);
  const unsubMessagesRef = useRef(null);

  const myName = userProfile?.fullName || "Student";

  // Subscribe to conversations
  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToConversations(user.uid, (convos) => {
      setConversations(convos);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  // Handle deep-link: ?to=uid&toName=Name&itemId=...&itemName=...
  useEffect(() => {
    if (!user || loading) return;
    const toUid = searchParams.get("to");
    const toName = searchParams.get("toName") || "Student";
    const itemId = searchParams.get("itemId");
    const itemName = searchParams.get("itemName");
    const itemImage = searchParams.get("itemImage");

    if (toUid && toUid !== user.uid) {
      (async () => {
        try {
          const itemContext = itemId ? { id: itemId, name: itemName, image: itemImage } : null;
          const convo = await getOrCreateConversation(user.uid, myName, toUid, toName, itemContext);
          setActiveConvoId(convo.id);
        } catch (err) {
          console.error("Error creating conversation:", err);
        }
      })();
    }
  }, [user, loading, searchParams, myName]);

  // Subscribe to messages when active conversation changes
  useEffect(() => {
    if (unsubMessagesRef.current) {
      unsubMessagesRef.current();
      unsubMessagesRef.current = null;
    }

    if (!activeConvoId) {
      setMessages([]);
      return;
    }

    unsubMessagesRef.current = subscribeToMessages(activeConvoId, (msgs) => {
      setMessages(msgs);
    });

    return () => {
      if (unsubMessagesRef.current) {
        unsubMessagesRef.current();
      }
    };
  }, [activeConvoId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!messageInput.trim() || !activeConvoId || sending) return;
    const text = messageInput.trim();
    setMessageInput("");
    setSending(true);

    try {
      await sendMessage(activeConvoId, user.uid, myName, text);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessageInput(text); // restore on failure
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // New conversation
  const handleStartNewChat = async (otherUser) => {
    setShowNewChat(false);
    setUserSearch("");
    try {
      const convo = await getOrCreateConversation(
        user.uid, myName,
        otherUser.uid, otherUser.fullName || "Student",
        null
      );
      setActiveConvoId(convo.id);
    } catch (err) {
      console.error("Error starting new chat:", err);
      alert("Failed to start conversation.");
    }
  };

  const loadUsers = async () => {
    try {
      const users = await fetchAllUsers();
      setAllUsers(users.filter(u => u.uid !== user.uid));
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  const activeConvo = conversations.find(c => c.id === activeConvoId);

  const getOtherParticipant = (convo) => {
    if (!convo?.participants) return { name: "Unknown", avatar: "?" };
    const otherUid = convo.participantIds?.find(id => id !== user.uid);
    return convo.participants[otherUid] || { name: "Unknown", avatar: "?" };
  };

  const formatTime = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatMsgTime = (timestamp) => {
    if (!timestamp?.seconds) return "";
    return new Date(timestamp.seconds * 1000).toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit",
    });
  };

  const filteredUsers = allUsers.filter(u =>
    (u.fullName || "").toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <>
      <Topbar
        title="Messages"
        subtitle="Chat with other students"
        actions={
          <button className="btn btn-accent btn-sm" onClick={() => { setShowNewChat(true); loadUsers(); }}>
            <Icon name="plus" size={13} /> New Chat
          </button>
        }
      />
      <div className="messages-layout">
        {/* Conversations List */}
        <div className="conversations-list">
          {loading ? (
            <div style={{ padding: 24 }}>
              <LoadingSpinner message="Loading chats…" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="chat-empty-sidebar">
              <Icon name="message" size={28} color="var(--color-text-muted)" />
              <p>No conversations yet</p>
              <p className="chat-empty-hint">Click "New Chat" to start messaging a student</p>
            </div>
          ) : (
            conversations.map(convo => {
              const other = getOtherParticipant(convo);
              return (
                <div
                  key={convo.id}
                  className={`convo-item ${activeConvoId === convo.id ? "active" : ""}`}
                  onClick={() => setActiveConvoId(convo.id)}
                >
                  <div className="convo-avatar">{other.avatar}</div>
                  <div className="convo-info">
                    <div className="convo-name">
                      {other.name}
                      {convo.itemName && <span className="convo-item-tag">{convo.itemName}</span>}
                    </div>
                    <div className="convo-preview">{convo.lastMessage || "Start chatting…"}</div>
                  </div>
                  <div className="convo-time">{formatTime(convo.lastMessageAt)}</div>
                </div>
              );
            })
          )}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {activeConvo ? (
            <>
              <div className="chat-header">
                <div className="convo-avatar">{getOtherParticipant(activeConvo).avatar}</div>
                <div>
                  <span className="chat-header-name">{getOtherParticipant(activeConvo).name}</span>
                  {activeConvo.itemName && (
                    <span className="chat-header-item">Re: {activeConvo.itemName}</span>
                  )}
                </div>
              </div>
              <div className="chat-messages">
                {messages.length === 0 && (
                  <div className="chat-start-prompt">
                    <Icon name="message" size={24} color="var(--color-text-muted)" />
                    <p>No messages yet. Say hello!</p>
                  </div>
                )}
                {messages.map((msg, idx) => {
                  const isMine = msg.senderId === user.uid;
                  const showName = idx === 0 || messages[idx - 1]?.senderId !== msg.senderId;
                  return (
                    <div key={msg.id} className={`chat-bubble-wrap ${isMine ? "sent" : "received"}`}>
                      {showName && (
                        <span className={`chat-sender-name ${isMine ? "sent" : "received"}`}>
                          {isMine ? "You" : (msg.senderName || "Student")}
                        </span>
                      )}
                      <div className={`chat-bubble ${isMine ? "sent" : "received"}`}>
                        <p>{msg.text}</p>
                        <span className="chat-time">{formatMsgTime(msg.createdAt)}</span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className="chat-input-area">
                <input
                  className="input chat-input"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={sending}
                />
                <button
                  className="btn btn-accent"
                  onClick={handleSend}
                  disabled={!messageInput.trim() || sending}
                >
                  <Icon name="send" size={15} />
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="chat-empty">
              <Icon name="message" size={36} color="var(--color-text-muted)" />
              <p>Select a conversation or start a new chat</p>
            </div>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="modal-overlay" onClick={() => setShowNewChat(false)}>
          <div className="modal-content card animate-scale-in" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
            <div className="modal-header">
              <h3>New Conversation</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowNewChat(false)}>
                <Icon name="x" size={16} />
              </button>
            </div>
            <div style={{ padding: "16px 24px" }}>
              <input
                className="input"
                placeholder="Search students by name or email..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="new-chat-user-list">
              {filteredUsers.length === 0 ? (
                <div style={{ padding: "24px", textAlign: "center", color: "var(--color-text-muted)", fontSize: 13 }}>
                  {allUsers.length === 0 ? "Loading users…" : "No students found"}
                </div>
              ) : (
                filteredUsers.map(u => (
                  <div
                    key={u.uid}
                    className="new-chat-user-item"
                    onClick={() => handleStartNewChat(u)}
                  >
                    <div className="convo-avatar">{(u.fullName || "?").charAt(0).toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{u.fullName || "Student"}</div>
                      <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                        {u.university || ""} · {u.email || ""}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
