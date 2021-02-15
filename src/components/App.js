import React from 'react';
import Header from "./Header";
import ProductControl from "./ProductControl";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <React.Fragment>
      <div class = "container">
        <Header />
        <ProductControl />
      </div>
    </React.Fragment>
  );
}

export default App;
