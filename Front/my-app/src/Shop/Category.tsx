import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Styles.css';
import Cart from './Cart';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import shopProdType from './shopProdType';
import { selectLoggedStatus } from '../Access/accessSlice'; // so if selectLoggedStatus === false, dont display SuperProds and cart


import './Styles.css';
import {
  AddItem,
  RemoveItem,
  selectCart,
  selectSuperProds,
  getShopProductsAsync,
} from './superSlice';



const Category = (props: { CategoryName: string }) => {
    const mycart = useAppSelector(selectCart);
    const SuperProds = useAppSelector(selectSuperProds);
    const dispatch = useAppDispatch();
    const loggedstatus = useAppSelector(selectLoggedStatus);




    const [CATNAME, setCATNAME] = useState<string>('');
    useEffect(() => {
        setCATNAME(props.CategoryName)
    }, [props.CategoryName])


    // const [superProds, setSuperProds] = useState<prodType[]>([]); //superProds (GET) is an array of elements that are of type prodType, there is no quantity in superProds but apparently that's okay..

    // const MY_SERVER = 'http://127.0.0.1:8000/products/';
    // const GetProds = async () => {
    //     const MyToken = localStorage.getItem('MyToken')                           //authentication
    //     if(MyToken){                                           //authentication - this will return null if there is still no 'MyToken' in storage
    //         const config = {headers: {'Authorization': `Bearer ${MyToken}`}}
    //         let res = await axios.get<prodType[]>(MY_SERVER, config);
    //         setSuperProds(res.data.filter(i => i.category === CATNAME));
    //     }
    // }
    useEffect(() => { dispatch(getShopProductsAsync(CATNAME)) }, [CATNAME]);


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {loggedstatus? (
            <div className='Menu'>
                
                {SuperProds.map((i) =>
                    <div key={i.id}>
                        <div className='card border-dark mb-3' style={{ width: '18rem' }}>
                            <div className='card-header'><b>{i.prod}</b></div>
                            <div className='card-body'></div>
                            <h5 className='card-title'>{i.desc}</h5>
                            <img src={require('../../../../Back/static' + i.productImage)} alt='placeholder.png' height={'200px'}></img>
                            <p className='card-text' style={{ fontSize: 'larger' }}>&#8362;{i.price}</p>
                            <button className='btn btn-dark' onClick={() => dispatch(AddItem(i))}>Add To Cart</button>
                        </div>
                    </div>)
                }
            
            </div>
            ) :<div>Please Log-in !</div>}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {loggedstatus? <Cart/>: <div></div>}
            </div>
        </div>
    )
}


export default Category