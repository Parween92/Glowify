import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { AuthForm } from "./components/AuthForm";
import { Dashboard } from "./components/Dashboard";
import ChatBot from "./components/Chatbot";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="products" element={<Product />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="*" element={<h2>NOT FOUND</h2>} />
        </Route>
      </Routes>
      <ChatBot />
    </>
  );
}

export default App;
