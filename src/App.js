import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/adduser" Component={AddEditUser} />
          <Route path="/edituser/:id" Component={AddEditUser} />
          <Route path="/userinfo/:id" Component={UserInfo} />
          <Route path="/about" Component={About} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
