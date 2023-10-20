import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavbarPortalState } from '@/app/interfaces/redux';

const initialState: NavbarPortalState = {
  isNavbarPortalOpen: false,
};

const navbarPortalSlice = createSlice({
  name: 'navbarPortal',
  initialState,
  reducers: {
    setIsNavbarPortalOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavbarPortalOpen = action.payload;
    },
  },
});

export const { setIsNavbarPortalOpen } = navbarPortalSlice.actions;

export default navbarPortalSlice.reducer;
