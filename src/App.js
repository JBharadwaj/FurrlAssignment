import React, { useState } from 'react';
import './App.css';
import ProductsList from './components/ProductList';

const App = () => {
  const [page, setPage] = useState(1);
  const { loading, error, hasMore, products } = ProductsList(page);
  
  // Debug logs

  return (
    <>
      <div>Test Message: Component Loaded</div> {/* Add this line for initial render check */}
      
      {products.map(product => {
        return <div key={product.shopify_id} className="container">
          <h1>{product.name}</h1>
        </div>
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
    </>
  );
};

export default App;
