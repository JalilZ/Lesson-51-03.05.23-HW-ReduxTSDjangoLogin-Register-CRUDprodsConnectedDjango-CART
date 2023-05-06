import React from 'react'
import './MyNavBar.css';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom"

const MyNavBar = () => {
    return (
        <div>
            

                <div className="jumbotron">
                    <div className="container text-center">
                        <h1 className="display-3">Yafo Online Super-Market</h1>
                        <p className="lead">Welcome to Yafo's Super-Market</p>
                    </div>
                </div>

                <div className="logobar">
                    <div className="container text-center">
                        <h5><b>Yafo Market</b> | Probably not the cheapest in town...</h5>
                    </div>
                </div>
                <ul>

                    {/* home will take us to index */}
                    <li className="active"><Link to="/">Log-in</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li style={{float: 'right'}}><Link to="/admin">Admin</Link></li>


                </ul>
            </div>
            )
}

            export default MyNavBar