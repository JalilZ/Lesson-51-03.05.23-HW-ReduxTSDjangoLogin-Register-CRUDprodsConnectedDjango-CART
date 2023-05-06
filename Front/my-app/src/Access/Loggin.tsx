import React, { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  logginAsync,
  selectLoggedStatus,
  logout,
  selectLogmessage, 
} from './accessSlice';

const Loggin = () => {
  const loggedstatus = useAppSelector(selectLoggedStatus);
  const msg = useAppSelector(selectLogmessage);
  const dispatch = useAppDispatch();

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const mytoken = sessionStorage.getItem('token')
  
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
      
      <div className="card" style={{width: '18rem', flexDirection: 'row'}}>
          <div className="card-body">
            
            {loggedstatus===false ?( 
              <div>  
                <p className="card-text">
                  <input type="text" className="form-control" placeholder="Username" onChange={(e) => setusername(e.target.value)}></input>
                </p>
                <p className="card-text" style={{margin: '0.2rem 0'}}>
                  <input type="password" className="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)}></input>
                </p>
                <p className="card-text" style={{color: 'gray', fontSize: 'small', margin: '0rem'}}>{msg}</p>
                <button className="btn btn-primary" style={{margin: '1rem 0'}} onClick={() => dispatch(logginAsync({username: username, password: password}))}>Login</button>
              </div>): <>
                      <p>{msg} {username}</p>
                      <button className="btn btn-danger" onClick={() => {dispatch(logout()); setusername(''); setpassword('')}}>Logout</button>
                      </>                              
            }  
            {loggedstatus===false ?( 
              <div>
                <p className="card-text" style={{color: 'gray', fontSize: 'small', margin: '0rem'}}>Register a new user</p>
                <p className="card-text"><b><a href='/register'>Register</a></b></p>
              </div>
            ):<span></span>
            }
          </div>
      </div>

    </div>
  )
}

export default Loggin