import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Product from "./components/Product";
import Cart from "./components/Cart";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<AuthForm />} />

          <Route path="products" element={<Product />} />

          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<h2>NOT FOUND</h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
