import { createSlice } from "@reduxjs/toolkit";

// of built in reducer that it accepts an initial state object
const initialState = {
    event: {},
    events: [],
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEventData(state, action) {
            state.event = action.payload
        },
        fetchEventsStart() {},
        setEvents(state, action) {
            state.events = action.payload
        },
    },
})

// Action creators are generated for each case reducer function - destructure them here
export const { setEventData, fetchEventsStart, setEvents, setSchedules } = eventsSlice.actions

export default eventsSlice.reducer