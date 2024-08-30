import React, { useEffect } from 'react';
import Timer from './Timer';

 interface Product {
     id: string;
     name: string;
     preparation_time: number;
 }

interface SelectedProductsProps {
    waitingList: Product[];
    moveToReadyList: (productId: string) => void;
    removeProduct: (productId: string, isReady: boolean) => void;
}

const SelectedProducts: React.FC<SelectedProductsProps> = ({ waitingList, moveToReadyList, removeProduct }) => {
	return (
		<div>
				<h2><strong>Productos en Preparación</strong></h2>
				{waitingList.length === 0 ? (
						<p>No hay productos en preparación.</p>
				) : (
						<ul>
								{waitingList.map(product => (
										<li key={product.id}>
												<Timer
														product={product}
														onComplete={() => moveToReadyList(product.id)}
												/><br/>
												<button className='button-product' onClick={() => removeProduct(product.id, false)}>Cancelar</button>
										</li>
								))}
						</ul>
				)}
		</div>
);
};

export default SelectedProducts;
