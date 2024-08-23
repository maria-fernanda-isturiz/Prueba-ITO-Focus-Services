import React from 'react';
import { useCart } from './CartContext';
import {RemoveFromCartIcon, ClearCartIcon} from './Icons';

const Carro: React.FC = () => {
	const {cart, removeFromCart, clearCart, processOrder} = useCart();

	return (
		<div className="cart">
			<h2>Tu carrito de compras</h2>
			{cart.length === 0 ? (
				<p>Tu carrito está vacío</p>
			) : (
				<>
					<ul className="cart-ul">
						{cart.map(item => (
							<li className="cart-ul" key={item.id}>
								{item.name} - Cantidad: {item.quantity}
								<button onClick={() => removeFromCart(item.id)}>
									Eliminar producto del carrito
									<RemoveFromCartIcon />
								</button><br />
							</li>
						))}
					</ul>
					<button onClick={clearCart}>
						Limpiar el carrito
						<ClearCartIcon />
						</button>
				</>
			)}
		</div>
	)
}

export default Carro;