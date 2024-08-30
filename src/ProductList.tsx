import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import './index.css';

 export interface Product {
     id: string;
     name: string;
     preparation_time: number; 
		 thumbnail: string
 }

export interface ProductListProps {
    addToWaitingList: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ addToWaitingList }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

		useEffect(() => {
			const getProducts = async() => {
				try {
					const productsData = await fetchProducts();
					setProducts(productsData);
				} catch(error) {
						setError(error instanceof Error ? error.message : 'Error fetching products');
				} finally {
					setLoading(false);
				}
			};
	
			getProducts();
		}, []);

    return (
			<div className="products-list">
			{products.map(product => (
				<div key={product.id} className="product-item">
					<div className="image-container">
						<img className="img" src={product.thumbnail} alt={product.name}/>
					</div>
					<h2>{product.name}</h2>
					<h3>Tiempo de preparación: {product.preparation_time} segundos</h3>
					<button className="button-product" onClick={() => addToWaitingList(product)}>Agregar al carrito y esperar a despachar
					</button>
				</div>
			))}
		</div>
	);
	
}
