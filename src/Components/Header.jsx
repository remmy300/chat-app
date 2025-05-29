import { FaReact } from "react-icons/fa";
import { SiFirebase } from "react-icons/si";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-between p-4 rounded shadow-sm sticky top-0 z-99">
      <div className="flex items-center gap-4">
        <FaReact className="h-7 w-7 text-blue-400" />
        <SiFirebase className="h-7 w-7 text-orange-500" />
      </div>
      <button
        onClick={handleSignOut}
        className="border border-gray-400 text-sm px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
