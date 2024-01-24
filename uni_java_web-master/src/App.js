import { Route, Routes } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import React from 'react';
import CarPage from './pages/Car/CarPage.tsx';
import BrandPage from './pages/Brand/BrandPage.tsx';
import ModelPage from './pages/Model/ModelPage.tsx';
import FuelTypePage from './pages/FuelType/FuelTypePage.tsx';
import TransmissionPage from './pages/Transmission/TransmissionPage.tsx'
import LoginPage from './pages/Auth/LoginPage.tsx'
import RegisterPage from './pages/Auth/RegisterPage.tsx'

function App() {
    return (
      <>
        <ResponsiveAppBar/>
        <div className='mt-10'>
          <Routes>
              <Route path="/Cars" element={<CarPage />} />
              <Route path="/Brands" element={<BrandPage />} />
              <Route path="/Models" element={<ModelPage />} />
              <Route path="/FuelTypes" element={<FuelTypePage />} />
              <Route path="/Transmissions" element={<TransmissionPage />} />
              <Route path='/Login' element={<LoginPage/>}/>
              <Route path='/Register' element={<RegisterPage />}/>
          </Routes>
        </div>
      </>
    );
  
}

export default App;



