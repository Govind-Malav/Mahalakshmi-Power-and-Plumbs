import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  // Dynamic key based on user
  const cartKey = user ? `cart_${user.email}` : "cart_guest";

  const [cart, setCart] = useState(() => {
    // Attempt to read from the CURRENT key (guest or specific user)
    // Note: This only runs once on mount. We need an effect to switch when user changes.
    const saved = localStorage.getItem("cart_guest"); // Default start as guest if not logged in
    return saved ? JSON.parse(saved) : [];
  });

  // Effect to switch cart when user changes
  useEffect(() => {
    // When user changes (e.g. login/logout), load the correct cart
    const saved = localStorage.getItem(cartKey);
    if (saved) {
      setCart(JSON.parse(saved));
    } else {
      setCart([]);
    }
  }, [cartKey]); // Run whenever the key changes (i.e. user changes)

  // Effect to save cart when it changes
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
