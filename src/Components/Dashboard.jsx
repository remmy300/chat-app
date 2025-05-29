import ChatMessage from "./ChatMessage";
import ChatWindow from "./ChatWindow";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <ChatWindow />
      <ChatMessage />
    </div>
  );
};

export default Dashboard;
