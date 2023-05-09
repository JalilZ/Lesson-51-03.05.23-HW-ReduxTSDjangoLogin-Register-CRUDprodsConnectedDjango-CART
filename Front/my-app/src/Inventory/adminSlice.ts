import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { 
  getProducts, 
  postProduct, 
  deleteProduct,
  updateProduct,
} from './adminAPI';
import prodType from './prodType';

export interface AdminState {
  products: prodType[];

}

const initialState: AdminState = {
  products: [],

};


export const getProductsAsync = createAsyncThunk(
  'admin/getProducts',
  async () => {
    const response = await getProducts();
    return response.data;
  }
);

export const postProductsAsync = createAsyncThunk(
  'admin/postProduct',
  async (prod: prodType) => {
    const response = await postProduct(prod);
    await getProducts();
    return response.data;
  }
);

export const updateProductsAsync = createAsyncThunk(
  'admin/updateProduct',
  async (prod: prodType) => {
    const response = await updateProduct(prod);
    return response.data;
  }
);

export const deleteProductsAsync = createAsyncThunk(
  'admin/deleteProduct',
  async (id: number) => {
    const response = await deleteProduct(id);
    // return response.data; //this also works - see 3 hashed lines below in the builder
    return id
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    increment: (state) => {
      
    },
  },
    
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(postProductsAsync.fulfilled, (state, action) => {
        // this works but the line below is easier state.products = [...state.products, action.payload]
        state.products.push(action.payload) 
      })
      .addCase(updateProductsAsync.fulfilled, (state, action) => {
        let itemToUpdate : prodType = state.products.filter(item => item.id === action.payload.id)[0] //find mathcing element (we will always find one)
        let indexToUpdate : number = state.products.indexOf(itemToUpdate)
        state.products[indexToUpdate] = action.payload //update the array memory (by ref) // i think this line makes my code CRASH because it updates image state fast (string link), but there is still no image uploaded
      })
      .addCase(deleteProductsAsync.fulfilled, (state, action) => {
        // three lines below work (see the return of the deleteProductsAsyc above)
        // let itemToRemove : prodType = state.products.filter(item => item.id === action.payload.id)[0] //find mathcing element (we will always find one)
        // let indexToRemove : number = state.products.indexOf(itemToRemove)
        // state.products.splice(indexToRemove, 1)
        state.products = state.products.filter(prod => prod.id != action.payload)

      })
      
  },
});

export const { increment } = adminSlice.actions;
export const selectProducts = (state: RootState) => state.admin.products;


export default adminSlice.reducer;
