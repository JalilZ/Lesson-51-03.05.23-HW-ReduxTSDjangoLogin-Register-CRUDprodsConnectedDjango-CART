import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import shopProdType from './shopProdType';

import './Styles.css';
import {
  AddItem,
  RemoveItem,
  selectCart,
  selectTotalPrice,
  selectTotalQuantity,
} from './superSlice';



const Cart = () => {
  const mycart = useAppSelector(selectCart);
  const totalp = useAppSelector(selectTotalPrice);
  const totalq = useAppSelector(selectTotalQuantity);
  const dispatch = useAppDispatch();



  return (
    <div className='CartBar'>
      {/* The toLocaleString() method converts a number to a string with a language-sensitive representation of the number */}
      <p style={{ textAlign: 'center' }}><b>My Cart &#128722;</b></p>
      <p style={{ textAlign: 'center' }}><b>Total Quantity: {totalq.toLocaleString()}</b></p>
      <p style={{ textAlign: 'center' }}><b>Subtotal: &#8362; {totalp.toLocaleString()}</b></p>
      {mycart.map((i: shopProdType) => {
        return (
          <div className='CartItem' key={i.id}>
            <div>
              <div className='card border-dark mb-3' style={{ maxWidth: '14rem' }}>
                <div className='card-header'><b>{i.prod}</b></div>

                <p className='card-text'>{i.desc} - &#8362;{i.price}</p>

                <div>
                  <p className='AddRemove'>
                    <button className='AddRemoveBTTN' onClick={() => dispatch(RemoveItem(i))}>-</button>  {/*in Cart.jsx CreateUpdateCentralCart(mycart) is activated  */}
                    <span className='quan'>{i.quantity}</span>
                    <button className='AddRemoveBTTN' onClick={() => dispatch(AddItem(i))}>+</button>       {/*in Cart.jsx CreateUpdateCentralCart(mycart) is activated  */}
                  </p>
                  <div>Total Price: &#8362; {(i.quantity * i.price).toLocaleString()}</div>
                </div>



              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Cart