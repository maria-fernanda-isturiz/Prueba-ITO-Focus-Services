import React, { useEffect, useState } from 'react';
import { Product } from './types';
import { fetchProducts } from './api';
import { useCart } from './CartContext';
import {AddToCartIcon} from './Icons';

const ListaProductos: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

	useEffect(() => {
		const getProducts = async() => {
			try {
				const productsData = await fetchProducts();
				setProducts(productsData);
			} catch(err) {
					setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		getProducts();
	}, []);

	if(loading){
		return <div>...Loading</div>;
	}

	if(error){
		return <div>Error: {error}</div>;
	}

	return (
		<div className="products-list">
			{products.map(product => (
				<div key={product.id} className="product-item">
					<div className="image-container">
						<img className="img" src={product.thumbnail} alt={product.name}/>
					</div>
					<h2>{product.name}</h2>
					<h3>Tiempo de preparación: {product.preparation_time} minutos</h3>
					<button onClick={() => addToCart(product)}>Agregar al carrito
						<AddToCartIcon />
					</button>
				</div>
			))}
		</div>
	)
};

export default ListaProductos;