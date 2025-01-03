import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Private =() =>{
    const navigate = useNavigate()
    const {store, actions}=useContext(Context)

    return(
        
        store.currentUser ?
        <div>
            <h1>Welcome {store.currentUser["name"]}</h1>
            <Link to={"/"}>
                <button className="btn btn-primary">Back to menu</button>
            </Link>
        </div>
        : store.currentUser == null ?
        <h1>Cargando ruta privada</h1>
        :
        store.currentUser == false && 
        < Navigate to={"/login"}/>
    )
}

export default Private;