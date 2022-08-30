import React, { Component } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AddData from "./layout/AddData.jsx";
import Header from "./layout/Header";
import CompareData from "./layout/CompareData";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header></Header>
          <Routes>
          <Route exact path="/" element={<AddData />} />
          <Route path="/Compare" element={<CompareData />} />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
