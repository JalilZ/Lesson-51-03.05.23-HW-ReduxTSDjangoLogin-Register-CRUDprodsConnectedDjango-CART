import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { getShopProducts } from './superSliceAPI';
// import prodType from '../Inventory/prodType'
import shopProdType from './shopProdType';



export interface CartState {
  mycart: Array<shopProdType>;
  // mycart: shopProdType[]; also works
  totalPrice: number;
  totalQuantity: number;
  SuperProds: shopProdType[];
  
}



//this block to make sure that when I refresh the page, the initial state of totalQuantity and totalPrice is read from localStorage
const cartFromLocalStorage = localStorage.getItem('My Cart'); // default value for mycart is read from local storage, if there is still no cart then default value is []
let q: number = 0;
let p: number = 0;
if (cartFromLocalStorage){
  for (let i=0; i<JSON.parse(cartFromLocalStorage).length; i++){
    q += JSON.parse(cartFromLocalStorage)[i].quantity
    p += JSON.parse(cartFromLocalStorage)[i].quantity * JSON.parse(cartFromLocalStorage)[i].price
  }
}

const initialState: CartState = {
    mycart: cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [],
    totalQuantity: q, //notice that q is outside the if section (so this line can find the variable)
    totalPrice: p,    //notice that p is outside the if section (so this line can find the variable)
    SuperProds: [],
};

export const getShopProductsAsync = createAsyncThunk(
  'cart/getShopProducts',
  async (CATNAME: string) => {
    const response = await getShopProducts(CATNAME);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    AddItem: (state, action: PayloadAction<shopProdType>) => {
      let iAR = state.mycart.filter(item => item.id === action.payload.id)[0]; //find mathcing element (if any)
      if (iAR){   //if there is already an item in cart
        const indexToUpdate: number = state.mycart.indexOf(iAR); //find the index of that item in cart (if not found then indexToUpdate=-1)
        state.mycart[indexToUpdate].quantity += 1; //byref

        state.totalQuantity += 1;
        state.totalPrice += action.payload.price;
        
      }
      else{  // if new product
        state.mycart.push({...action.payload, quantity: 1}); //this will push product with addtional quantity: 1
        
        state.totalQuantity += 1;
        state.totalPrice += action.payload.price;
      }
      
      localStorage.setItem('My Cart', JSON.stringify(state.mycart));
    },
    RemoveItem: (state, action: PayloadAction<shopProdType>) => {
      let item = state.mycart.filter(item => item.id === action.payload.id)[0]; //find mathcing element (we will always find one)
      if (item.quantity === 1){
        const indexToRemove: number = state.mycart.indexOf(item); //indexof(givenitem) method will return the index of the first occurrence of givenitem
        state.mycart.splice(indexToRemove, 1); //splice(givenIndex, number) changes array in place (remove givenindex, number specifies the number from element to remove starting drom givenIndex, 1 means only 1 which includes the givenIndex)
        state.totalPrice -= action.payload.price;
        state.totalQuantity -= 1;
      }
      else{
        item.quantity -= 1;
        state.totalPrice -= action.payload.price;
        state.totalQuantity -= 1;
      }
      
      localStorage.setItem('My Cart', JSON.stringify(state.mycart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShopProductsAsync.fulfilled, (state, action) => {
        state.SuperProds = action.payload
      })
      
  },
});

export const { AddItem, RemoveItem } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.mycart;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectTotalQuantity = (state: RootState) => state.cart.totalQuantity;

export const selectSuperProds = (state: RootState) => state.cart.SuperProds;   //my menue from server



export default cartSlice.reducer;
