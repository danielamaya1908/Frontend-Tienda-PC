import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar'; 
import Footer from '../../Footer/Footer'; 
import { Link } from 'react-router-dom'; 

const IpadMini = () => {
  const [ipadProducts, setIpadProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchIpadProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/products/category/Computación/subcategory/Tablets/name/iPad%20mini%20Wi-Fi-%206.ª%20generación');
        const products = response.data;
        setIpadProducts(products);

        products.forEach(async (product) => {
          try {
            const imageResponse = await axios.get(`http://localhost:3005/products/${product.id}/images`);
            const imageFileNames = imageResponse.data;
            const imageUrls = imageFileNames.map(fileName => `http://localhost:3005/images/${fileName}`);
            setProductImages(prevState => ({ ...prevState, [product.id]: imageUrls }));
          } catch (error) {
            console.error(`Error getting images for product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error('Error fetching iPad products:', error);
      }
    };

    fetchIpadProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="ipad-mini-products">
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4 fs-4">iPad Mini</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {ipadProducts.map((product) => (
            <div className="col" key={product.id}>
              <a href={`/detalle-producto/${product.id}`} className="text-decoration-none">
                <div className="card h-100 small-card">
                  <div className="card-img-top d-flex justify-content-center align-items-center" style={{ height: '250px', padding: '10px' }}>
                    {productImages[product.id] && productImages[product.id][0] && (
                      <img 
                        src={productImages[product.id][0]} 
                        alt={`Product ${product.name}`} 
                        className="img-fluid" 
                        style={{ maxHeight: '230px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h5>
                    <p className="card-text fs-7">Almacenamiento Interno: <strong>{product.capacityName}</strong></p>
                    <p className="card-text fs-7">Color: <strong>{product.colorName}</strong></p>
                    <p className="card-text fs-7">Precio: <strong>{formatPrice(product.price)}</strong></p>
                    <div className="mt-auto d-flex justify-content-between">
                      <span className="btn btn-primary btn-sm">Comprar</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );  
};

export default IpadMini;
