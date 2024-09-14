  import { createSlice} from "@reduxjs/toolkit"

  const initialState = {
    user: null,
    token: null,
    modelType: null,
    error: null
  }

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setLogin: (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.modelType = action.payload.modelType
        state.error = null
      },
      setLogout: (state) => {
        state.user = null 
        state.token = null 
        state.modelType = null 
        state.error = null
      },
      setListings: (state, action) => {
        state.listings = action.payload.listings
      },
      setTripList: (state, action) => {
        state.user.tripList = action.payload
      },
      clearTripList: (state, action) => {
        state.tripList = [];
      },
      setWishList: (state, action) => {
        state.user.wishList = action.payload
      },
      clearWishList: (state) => {
        state.wishList = [];
      },
      setPropertyList: (state, action) => {
        state.user.propertyList = action.payload
      },
      removeProperty: (state, action) => {
        // Filtering out the listing to be removed
        state.user.propertyList = state.user.propertyList.filter(
          (property) => property._id !== action.payload
        );
      },
      setReservationList: (state, action) => {
        state.user.reservationList = action.payload
      },
      setError: (state, action) => {
        state.error = action.payload; // Update error state
      },
      clearError: (state) => {
        state.error = null; // Clear error state
      },
    }
  })

  export const { setLogin, setLogout, setListings, setTripList, setWishList, clearTripList, clearWishList, setPropertyList, removeProperty, setReservationList, setError, clearError } = userSlice.actions
  export default userSlice.reducer