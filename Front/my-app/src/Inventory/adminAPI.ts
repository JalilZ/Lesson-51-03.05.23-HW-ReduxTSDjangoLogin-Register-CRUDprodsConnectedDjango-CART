import axios from 'axios';
import prodType from './prodType';


export function getProducts() {
  const MyToken = sessionStorage.getItem('token')
  const config = {headers: {'Authorization': `Bearer ${MyToken}`}};
  return new Promise<{ data: prodType[] }>((resolve) =>
  setTimeout(() => // to give time after we post a picture
    {axios
      .get('http://127.0.0.1:8000/products/', config)
      .then((res) => resolve({data: res.data}))}, 1000)
  );
}


export function postProduct(prod: prodType) {
  const MyToken = sessionStorage.getItem('token')
  const config = {headers: {'Authorization': `Bearer ${MyToken}`}}          //authentication

  const formData = new FormData();
  formData.append("prod", prod.prod);
  formData.append("category", prod.category);
  formData.append("desc", prod.desc);
  formData.append("price", prod.price.toString());            //formdata elements can only be strings
  if (prod.productImage !== undefined) {                      //typescript needs to make sure that when accessing productImage, it is not underfined
                                        formData.append("productImage", prod.productImage);
                                       }                   
  return new Promise<{ data: prodType }>((resolve) =>
    axios.post('http://127.0.0.1:8000/products/', formData, config).then(res => resolve({data: res.data}))
  );
}


export function updateProduct(prod: prodType) {
  const MyToken = sessionStorage.getItem('token')
  const config = {headers: {'Authorization': `Bearer ${MyToken}`}}          //authentication

  const formData = new FormData();
  formData.append("prod", prod.prod);
  formData.append("category", prod.category);
  formData.append("desc", prod.desc);
  formData.append("price", prod.price.toString());            //formdata elements can only be strings
  if (prod.productImage !== undefined) {                      //typescript needs to make sure that when accessing productImage, it is not underfined
                                        formData.append("productImage", prod.productImage);
                                       }                   
  return new Promise<{ data: prodType }>((resolve) =>
    axios.put(`http://127.0.0.1:8000/products/${prod.id}`, formData, config).then(res => resolve({data: res.data}))
  );
}


export function deleteProduct(id: number) {
  const MyToken = sessionStorage.getItem('token')
  const config = {headers: {'Authorization': `Bearer ${MyToken}`}}          //authentication
  return new Promise<{ data: any }>((resolve) => //type any (there is no actual data that returns so it does not matter ..)
    axios.delete(`http://127.0.0.1:8000/products/${id}`, config).then(res => resolve({data: res.data})) //there is nothing to return
  );
}

