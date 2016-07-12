import { createStore, combineReducers } from 'redux'
import LocationsReducer from './LocationsReducer.jsx'

const Reducer = combineReducers({
    locations: LocationsReducer
});

const Store = createStore(Reducer);

export default Store
