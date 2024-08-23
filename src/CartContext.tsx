import React, {createContext, useState, useContext, useEffect} from 'react';
import {CartItem, Product} from './types';

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	clearCart: () => void;
	processOrder: (onSuccess: () => void, onError: (error: string) => void) => void;
	products: Record<string, Product>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [products, setProducts] = useState<Record<string, Product>>({});

	useEffect(() => {
		const fetchProducts = async() => {
			const response = await fetch('https://products-api-ten.vercel.app/api/');
			if(!response.ok){
				throw new Error('No se puede obtener el producto')
			}
			const fetchedProducts = await response.json();
			setProducts(fetchedProducts.reduce((acc, product) => {
				acc[product.id] = product;
				return acc;
			}, {} as Record<string, Product>))
		};
		fetchProducts();
	}, []);

	const addToCart = (product: Product) => {
		setCart(prevCart => {
			const existingItem = prevCart.find(item => item.id === product.id);
			if(existingItem){
				return prevCart.map(item => 
						item.id === product.id ? {...item, quantity: item.quantity + 1} : item
					);
			} else {
				return [...prevCart, {...product, quantity: 1}];
			}
		});
	};

	const removeFromCart = (productId: string) => {
		setCart(prevCart => 
			prevCart.reduce((acc, item) => {
				if(item.id === productId) {
					if(item.quantity > 1) {
						return [...acc, {...item, quantity: item.quantity - 1}];
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
      for (const item of cart){
				const productData = products[item.id];
				const processingTime = productData.processingTime || 0;
				console.log(`Procesando el pedido ${item.id} por ${processingTime} segundos`);
				await new Promise((resolve) =>  setTimeout(resolve, processingTime * 1000));
			}
			onSuccess();
    } catch (error) {
      console.error('Error procesando su pedido:', error);
      onError(error.message || 'Se ha producido un error al procesar el pedido');
    }
  };

	return (
		<CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, processOrder, products}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if(!context){
		throw new Error('This must be used within a CartProvider');
	}
	return context;
}