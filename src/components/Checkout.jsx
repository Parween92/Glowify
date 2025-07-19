import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Checkout = ({ cartItems, finalTotal }) => {
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");
    setSuccess("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const orderData = {
        userId: user?.id,
        productId: cartItems.map((item) => item.id),
        quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        total: finalTotal,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      };
      await api.createOrder(orderData);
      setSuccess("Bestellung erfolgreich!");
      navigate("/order-success");
    } catch (err) {
      setError("Bestellung fehlgeschlagen: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Adresse"
        value={formData.address}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="Stadt"
        value={formData.city}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="PLZ"
        value={formData.postalCode}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="cardName"
        placeholder="Karteninhaber"
        value={formData.cardName}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="cardNumber"
        placeholder="Kartennummer"
        value={formData.cardNumber}
        onChange={handleInputChange}
        required
      />
      <button type="submit" disabled={isProcessing}>
        Jetzt bestellen
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default Checkout;