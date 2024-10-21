import React from 'react';
import FoodOrderReport from './component/FoodOrderReport';
import "./App.css"

const App = () => {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '900px',
    margin: '0 300px',
  };
  return (
    <div style={appStyle}>
      <FoodOrderReport />
    </div>
  );
};



export default App;
