var LocationsReducer = (state = {}, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {

        case 'ALL_LOCATIONS':

            // creating a newState of the data we attached to the action (Firebase data)
            newState = action.data.locations;

            return newState;
            break;

        default:
            return state;
    }
}

export default LocationsReducer
