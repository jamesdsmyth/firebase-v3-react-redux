import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

var FirebaseRef = () => {
    // firebase.database().ref('/').on('value').then((snapshot) => {
    //     console.log(snapshot.val())
    //     Store.dispatch(actions.populateLocations(snapshot.val()));
    // });

    firebase.database().ref('/').on('value', function(snapshot) {
        console.log(snapshot.val())
        Store.dispatch(actions.populateLocations(snapshot.val()));
    });
}

export default FirebaseRef
