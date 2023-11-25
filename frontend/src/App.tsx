import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Імпортуйте ваші сторінки тут
// import HomePage from './pages/HomePage';
import Auth from "../packages/Auth";
import EnterprisesManager from "../packages/Main";
import EnterpriseDetails from "../packages/Main/components/EnterpriseDetails";
// import RegisterPage from './pages/RegisterPage';
// import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        {/* Навігаційні посилання */}
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<EnterprisesManager />} />
        <Route path="/enterprise/:id" element={<EnterpriseDetails />} />
        <Route
          path="/login"
          element={
            <Suspense>
              <Auth.Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense>
              <Auth.SignUp />
            </Suspense>
          }
        />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
