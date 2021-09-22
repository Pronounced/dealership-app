import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import inventoryReducer from './features/inventorySlice';
import rulesReducer from './features/rulesSlice';
import messageReducer from './features/messageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
    rules: rulesReducer,
    message: messageReducer
  },
})