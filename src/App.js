import React from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import PrescriptionDisplay from './components/PrescriptionDisplay/PrescriptionDisplay';

const App = () => {
  return (
    <div className='App'>
      <Header></Header>
      <PrescriptionDisplay></PrescriptionDisplay>
    </div>
  );
};

export default App;
