import { all, call, put, takeLatest} from 'redux-saga/effects';
import { handleFetchEvents } from './events.helper';
import { fetchEventsStart, setEvents } from './eventsSlice';

export function* fetchEvents() { // generator function that yields values
    try {
        const events = yield handleFetchEvents();
        yield put(setEvents(events));
    } catch(error) {
        console.log(error);
    }
}

export function* onFetchEventsStart() {
    yield takeLatest(fetchEventsStart.type, fetchEvents);
}

export default function* eventsSagas() {
    yield all([call(onFetchEventsStart)]);
}