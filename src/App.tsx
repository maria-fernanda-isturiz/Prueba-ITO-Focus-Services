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
