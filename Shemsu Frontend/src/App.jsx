import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import AccountManagementPage from "./pages/AccountManagementPage/AccountManagementPage.jsx";
import ProductManagementPage from "./pages/ProductManagementPage/ProductManagementPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import VerificationPage from "./pages/LoginPage/VerificationPage.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/account" element={<AccountManagementPage />} />
        <Route path="/ProductManagement" element={<ProductManagementPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
