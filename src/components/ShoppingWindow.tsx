// ShoppingWindow.tsx
import React from 'react';

interface Product {
  name: string;
  price: string;
  image: string;
}

const ShoppingWindow: React.FC = () => {
  const product: Product = {
    name: 'Example product',
    price: '99.99',
    image: 'https://example.com/product.jpg'
  };

  const handleBuy = () => {
    console.log('Buy button clicked');
  };

  return (
    <div className="shopping-window">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
}

export default ShoppingWindow;




