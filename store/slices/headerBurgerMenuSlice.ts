import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderBurgerMenuState } from '@/app/interfaces/redux';

const initialState: HeaderBurgerMenuState = {
  isHeaderBurgerMenuOpen: false,
};

const headerBurgerMenuSlice = createSlice({
  name: 'headerBurgerMenu',
  initialState,
  reducers: {
    setIsHeaderBurgerMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isHeaderBurgerMenuOpen = action.payload;
    },
  },
});

export const { setIsHeaderBurgerMenuOpen } = headerBurgerMenuSlice.actions;

export default headerBurgerMenuSlice.reducer;
