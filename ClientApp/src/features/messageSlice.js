import { createSlice } from '@reduxjs/toolkit';
import { postData, connection } from '../actions/crud';

const initialState = {
  messageData: [],
}

export const messageSlice = createSlice({
  name:'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messageData = action.payload
    },
    addMessage: (state, action) => {
      state.messageData.push(action.payload);
      postData(action.payload, `${connection}postmessage`)
    },
  }
});

export const { setMessages, addMessage} = messageSlice.actions;

export default messageSlice.reducer;