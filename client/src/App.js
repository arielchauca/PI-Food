import "./App.css";
import React from "react";
//importo los componentes
import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Details from "./components/Details/Details.jsx";
import Create from "./components/Create/Create.jsx";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/details/:id" element={<Details/>}/>
          <Route path="/create" element={<Create/>}/>
        </Routes>
    </div>
  );
}

export default App;
