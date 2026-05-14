import { createContext, useContext, useState, useCallback } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) =>
      prev.find((i) => i.id === product.id) ? prev : [...prev, product]
    );
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const isWishlisted = useCallback(
    (productId) => wishlistItems.some((i) => i.id === productId),
    [wishlistItems]
  );

  const toggleWishlist = useCallback(
    (product) => {
      isWishlisted(product.id)
        ? removeFromWishlist(product.id)
        : addToWishlist(product);
    },
    [isWishlisted, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        toggleWishlist,
        count: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
};