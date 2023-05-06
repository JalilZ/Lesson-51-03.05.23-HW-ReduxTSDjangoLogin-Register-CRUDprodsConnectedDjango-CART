import axios from 'axios';
import shopProdType from './shopProdType';


export function getShopProducts(CATNAME: string) {
  const MyToken = sessionStorage.getItem('token')
  const config = {headers: {'Authorization': `Bearer ${MyToken}`}};
  return new Promise<{ data: shopProdType[] }>((resolve) =>
  axios
      .get('http://127.0.0.1:8000/products/', config)
      .then((res) => resolve({data: res.data.filter((item:shopProdType) => item.category === CATNAME)}))
  );
}
