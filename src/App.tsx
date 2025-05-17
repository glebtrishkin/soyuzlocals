import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Delivery from './pages/Delivery';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import DomSovets from './pages/DomSovets';

// Component to handle URL parameters for category filtering
function ShopWithParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  
  return <Shop initialCategory={category} />;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopWithParams />} />
          <Route path="/about" element={<About />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dom-sovets" element={<DomSovets />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
