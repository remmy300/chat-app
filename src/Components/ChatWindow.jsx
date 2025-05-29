import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { auth } from "../Firebase/firebase";
import ChatInput from "./ChatInput";
const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  const messagesEndRef = useRef(null);
  const unsubscribeRef = useRef(null);

  // Connection management
  const setupListener = () => {
    setConnectionStatus("connecting");

    const q = query(collection(db, "messages"), orderBy("createdAt"));

    unsubscribeRef.current = onSnapshot(
      q,
      (snapshot) => {
        const msgArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgArray);
        setConnectionStatus("connected");
        scrollToBottom();
      },
      (error) => {
        console.error("Firestore error:", error);
        setConnectionStatus("disconnected");
      }
    );
  };

  useEffect(() => {
    setupListener();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // ✅ Scroll after messages change

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      {/* Messages */}
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      <div ref={messagesEndRef} />

      {/* Only show input when authenticated */}
      {auth.currentUser && (
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <ChatInput />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
