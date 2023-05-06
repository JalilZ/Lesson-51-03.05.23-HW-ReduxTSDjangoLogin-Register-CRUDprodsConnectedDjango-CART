import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom"

const Shop = () => {

  return (
    <div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>


        <Link to="/shop/dairy">
          <div className="card">
            {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
            <div className="container">
              <h4 style={{textAlign: 'center'}}><b>Dairy Products</b></h4>
              <p><img src={require('../assets/DAIRY.jpg')} alt='placeholder.png' height={'200px'} width={'300px'}></img></p>
            </div>
          </div>
          <br/>
        </Link>

        <Link to="/shop/meats">
          <div className="card">
            {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
            <div className="container">
              <h4 style={{textAlign: 'center'}}><b>Meat Products</b></h4>
              <p><img src={require('../assets/MEATS.jpg')} alt='placeholder.png' height={'200px'} width={'300px'}></img></p>
            </div>
          </div>
          <br/>
        </Link>

        <Link to="/shop/snacks">
          <div className="card">
            {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
            <div className="container">
              <h4 style={{textAlign: 'center'}}><b>Snack Products</b></h4>
              <p><img src={require('../assets/SNACKS.jpg')} alt='placeholder.png' height={'200px'} width={'300px'}></img></p>
            </div>
          </div>
          <br/>
        </Link>


      </div>
      <Outlet />

    </div>
  )
}

export default Shop