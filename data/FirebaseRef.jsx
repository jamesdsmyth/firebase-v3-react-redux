import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

var FirebaseRef = () => {
    firebase.database().ref('/').once('value').then((snapshot) => {
        console.log(snapshot.val())
        Store.dispatch(actions.populateLocations(snapshot.val()));


    });
}

export default FirebaseRef
