import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from './types';

interface CartItem {
  id: string;
  name: string;
  preparation_time: number;
  quantity: number;
}


interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  waitingList: CartItem[];
  readyList: CartItem[];
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  processOrder: (onSuccess: () => void, onError: (error: string) => void) => void;
	cancelOrder: (productId: string) => void;
  products: Record<string, Product>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [waitingList, setWaitingList] = useState<CartItem[]>([]);
  const [readyList, setReadyList] = useState<CartItem[]>([]);
	const [cancelledItems, setCancelledItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://products-api-ten.vercel.app/api/');
      if (!response.ok) {
        throw new Error('No se puede obtener el producto');
      }
      const fetchedProducts = await response.json();
      setProducts(
        fetchedProducts.reduce((acc: Record<string, Product>, product: Product) => {
          acc[product.id] = product;
          return acc;
        }, {} as Record<string, Product>)
      );
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          }
          return acc;
        }
        return [...acc, item];
      }, [] as CartItem[])
    );
  };

  const clearCart = () => setCart([]);

  const processOrder = async (
    onSuccess: () => void,
    onError: (error: string) => void
  ) => {
    try {
      const cartItems = [...cart];
      setWaitingList(cartItems);
      setCart([]);

      const newWaitingList = [...cartItems];
      const newReadyList = [...readyList];

      for (const item of cartItems) {
        const productData = products[item.id];
        const processingTime = productData.preparation_time || 0;

        console.log(`Procesando el pedido ${item.id} por ${processingTime} segundos`);

        await new Promise((resolve) => setTimeout(resolve, processingTime * 1000));

				if (cancelledItems.has(item.id)) {
          continue;
        }

        const waitingItemIndex = newWaitingList.findIndex((waitItem) => waitItem.id === item.id);
        if (waitingItemIndex !== -1) {
          const waitingItem = newWaitingList[waitingItemIndex];
          if (waitingItem.quantity > 1) {
            waitingItem.quantity -= 1;
          } else {
            newWaitingList.splice(waitingItemIndex, 1);
          }

          const readyItemIndex = newReadyList.findIndex((readyItem) => readyItem.id === item.id);
          if (readyItemIndex !== -1) {
            newReadyList[readyItemIndex].quantity += 1;
          } else {
            newReadyList.push({ ...item, quantity: 1 });
          }
        }
      }

      setWaitingList(newWaitingList);
      setReadyList(newReadyList);

      onSuccess();
    } catch (error) {
      console.error('Error procesando su pedido:', error);
      onError(error instanceof Error ? error.message : 'Error fetching products');
    }
  };

	const cancelOrder = (productId: string) => {
    setCancelledItems((prev) => new Set(prev).add(productId));
    setWaitingList((prevList) => prevList.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        waitingList,
        readyList,
        addToCart,
        removeFromCart,
        clearCart,
        processOrder,
				cancelOrder,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('This must be used within a CartProvider');
  }
  return context;
};
