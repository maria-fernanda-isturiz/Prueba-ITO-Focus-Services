/* Componentes utilizados: ProductList, SelectedProducts, ReadyProducts y Timer

El primer componente muestra los productos en la API con una petición GET y contiene una serie de acciones y lógica de programación
que permite agregar productos al carrito de compras.

El segundo componente muestra los productos seleccionados en el carrito y el temporizador o “timer” que descuenta en forma regresiva los
segundos que tarda un producto en ser preparado al 100% y estar listo

EL tercer componente muestra los productos que ya están listos, una vez el temporizador o “timer” ha llegado hasta 0 y el proceso de
preparaciôn ha sido finalizado.

La aplicación cuenta con 2 listas: la primera en donde se muestran los productos en proceso de preparación, con el temporizador o “timer”
descontando los segundos hasta llegar a 0 y la segunda lista que muestra los productos ya listos para ser retirados por el cliente.*/

import React, { useState } from 'react';
import {ProductList}from './ProductList';
// import {Product} from './types';
import SelectedProducts from './SelectedProducts';
import ReadyProducts from './ReadyProducts';

export interface Product {
  id: string;
  name: string;
  preparation_time: number; 
  thumbnail: string
}

interface ProductListProps extends Product {
  addToWaitingList: (product: Product) => void;
}

const App: React.FC = () => {
    const [waitingList, setWaitingList] = useState<Product[]>([]);
    const [readyList, setReadyList] = useState<Product[]>([]);

    const addToWaitingList = (product: Product) => {
        setWaitingList([...waitingList, { ...product}]);
    };

    const moveToReadyList = (productId: string) => {
        const product = waitingList.find(p => p.id === productId);
        if (product) {
            setReadyList([...readyList, product]);
            setWaitingList(waitingList.filter(p => p.id !== productId));
        }
    };

    const removeProduct = (productId: string, isReady: boolean) => {
        if (isReady) {
            setReadyList(readyList.filter(p => p.id !== productId));
        } else {
            setWaitingList(waitingList.filter(p => p.id !== productId));
        }
    };

    return (
        <div>
            <h1>Máquina Expendedora</h1>
            <ProductList addToWaitingList={addToWaitingList} /><br/>
            <SelectedProducts waitingList={waitingList} moveToReadyList={moveToReadyList} removeProduct={removeProduct} /><br />
            <ReadyProducts readyList={readyList} removeProduct={removeProduct} />
        </div>
    );
};

export default App;

