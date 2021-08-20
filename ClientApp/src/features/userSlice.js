import { createSlice } from '@reduxjs/toolkit';
import { postData, connection } from '../actions/crud';

const initialState = {
  userData: [],
}

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.userData = action.payload
    },
    addUser: (state, action) => {
      state.userData.push(action.payload);
      postData(action.payload, `${connection}postuser`);
    },
  }
});

export const { setUsers, addUser } = userSlice.actions;

export default userSlice.reducer;