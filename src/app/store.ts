import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'


//const reducer = combineReducers({
//   user: userReducer,
// });
// export const store = configureStore(reducer);


//Redux Toolkit が提供する configureStore 関数に、結合した Reducer を渡し、ストアを生成します。
export const store = configureStore({
  reducer:{
    user: userReducer
  }
})




export type RootState = ReturnType<typeof store.getState>;
