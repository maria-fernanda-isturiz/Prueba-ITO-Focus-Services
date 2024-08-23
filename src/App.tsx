import React from 'react';
import { CartProvider } from './CartContext';
import ListaProductos from './ListaProductos';
import Carro from './Carro';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <h1><strong>Tienda de compras</strong></h1>
        <h3>A continuación, podrás seleccionar uno o varios productos para consumir y al final, verás los productos seleccionados</h3>
        <ListaProductos />
        <Carro />
      </div>
    </CartProvider>
  )
}

export default App
