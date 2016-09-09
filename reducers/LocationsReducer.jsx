var LocationsReducer = (state = {}, action) => {

    switch (action.type) {

        case 'ALL_LOCATIONS':

            // creating a newState of the data we attached to the action (Firebase data)
            let newState = Object.assign({}, state, action.data.locations);

            return newState;

        default:
            return state;
    }
}

export default LocationsReducer
