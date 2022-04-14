import React from "react";
import { Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Navbar from "./components/Navbar";
import './styles.css';


// App component
const  App = () => {
  return (
    <div className="App">
            <ToastContainer />
            <Navbar />
            <Routes>
            {/* Routes for different endpoints */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/add" element={<AddContact />} />
            <Route exact path="/edit/:id" element={<EditContact />} />
            </Routes>
    </div>
  );
}

export default App;
