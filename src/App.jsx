import Dashboard from "./Components/Dashboard";
import Auth from "./Firebase/auth";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="h-screen max-w-4xl mx-auto overflow-auto  shadow-lg">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
