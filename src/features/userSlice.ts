import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store';


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {uid:"", photoUrl: "",displayName: ""}
  },
  reducers: {
    login: (state,action)=> {
      //payload=user情報
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {uid:"", photoUrl: "",displayName: ""}
    }
  }
})

export const {login, logout} = userSlice.actions;

//useSelecterからuser情報を返す関数を作成
export const selectUser = (state: RootState) =>state.user.user;

export default userSlice.reducer;



