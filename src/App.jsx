import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddQuestion from "./components/question/AddQuestion";
import Profile from "./components/Auth/Profile";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import { AuthProvider } from "./components/Auth/AuthProvider";
import GetAllQuestion from "./components/quiz/GetAllQuestion";
import QuizStepper from "./components/quiz/QuizStepper";
import Quiz from "./components/quiz/Quiz";
import QuizResult from "./components/quiz/QuizResult";
import UpdateQuestion from "./components/question/UpdateQuestion";
import ErrorBoundary from "./utils/ErrorBoundary";
import Home from "./components/layout/Home";
import LogOut from "./components/Auth/LogOut";
import RequireAuth from "./components/Auth/RequireAuth";
import Admin from "./components/admin/Admin";
import ManageUsers from "./components/admin/ManageUsers";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import QuizReview from "./components/quiz/QuizReview";

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <BrowserRouter>
        

          <main className="m-auto bg-gray-200 min-h-[100vh]">
            <Navbar/>
            <Routes>
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-question" element={<AddQuestion />} />
              <Route path="/" element={<Home />} />
              <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
              <Route path="/manage-questions" element={<GetAllQuestion />} />
              <Route path="/manage-users" element={<ManageUsers/>} />
              <Route path="/quiz-review" element={<QuizReview/>}/>
              <Route path="/quiz-step" element={
                <RequireAuth>
                  <QuizStepper />
                </RequireAuth>
              } />
              <Route path="/take-quiz" element={
                <RequireAuth>
                  <Quiz/>
                </RequireAuth>
              } />

              <Route path="quiz-result" element={<QuizResult />} />
              <Route path="/logout" element={<LogOut />} />
            </Routes>
            
          </main>

        
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

