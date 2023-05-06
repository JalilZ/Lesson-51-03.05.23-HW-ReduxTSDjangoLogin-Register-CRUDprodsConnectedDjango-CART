import React, { useState } from 'react'
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  registerAsync,
  selectRegistermessage,
  selectRegisterStatus,
  selectLoggedStatus,
} from './accessSlice';


const Signup = () => {
  const msg = useAppSelector(selectRegistermessage);
  const regStatus = useAppSelector(selectRegisterStatus);
  const dispatch = useAppDispatch();

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
      <div className="card" style={{width: '18rem', flexDirection: 'row'}}>
          <div className="card-body">
          {regStatus===false? 
            <div>
                <p className="card-text">
                  <input type="text" className="form-control" placeholder="Username" onChange={(e) => setusername(e.target.value)}></input>
                </p>
                <p className="card-text">
                  <input type="text" className="form-control" placeholder="Email" onChange={(e) => setemail(e.target.value)}></input>
                </p>
                <p className="card-text" style={{margin: '0.2rem 0'}}>
                  <input type="password" className="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)}></input>
                </p>
                <p className="card-text" style={{color: 'gray', fontSize: 'small', margin: '0rem'}}>{msg}</p>
                
                <button className="btn btn-primary" style={{margin: '1rem 0'}} onClick={() => dispatch(registerAsync({username: username, email: email, password: password}))}>Register</button>
            </div>: 
                <div>{msg}</div>
           }  
              <p className="card-text" style={{fontSize: 'small'}}><b><a href='/'>Go back to log-in page</a></b></p>      
           </div>
       </div>
    </div>
  )
}

export default Signup