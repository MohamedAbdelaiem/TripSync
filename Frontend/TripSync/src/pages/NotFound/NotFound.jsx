import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
// import {svg} from "../../../public/images/404.svg";


const NotFound = () => {
    const navigate = useNavigate();
    return (
       <main className="NotFoundPage">
            <div className="cont-404">
                <img src="/images/404.svg" alt="404" className="img-404" />
                <h1 className="title-404">404</h1>
                <h2 className="subtitle-404">Page not found</h2>
                <button className="btn-404" onClick={() => navigate("/")}>Go back to Home</button>
            </div>
       </main>
    );
};

export default NotFound;