import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from "./pages/SignupPage";
import VerifyPage from "./pages/VerifyPage";
import HomePage from "./pages/HomePage";
import PostDetail from './pages/PostDetail';


function App() {
  return (
    
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/verify" element={<VerifyPage/>} />
            <Route path="/:postId" element={<PostDetail/>} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;



