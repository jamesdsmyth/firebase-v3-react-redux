import { createStore, combineReducers } from 'redux'
import LocationsReducer from './LocationsReducer.jsx'

var Reducer = combineReducers({
    locations: LocationsReducer
});

console.log(Reducer);
var Store = createStore(Reducer);

export default Store
