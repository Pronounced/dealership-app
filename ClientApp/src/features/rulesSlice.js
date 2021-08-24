import { createSlice } from '@reduxjs/toolkit';
import { postData, connection } from '../actions/crud';

const initialState = {
  userData: [],
}