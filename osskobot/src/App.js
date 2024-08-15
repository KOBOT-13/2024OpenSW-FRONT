import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Home from './screens/Home';
import Login from './screens/Login';
import Join from './screens/Join';
import Mypage from './screens/Mypage';
import Bookclick from './screens/BookClick';
import ChatCharChoose from "./screens/ChatCharChoose";
import Chat from "./screens/Chat";
import BookReport from './screens/BookReport';
import ServiceInfo from "./screens/ServiceInfo";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginProtectedRoute from "./components/ProtectedRoute/LoginProtectedRoute";
import { useEffect, useState } from "react";
import cookies from 'js-cookie';
import Find from "./screens/Find";
import Quiz from "./screens/Quiz";
import { ConversationProvider } from "./components/ChatMsg/ConversationContext";

function App() {
  const [isLogin, setIsLogin] = useState(undefined);
  const [reload, setReload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const token = cookies.get('token');
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [reload, token]);

  return (
    <Router>
      <ConversationProvider>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} setSearchQuery={setSearchQuery} setReload={setReload} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/login" element={<LoginProtectedRoute>
          <Login setReload={setReload} />
        </LoginProtectedRoute>} />
        <Route path="/join" element={<Join />} />
        <Route path="/find" element={<Find />} />
        <Route path="/mypage" element={<ProtectedRoute>
          <Mypage />
        </ProtectedRoute>} />
        <Route path="/serviceinfo" element={<ServiceInfo />} />
        <Route path="/bookclick/:id" element={<ProtectedRoute setReload={setReload}>
          <Bookclick />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/chatcharchoose" element={<ProtectedRoute>
          <ChatCharChoose />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/chatcharchoose/:characterid/chat" element={<ProtectedRoute>
          <Chat />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/bookreport" element={<ProtectedRoute>
          <BookReport />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/quiz" element={<Quiz />} />
      </Routes>
      <Footer/>
      </ConversationProvider>
    </Router>
  );
}

export default App;