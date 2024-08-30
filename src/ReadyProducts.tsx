import React from 'react';

 interface Product {
     id: string;
     name: string;
     preparation_time: number;
 }

interface ReadyProductsProps {
    readyList: Product[];
    removeProduct: (productId: string, isReady: boolean) => void;
}

const ReadyProducts: React.FC<ReadyProductsProps> = ({ readyList, removeProduct }) => {
    return (
        <div>
            <h2><strong>Productos Listos para ser retirados</strong></h2>
            <ul>
                {readyList.map(product => (
                    <li key={product.id}>
                        {product.name}
                        <br/><br/>
                        <button className='button-product' onClick={() => removeProduct(product.id, true)}>Retirar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadyProducts;

