import { createStore, combineReducers } from 'redux'
import LocationsReducer from './LocationsReducer.jsx'

// combining a single reducer...normally there would be more here
const Reducer = combineReducers({
    locations: LocationsReducer
});

const Store = createStore(Reducer);

export default Store
