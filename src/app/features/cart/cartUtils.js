// src/app/features/cart/cartUtils.js
export const getCartFromLocalStorage = (key = "cart_v1") => {
   try {
      const raw = localStorage.getItem(key);
      if (!raw) return { items: [], totalQuantity: 0, totalPrice: 0 };
      const items = JSON.parse(raw);
      const totals = calculateTotals(items);
      return { items, ...totals };
   } catch (e) {
      console.error("Failed to read cart from localStorage", e);
      return { items: [], totalQuantity: 0, totalPrice: 0 };
   }
};

export const saveCartToLocalStorage = (items, key = "cart_v1") => {
   try {
      localStorage.setItem(key, JSON.stringify(items));
   } catch (e) {
      console.error("Failed to save cart to localStorage", e);
   }
};

export const calculateTotals = (items) => {
   const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 0), 0);
   const totalPrice = items.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 0), 0);
   return { totalQuantity, totalPrice };
};
