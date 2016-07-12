var LocationsReducer = (state = {}, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {

        case 'ALL_LOCATIONS':

            newState = action.data.locations;

            console.log('new state is', newState);
            return newState;
            break;

        default:
            return state;
    }
}

export default LocationsReducer
