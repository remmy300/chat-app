import { auth } from "../Firebase/firebase";
import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatMessage = ({ message }) => {
  const [user] = useAuthState(auth);
  if (!message?.text) return null;

  const { text, uid, photoURL, createdAt } = message;
  const isSent = uid === user?.uid;

  console.log("PhotoURL:", photoURL);
  console.log("Current User:", user);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${
    user?.displayName || user?.email || "User"
  }&size=40`;

  const displayPhotoURL =
    message?.photoURL?.trim() !== "" ? message.photoURL : fallbackAvatar;

  let formattedTime = "";
  try {
    if (createdAt?.toDate) {
      formattedTime = createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  } catch (error) {
    console.warn("Timestamp error:", error);
  }

  return (
    <div
      className={`flex my-2 z-0 ${isSent ? "justify-end" : "justify-start"}`}
    >
      <img
        src={displayPhotoURL}
        alt="User"
        onError={(e) => {
          if (e.target.src !== fallbackAvatar) {
            e.target.onerror = null;
            e.target.src = fallbackAvatar;
          }
        }}
        className="w-8 h-8 rounded-full mr-2 overflow-hidden"
      />

      <div
        className={`max-w-xs lg:max-w-md px-4 py-1 rounded-lg relative ${
          isSent ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p className="break-words">{text}</p>
        {formattedTime && (
          <p
            className={`text-[10px] mt-1 text-right opacity-70 ${
              isSent ? "text-white" : "text-gray-600"
            }`}
          >
            {formattedTime}
          </p>
        )}
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
};

export default ChatMessage;
