// A mock function to mimic making an async request for data
import axios from 'axios'
import userType from './userType'; //username and password
import newuserType from './newuserType';
import registerType from './registerType';

export function loggin(user: userType) {
    return new Promise<{ data: any }>((resolve, reject) => //returns an object including refresh and access token
        {
        axios
          .post('http://127.0.0.1:8000/login/', user)
          .then((res) => resolve({ data: res.data }))
          .catch((error) => reject(error))
        });
  }
//using chatgbt added reject and catch (so when logginAsync.fulfuilled gets error, we catch error and continue to logginAsync.rejected)


  export function register(newuser: newuserType) {
    return new Promise<{ data: registerType }>((resolve, reject) => //the return in django of register is {"username": "someuser", "email": "someemail"}
        {
        axios.post('http://127.0.0.1:8000/register/', newuser)
        .then((res) => resolve({ data: res.data }))
        .catch((error) => reject(error))
        });
  }
  

