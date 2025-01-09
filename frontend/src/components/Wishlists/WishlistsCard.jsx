import React from 'react';

const WishlistsCard = ({ product }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        margin: '16px auto',
        textAlign: 'center',
      }}
    >
      <img
        src={`http://127.0.0.1:8000/images/${product.image_url}`}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <button
          style={{
            padding: '8px 16px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Buy Now
        </button>
        <button
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistsCard;
