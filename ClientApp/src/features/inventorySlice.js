import { createSlice } from '@reduxjs/toolkit';
import { postData, putData, connection } from '../actions/crud';

const initialState = {
  inventoryData: [],
}

export const inventorySlice = createSlice({
  name:'inventory',
  initialState,
  reducers: {
    setInventory: (state, action) => {
      state.inventoryData = action.payload
    },
    addCar: (state, action) => {
      state.inventoryData.push(action.payload);
      postData(action.payload, `${connection}postcar`);
    },
    updateCar: (state, action) => {
      state.inventoryData.map( car => {
        if(car.vin === action.payload[0])
        {
          car.isApproved = action.payload[1];
          putData(car, `${connection}putcar`);
        }
      });
    }
  }
});

export const { setInventory, addCar, updateCar } = inventorySlice.actions;

export default inventorySlice.reducer;