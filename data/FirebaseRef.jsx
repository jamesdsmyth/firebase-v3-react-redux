import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

var FirebaseRef = () => {
    firebase.database().ref('/').on('value', function(snapshot) {
        Store.dispatch(actions.populateLocations(snapshot.val()));
    });
}

export default FirebaseRef
