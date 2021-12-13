import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SignInDataType,
  UserDataType,
  UserTotalDataType,
} from "../@types/data";
import { RootState } from "./index";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    signInLog: [] as SignInDataType[],
    user: [] as UserDataType[],
    userTotal: [] as UserTotalDataType[],
  },
  reducers: {
    setSignInLog: (state, action: PayloadAction<SignInDataType[]>) => {
      state.signInLog = action.payload;
    },
    setUser: (state, action: PayloadAction<UserDataType[]>) => {
      state.user = action.payload;
    },
    setUserTotal: (state, action: PayloadAction<UserTotalDataType[]>) => {
      state.userTotal = action.payload;
    },
  },
});

export const { setSignInLog, setUser, setUserTotal } = dataSlice.actions;

export const selectData = (state: RootState) => state.data;
export default dataSlice.reducer;
