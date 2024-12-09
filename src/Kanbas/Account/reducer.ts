import { createSlice } from "@reduxjs/toolkit";
const initialState = {
<<<<<<< HEAD
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;

=======
	currentUser: null,
};
const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
