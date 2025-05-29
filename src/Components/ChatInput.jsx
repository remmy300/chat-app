import { useState } from "react";
import { db } from "../Firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../Firebase/firebase";
import { Send } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        uid: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
        createdAt: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={sendMessage} className="flex ">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1  border rounded-l-sm px-4 py-2 focus:outline-none max-w-2xl "
      />

      <button
        type="submit"
        disabled={!message.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-sm disabled:opacity-50"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
};

export default ChatInput;
