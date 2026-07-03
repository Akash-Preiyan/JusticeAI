import axios from "axios";
import { ChevronRight, ChevronUp, X, PlusIcon, Scale, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
// import { jwtDecode } from 'jwt-decode'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const API_BASE = "https://justiceai-backend.onrender.com";

// ─── Typing indicator ────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-[#c4965a] animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

// ─── Message bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#c4965a] flex items-center justify-center mr-2 mt-1 shrink-0">
          <Scale size={14} className="text-[#2b1408]" />
        </div>
      )}
      <div
        className={`prose prose-sm max-w-none  px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
          isUser
            ? "bg-[#2b1408] text-[#f5efe6] rounded-tr-sm"
            : "bg-white text-[#1a0e06] rounded-tl-sm border border-[#e8ddd2]"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const LegalResearch = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const token = sessionStorage.getItem("token");

  // ── Auth header helper ────────────────────────────────────────────────────
  const authHeader = useCallback(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  );

  // ── Scroll to bottom on new messages ──────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ── Fetch all chats on mount ──────────────────────────────────────────────
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/api/chats/get_chats`,
          authHeader()
        );
        setChats(data);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };
    if (token) fetchChats();
  }, [token, authHeader]);

  // ── New chat ──────────────────────────────────────────────────────────────
  const handleNewChat = () => {
    setSelectedChat(null);
    setMessages([]);
    setChatStarted(false);
    setInput("");
    setError("");
    setSidebarOpen(false); // close sidebar on mobile when starting new chat
    textareaRef.current?.focus();
  };

  // ── Load existing chat ────────────────────────────────────────────────────
  const loadChat = async (chat) => {
    if (selectedChat?._id === chat._id) return; // already loaded
    try {
      setIsFetchingMessages(true);
      setSelectedChat(chat);
      setChatStarted(true);
      setSidebarOpen(false);
      const { data } = await axios.get(
        `${API_BASE}/messages/get_messages/${chat._id}`,
        authHeader()
      );
      setMessages(data);
    } catch (err) {
      console.error("Failed to load chat:", err);
      setError("Failed to load conversation. Please try again.");
    } finally {
      setIsFetchingMessages(false);
    }
  };

  // ── Delete chat ───────────────────────────────────────────────────────────
  const deleteChat = async (e, chatId) => {
    e.stopPropagation();
    try {
      const {data} = await axios.delete(`${API_BASE}/chats/deleteChat/${chatId}`, authHeader());
      setChats((prev) => prev.filter((c) => c._id !== chatId));
      if (selectedChat?._id === chatId) {
        handleNewChat();
      }
      console.log(data.message)
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

  //hande Send
  const handleSend = async () => {
    const prompt = input
    if(!prompt.trim()){
      setError("Please enter a message.");
      return;
    }
    if (isLoading) return;

    setChatStarted(true);
    setError("");
    setIsLoading(true);
    setInput("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try{
      const userMessage = {
        role: "user",
        content: prompt
      }
      const updatedMessage = [...messages, userMessage];

      setMessages(updatedMessage);
      let currentChat = selectedChat
      if(selectedChat === null){
        const {data} = await axios.post(
          `${API_BASE}/chats/get_title`,
          {
            message : prompt
          },
          authHeader()
        )

        console.log(data.title);
        currentChat = data
        setSelectedChat(data);
        setChats(prev => [data, ...prev])
      }

      const {data} = await axios.post(
        `${API_BASE}/chats/send_chat`, 
        {
          chatId: currentChat._id,
          messages: updatedMessage
        },
        authHeader()
      )

      const GeneratedMsg = data.aiMessage
      console.log(GeneratedMsg)

      setMessages((prev) => [...prev, GeneratedMsg]);

      
      
    } catch(error){
      console.log(error)
    } finally{
      setIsLoading(false)
    }

  }

  // ── Textarea auto-resize ──────────────────────────────────────────────────
  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    if (error) setError("");
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#f5efe6] font-sans">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      {/* Backdrop on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative z-30 flex flex-col h-full bg-[#1e0d04] text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Scale size={18} className="text-[#c4965a]" />
            <h2 className="font-semibold tracking-wide text-sm text-[#f5efe6]">
              Legal Research
            </h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* New Chat */}
        <div className="px-3 py-3 shrink-0">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-[#c4965a] hover:bg-[#b8864a] text-[#1e0d04] font-semibold text-sm rounded-xl px-4 py-2.5 transition-colors"
          >
            <PlusIcon size={16} />
            New Chat
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          <p className="text-[10px] uppercase tracking-widest text-white/40 px-2 py-2 font-medium">
            Recent
          </p>
          {chats.length === 0 && (
            <p className="text-white/30 text-xs px-2 py-2">No conversations yet.</p>
          )}
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => loadChat(chat)}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 text-sm ${
                selectedChat?._id === chat._id
                  ? "bg-[#c4965a]/20 text-[#c4965a]"
                  : "hover:bg-white/8 text-white/70 hover:text-white"
              }`}
            >
              <p className="truncate flex-1 text-xs leading-snug">{chat.title}</p>
              <button
                onClick={(e) => deleteChat(e, chat._id)}
                className="opacity-0 group-hover:opacity-100 ml-2 p-1 hover:text-red-400 transition-all shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-[#e8ddd2] bg-[#f5efe6]/80 backdrop-blur-sm shrink-0">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-[#e8ddd2] transition-colors text-[#2b1408]"
            >
              <ChevronRight size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <Scale size={16} className="text-[#c4965a]" />
            <span className="text-sm font-semibold text-[#2b1408] tracking-wide">
              {selectedChat ? selectedChat.title : "Legal Research AI"}
            </span>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Empty state */}
            {!chatStarted && (
              <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#2b1408] flex items-center justify-center shadow-lg">
                  <Scale size={26} className="text-[#c4965a]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#2b1408] tracking-tight">
                    Legal Research AI
                  </h1>
                  <p className="text-[#8b6347] text-sm mt-1 max-w-sm">
                    Ask about case law, statutes, contracts, legal definitions,
                    and more.
                  </p>
                </div>
                {/* <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-md">
                  {[
                    "What is habeas corpus?",
                    "Explain force majeure clauses",
                    "Difference between tort and contract",
                    "What is mens rea?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); textareaRef.current?.focus(); }}
                      className="text-left text-xs bg-white border border-[#e8ddd2] hover:border-[#c4965a] hover:bg-[#fdf8f3] text-[#2b1408] px-3 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div> */}
              </div>
            )}

            {/* Loading skeleton when fetching old chat */}
            {isFetchingMessages && (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    <div className={`h-10 rounded-2xl bg-[#e8ddd2] ${i % 2 === 0 ? "w-48" : "w-64"}`} />
                  </div>
                ))}
              </div>
            )}

            {/* Message list */}
            {!isFetchingMessages && (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <MessageBubble key={message._id ?? index} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full bg-[#c4965a] flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Scale size={14} className="text-[#2b1408]" />
                    </div>
                    <div className="bg-white border border-[#e8ddd2] rounded-2xl rounded-tl-sm shadow-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </main>

        {/* Input bar */}
        <footer className="px-4 pb-5 pt-3 bg-[#f5efe6] shrink-0">
          <div className="max-w-2xl mx-auto">
            {error && (
              <p className="text-red-500 text-xs mb-2 text-center">{error}</p>
            )}
            <div
              className={`bg-white border-2 rounded-2xl px-4 py-3 flex items-end gap-3 shadow-sm transition-colors ${
                isLoading ? "border-[#e8ddd2]" : "border-[#e8ddd2] focus-within:border-[#c4965a]"
              }`}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "Awaiting response…" : "Ask any legal question…"}
                disabled={isLoading}
                className="flex-1 bg-transparent outline-none resize-none text-sm text-[#1a0e06] placeholder-[#b0967e] max-h-32 overflow-y-auto leading-relaxed disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`rounded-xl w-9 h-9 flex items-center justify-center shrink-0 transition-all ${
                  isLoading || !input.trim()
                    ? "bg-[#e8ddd2] text-[#b0967e] cursor-not-allowed"
                    : "bg-[#2b1408] text-white hover:bg-[#c4965a]"
                }`}
              >
                <ChevronUp size={18} />
              </button>
            </div>
            <p className="text-[10px] text-[#b0967e] text-center mt-2">
              Legal Research AI · For informational purposes only
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LegalResearch;