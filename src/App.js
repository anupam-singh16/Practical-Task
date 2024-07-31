import React, { useEffect, useState } from "react";
import Product from "./pages/product";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./store/productSlice";
import LandingPage from "./pages/landingPage";
import Carousel from "./component/carousel";
import SignUp from "./pages/signUp";
import Login from "./pages/Login";
import Modal from "./component/modal";
import AddProduct from "./pages/addProduct";
import DetailsPage from "./pages/detailsPage";

const store = configureStore({
  reducer: {
    users: ProductSlice,
  },
});

function App() {
  const [isSticky, setSticky] = useState(false);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const userAuth = JSON.parse(localStorage.getItem("userData"));


  return (
    <Provider store={store}>
      <div className={isSticky ? "sticky-header sticky" : "sticky-header"}>
        <Navbar setSearchText={setSearchText} />
      </div>


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/product" element={userAuth ? <Product searchText={searchText} /> : <SignUp />} />
        <Route path="/addProduct" element={userAuth ? <AddProduct /> : <SignUp />} />
        <Route path="/detailPage/:id" element={userAuth ? <DetailsPage /> : <SignUp />} />
      </Routes>
    </Provider>
  );
}

export default App;
