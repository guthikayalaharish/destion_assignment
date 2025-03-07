// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [storeFilter, setStoreFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: '',
    description: '',
    price: '',
    store: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    store: '',
  });

  useEffect(() => {
    // Demo product data. Replace with an API call if needed.
    const demoProducts = [
      { id: 1, store: 'Store A', name: 'Product 1', description: 'Description 1', price: 50 },
      { id: 2, store: 'Store B', name: 'Product 2', description: 'Description 2', price: 100 },
      { id: 3, store: 'Store A', name: 'Product 3', description: 'Description 3', price: 75 },
    ];
    setProducts(demoProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      (storeFilter ? product.store === storeFilter : true) &&
      (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditProductData(product);
  };

  const handleEditChange = (e) => {
    setEditProductData({ ...editProductData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    setProducts(products.map(product =>
      product.id === editProductId ? { ...editProductData, id: editProductId } : product
    ));
    setEditProductId(null);
    setEditProductData({ name: '', description: '', price: '', store: '' });
  };

  const handleEditCancel = () => {
    setEditProductId(null);
    setEditProductData({ name: '', description: '', price: '', store: '' });
  };

  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (
      newProduct.name.trim() &&
      newProduct.description.trim() &&
      newProduct.price.trim() &&
      newProduct.store.trim()
    ) {
      // For demo, use timestamp as an id.
      const productToAdd = { ...newProduct, id: Date.now() };
      setProducts([...products, productToAdd]);
      setNewProduct({ name: '', description: '', price: '', store: '' });
      setShowAddForm(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Product Management</h1>
      
      {/* Filter and Search */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <label>
          Filter by Store:
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="">All Stores</option>
            <option value="Store A">Store A</option>
            <option value="Store B">Store B</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: '20px', padding: '5px', flex: '1 1 200px' }}
        />
      </div>
      
      {/* Add Product Form */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowAddForm(true)} style={{ padding: '5px 10px' }}>
          Add Product
        </button>
      </div>
      {showAddForm && (
        <div style={{
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}>
          <h3>Add New Product</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              placeholder="Name"
              style={{ padding: '5px', maxWidth: '300px' }}
            />
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleNewProductChange}
              placeholder="Description"
              style={{ padding: '5px', maxWidth: '300px' }}
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleNewProductChange}
              placeholder="Price"
              style={{ padding: '5px', maxWidth: '300px' }}
            />
            <input
              type="text"
              name="store"
              value={newProduct.store}
              onChange={handleNewProductChange}
              placeholder="Store"
              style={{ padding: '5px', maxWidth: '300px' }}
            />
            <div>
              <button onClick={handleAddProduct} style={{ marginRight: '10px', padding: '5px 10px' }}>
                Add
              </button>
              <button onClick={() => setShowAddForm(false)} style={{ padding: '5px 10px' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Display Products */}
      <div>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              backgroundColor: '#fff'
            }}
          >
            {editProductId === product.id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  name="name"
                  value={editProductData.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                  style={{ padding: '5px', width: '100%', maxWidth: '300px' }}
                />
                <input
                  type="text"
                  name="description"
                  value={editProductData.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  style={{ padding: '5px', width: '100%', maxWidth: '300px' }}
                />
                <input
                  type="number"
                  name="price"
                  value={editProductData.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  style={{ padding: '5px', width: '100%', maxWidth: '300px' }}
                />
                <input
                  type="text"
                  name="store"
                  value={editProductData.store}
                  onChange={handleEditChange}
                  placeholder="Store"
                  style={{ padding: '5px', width: '100%', maxWidth: '300px' }}
                />
                <div>
                  <button onClick={handleEditSave} style={{ marginRight: '10px', padding: '5px 10px' }}>
                    Save
                  </button>
                  <button onClick={handleEditCancel} style={{ padding: '5px 10px' }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <strong>{product.name}</strong> – {product.description} (${product.price}) – {product.store}
                <div>
                  <button onClick={() => handleEditClick(product)} style={{ marginRight: '10px', padding: '5px 10px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} style={{ padding: '5px 10px' }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
