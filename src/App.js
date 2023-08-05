import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Layout from './components/Layout';
import Products from './components/Products';
// import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/product/:productId" element={<Products />} />
        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
