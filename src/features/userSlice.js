import { createSlice } from '@reduxjs/toolkit';
import { postData, connection } from '../actions/crud';

const initialState = {
  userData: [],
  isLoggedIn: false,
  isAdmin: false,
  currentUser: null,
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
    updateLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload[0];
      state.isAdmin = action.payload[1];
      state.currentUser = action.payload[2];
    }
  }
});

export const { setUsers, addUser, updateLoginStatus } = userSlice.actions;

export default userSlice.reducer;