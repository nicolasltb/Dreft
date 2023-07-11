import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home/Home";
import CreateTicket from "./CreateTicket/CreateTicket";
import Login from "./LoginPage/Login";
import Register from "./RegisterPage/Register"

const Roteador = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component = { Login } path="/"/>
                <Route Component = { Home }  path="/home"/>
                <Route Component = { CreateTicket } path="/createTicket"/>
                <Route Component = { Register } path="/register"/>
            </Routes>
       </BrowserRouter>
    )
}

export default Roteador;