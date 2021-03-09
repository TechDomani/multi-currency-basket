import './App.css';
import React from "react";
import Basket from './Components/Basket/Basket';
import ErrorBoundary from './Components/Error/ErrorBoundary'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Basket />
      </ErrorBoundary>
    </div>
  );
}

export default App;
