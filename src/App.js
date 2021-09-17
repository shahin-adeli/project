import React, { useState, useEffect } from 'react';

import Product from './Product';

import axios from 'axios';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  //fetching data from server and storing it in state
  async function fetchDate() {
    try {
      const response = await axios.get(
        'https://api.jsonbin.io/b/5e9fc4a82940c704e1dc7893'
      );
      setAllProducts(response.data);
      setFilteredProducts(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // calculating the categories dynamically and storing it in state
  function getAllCategories() {
    let categories = [];
    allProducts.forEach(
      (product) =>
        (categories = [...categories, ...Object.values(product.size)])
    );

    setAllCategories(['select by size', ...new Set(categories)]);
  }
  // calculate filtered list of products and store it in state
  function filterItems(e) {
    const value = e.target.value;
    if (value === 'select by size') {
      setFilteredProducts(allProducts);
    } else {
      const newProducts = allProducts.filter((product) =>
        Object.values(product.size).includes(value)
      );
      setFilteredProducts(newProducts);
    }
  }

  //fetch data after first render
  useEffect(() => {
    fetchDate();
  }, []);
  //calculate new categories if data changes
  useEffect(() => {
    getAllCategories();
  }, [allProducts]);

  return (
    <main>
      <section>
        <div className='header-container'>
          <h2>Woman's top</h2>
          <select name='category' id='category' onChange={filterItems}>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}{' '}
              </option>
            ))}
          </select>
        </div>
        <div className='products-container'>
          {filteredProducts.map((product) => {
            return <Product {...product} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
