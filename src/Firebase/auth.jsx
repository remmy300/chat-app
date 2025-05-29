import { useState } from "react";
import { auth, googleProvider } from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const translateError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "That email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email.";
      case "auth/invalid-credential":
      case "auth/wrong-password":
        return "Incorrect email or password.";
      case "auth/weak-password":
        return "Choose a stronger password (≥ 6 characters).";
      default:
        return "Something went wrong. Try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Auth Error:", error);
      setErrorMessage(translateError(error.code));
    } finally {
      setLoading(false);
      setPassword("");
      setEmail("");
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(translateError(error.code));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 p-10 mt-6 rounded shadow-xl w-80"
      >
        <h2 className="text-xl font-bold text-center mb-5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input mt-4"
        />

        {errorMessage && (
          <p className="text-red-600 text-sm mt-3">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 mt-6 rounded"
        >
          {loading ? "Please wait..." : isSignUp ? "Create Account" : "Log In"}
        </button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-blue-500 mt-3"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Need an account? Sign Up"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white py-2 px-6 rounded mt-4"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
