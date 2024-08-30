import React from 'react';
import { useCart } from './CartContext';

const WaitingList: React.FC = () => {
  const { waitingList } = useCart();

  return (
    <div>
      <h2>Productos en espera</h2>
      {waitingList.length === 0 ? (
        <p>No hay productos en espera.</p>
      ) : (
        <ul>
          {waitingList.map((item) => (
            <li key={item.id}>
              {item.name} - Cantidad: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WaitingList;
