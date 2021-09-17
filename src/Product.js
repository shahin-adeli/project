import React from 'react';

function Product({
  index,
  isExclusive,
  isSale,
  price,
  productImage,
  productName,
}) {
  let status = '';
  if (isExclusive) {
    status = 'exclusive';
  } else if (isSale) {
    status = 'sale';
  }
  return (
    <article className='product' key={index}>
      <img
        className='product__image'
        src={`./images/product-${index + 1}.jpg`}
        alt={productName}
      />
      <div className={`product__tag ${status}`}>
        {isExclusive && 'Exclusive'}
        {isSale && 'Sale'}
      </div>
      <div className='product__info'>
        <h4>{productName}</h4>
        <h3>{price}</h3>
      </div>
    </article>
  );
}

export default Product;
