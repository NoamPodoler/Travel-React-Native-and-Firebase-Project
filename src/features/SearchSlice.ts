import { Temporal } from "@js-temporal/polyfill";
import { createSlice, Reducer } from "@reduxjs/toolkit";
import { DESTINATIONS, TODAY } from "../utils/constans";

interface State {
  selectedDestinations: typeof DESTINATIONS;
  startingDate: Temporal.PlainDate;
  endingDate: Temporal.PlainDate;
}

const initialState: State = {
  selectedDestinations: [],
  startingDate: null,
  endingDate: null,
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    modifySelectedDestination: (
      state: State,
      action: { payload: typeof DESTINATIONS[0] }
    ) => {
      const isFoundIndex = state.selectedDestinations.findIndex(
        (item) => item.city === action.payload.city
      );

      // New Destination
      if (isFoundIndex === -1) state.selectedDestinations.push(action.payload);
      // Remove Existing Destination
      else
        state.selectedDestinations = state.selectedDestinations.filter(
          (item) => item.city !== action.payload.city
        );
    },

    resetDestinations: (state: State) => {
      state.selectedDestinations = [];
    },

    addDestination: (
      state: State,
      action: { payload: typeof DESTINATIONS[0] }
    ) => {
      state.selectedDestinations.push(action.payload);
    },

    removeDestination: (
      state: State,
      action: { payload: typeof DESTINATIONS[0] }
    ) => {
      state.selectedDestinations = state.selectedDestinations.filter(
        (item) => item.city !== action.payload.city
      );
    },
    goAnywhere: (state: State, action: { payload: typeof DESTINATIONS[0] }) => {
      state.selectedDestinations = [action.payload];
    },

    addDate: (state: State, action: { payload: Temporal.PlainDate }) => {
      // Selected date is in the past
      if (TODAY.until(action.payload).days < 0) return;

      // Starting date has not been selcted yet -> is equal to null
      if (state.startingDate === null) {
        state.startingDate = action.payload;
      }
      // Ending Date already have been selected -> values are being reset
      else if (state.endingDate !== null) {
        state.startingDate = action.payload;
        state.endingDate = null;
      }
      // New date is before the starting date and ending date has not been set yet
      else if (action.payload.until(state.startingDate).days > 0) {
        state.startingDate = action.payload;
      }
      // Ending date has not been selected yet and is not the same date as starting date
      else if (state.startingDate.until(action.payload).days !== 0) {
        state.endingDate = action.payload;
      }
    },
  },
});

export const {
  modifySelectedDestination,
  resetDestinations,
  addDestination,
  removeDestination,
  goAnywhere,
  addDate,
} = SearchSlice.actions;
const reducer = SearchSlice.reducer as Reducer<State>;
export default reducer;