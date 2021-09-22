import { createSlice } from '@reduxjs/toolkit';
import { postData, deleteData, connection } from '../actions/crud';

const initialState = {
  rulesData: [],
}

export const rulesSlice = createSlice({
  name:'rules',
  initialState,
  reducers: {
    setRules: (state, action) => {
      state.rulesData = action.payload
    },
    addCarRule: (state, action) => {
      state.rulesData.push(action.payload);
      postData(action.payload, `${connection}postrule`)
    },
    deleteCarRule: (state, action) => {
      var index = state.rulesData.indexOf(action.payload);
      state.rulesData.splice(index, 1);
      deleteData(action.payload, `${connection}deleterule`);
    }
  }
});

export const { setRules, addCarRule, deleteCarRule} = rulesSlice.actions;

export default rulesSlice.reducer;