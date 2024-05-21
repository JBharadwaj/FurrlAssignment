import { useState, useEffect } from 'react';
import axios from 'axios';

const imageArray = (product) => {
  let images = [];
  for (let each of product) {
    images.push({ id: each.id, position: each.position, width: each.width, height: each.height, src: each.src });
  }
  return images;
};

const objectToObject = (obj) => {
  const images = imageArray(obj.images);
  return {
    id: obj.id,
    title: obj.title,
    vendor: obj.vendor,
    shopify_id: obj.shopifyId,
    discount_percent: obj.brand.discountPercent,
    image_list: images,
    mrp: obj.MRP,
    price: obj.price,
    name: obj.brand.name,
    brand_id: obj.brand.id,
  };
};

const ProductsList = ({ page }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const payload = {
          input: { page, pageSize: 10, filters: [], id: "#HomeHunts", entity: "vibe" }
        };

        const response = await axios.post('https://api.furrl.in/api/v2/listing/getListingProducts', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const productlist = response.data.data.getListingProducts.products.map(objectToObject);

        setProducts(prevProducts => {
          const newProducts = [...prevProducts, ...productlist];
          const uniqueProducts = Array.from(new Set(newProducts.map(p => p.shopify_id)))
                                      .map(id => newProducts.find(p => p.shopify_id === id));
          return uniqueProducts;
        });

        setHasMore(page < 110);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { loading, error, products, hasMore };
};

export default ProductsList;
