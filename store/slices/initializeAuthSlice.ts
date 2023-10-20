import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitializeAuthState } from '@/app/interfaces/redux';

const initialState: InitializeAuthState = {
  authToken: null,
  error: null
}

const initializeAuthSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAuthToken, setError } = initializeAuthSlice.actions;

export default initializeAuthSlice.reducer;
