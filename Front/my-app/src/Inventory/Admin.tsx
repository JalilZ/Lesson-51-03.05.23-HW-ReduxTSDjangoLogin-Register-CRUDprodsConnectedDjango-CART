import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './AdminStyles.css';
import { useAppSelector, useAppDispatch } from '../app/hooks';


import { 
  getProductsAsync,
  selectProducts,
  postProductsAsync,
  updateProductsAsync,
  deleteProductsAsync,
} from './adminSlice';


const Admin = () => {
    const superProds = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();

    const [prod, setprod] = useState("")
    const [category, setcat] = useState("")
    const [desc, setdesc] = useState("")
    const [price, setprice] = useState(10)
    const [productImage, setproductImage] = useState<File>() // i want to store only one image per product so I don't do const [productImage, setproductImage] = useState<File[]>([]) (this would be usefull if a single product would have many images)
    
    useEffect(() => {
      dispatch(getProductsAsync())
    }, [])

        

    return (
        
        <div>

            <div className='AdminProducts'>
                <br />
                <input type='text' placeholder='product' className="form-control" onChange={(e) => setprod(e.target.value)} />
                <select placeholder='category' className="form-control" onChange={(e) => setcat(e.target.value)}>

                    <option value="">Choose a category</option>
                    <option value="dairy">Dairy</option>
                    <option value="meats">Meat</option>
                    <option value="snacks">Snacks</option>
                </select>

                <input type='text' placeholder='description' className="form-control" onChange={(e) => setdesc(e.target.value)} />
                <input type='number' placeholder='price' className="form-control" onChange={(e) => setprice(+e.target.value)} />
                <input type='file' placeholder='image' className="form-control" onChange={(e) => setproductImage(e.target.files?.[0])} /> 
                <br/>
                <button type="button" className="btn btn-secondary" onClick={() => dispatch(postProductsAsync({category: category, prod: prod, desc: desc, price: price, productImage: productImage}))}>Add Product</button>
                <br/><br/>
            </div>


            <div className='Menu'>
                {superProds.map((i) =>
                    <div key={i.id}>
                        <div className='card border-dark mb-3' style={{ width: '18rem' }}>
                            <div className='card-header'><b>{i.prod}</b></div>
                            <div className='card-body'></div>
                            <h5 className='card-title'>{i.desc}</h5>
                            <img src={require('../../../../Back/static' + i.productImage)} height={'200px'}></img>
                            <p className='card-text' style={{ fontSize: 'larger' }}>&#8362;{i.price}</p>
                            {/* the if to show that i.id cannot be underfined */}
                            <button type="button" className="btn btn-secondary" onClick={() => {if (i.id !== undefined){dispatch(updateProductsAsync({id: i.id, category: category, prod: prod, desc: desc, price: price, productImage: productImage}))}}}>Update Product</button>
                            {/* this works but the line below is much much easier <button type="button" className="btn btn-danger" onClick={() => {if (i.id !== undefined){dispatch(deleteProductsAsync(i.id))}}}>Delete Product</button> */}
                            <button type="button" className="btn btn-danger" onClick={() => dispatch(deleteProductsAsync(i.id || 0))}>Delete Product</button>

                        </div>
                    </div>)}
            </div>

        </div>
    )
        
}


export default Admin