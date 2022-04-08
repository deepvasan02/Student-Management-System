import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <div className="App">
            <Navbar />
            <Route exact path="/" >
              <h1>Home path</h1>
            </Route>
            <Route exact path="/add"  >
              <h1>Add path</h1>
            </Route>
            <Route exact path="/edit/:id"  >
              <h1>Edit path</h1>
            </Route>
    </div>
  );
}

export default App;
