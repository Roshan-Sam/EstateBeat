import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/Sign-In";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/updateListing";
import Listing from "./Pages/Listing";
import SearchListing from "./Pages/SearchListing";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<SearchListing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/update-listing/:id" element={<UpdateListing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
