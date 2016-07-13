import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

// when data is received from Firebase, a dispatch is fired to update the Redux state
var FirebaseRef = () => {
    firebase.database().ref('/').on('value', function(snapshot) {
        Store.dispatch(actions.populateLocations(snapshot.val()));
    });
}

export default FirebaseRef
