import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
