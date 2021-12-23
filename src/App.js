import React from 'react';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter'
import './App.css';

function App() {
  return (
    <div className="App">
      <p>
        Currency Converter
      </p>
      <header className="App-header">
        <CurrencyConverter />
      </header>
    </div>
  );
}

export default App;
