# Firebase v3 with React using Redux

This is a walkthrough of how I managed to get Firebase v3 to play nice with React and Redux. This is a simple approach that involves dispatching an action once the data from Firebase has been received. This in turn passes the Firebase data to a reducer, creating a new state which will then update the view automatically due to React's way of dealing with life cycles.

**Setting up Firebase**

Adding the below code to the base of your `<body>` above any other JavaScript references in your `index.html` will initialise the call to the Firebase database. Just for ease for the demo, I have setup some dummy data in the database.

```html
<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
    <script>
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD_JN46w3-L8UR6pEMVDLtGU4IdA8CnJaM",
        authDomain: "fir-react-redux-example.firebaseapp.com",
        databaseURL: "https://fir-react-redux-example.firebaseio.com",
        storageBucket: "",
    };
    firebase.initializeApp(config);
</script>
```

**Getting the data from Firebase**

After setting up the `Redux store` you need to dispatch an action that passes the `snapshot.val()` to the `action creator` and in turn dispatches the object to the reducers. Please note I am using ES6 arrow functions which means you need to be using a transpiler such as [Babel](https://babeljs.io/) for it to work on browsers that do not support ES6 yet.

```javascript
import { createStore, combineReducers } from 'redux'

// combines all reducers, one in this case...
var Reducer = combineReducers({
    locations: LocationsReducer
});

// creates the Redux store with the combined reducer variable
var Store = createStore(Reducer);

// We get the stored Firebase JSON once and on completion we fire off a dispatch
firebase.database().ref('/').once('value').then((snapshot) => {
    Store.dispatch(actions.populateLocations(snapshot.val()));
});

// populateLocations action that returns an object of the data and type so when it it passed into the reducer, we know what should be updated
function populateLocations (data) {
    return {
        type: 'ALL_LOCATIONS',
        data: data
    }
}
```

**Creating a new state with the Firebase data**

Below is the reducer that is relevant to the dispatch so when the Firebase data is returned, the `newState` is updated with the `action.data.locations` and returned. The `action` is the object containing the `type` and `data` which we created in the action `populateLocations`.

```javascript
// LocationsReducer is automatically called by Redux when a dispatch occurs
var LocationsReducer = (state = {}, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {
        case 'ALL_LOCATIONS':

            newState = action.data.locations
            return newState;
            break;

        default:
            return state;
    }
}
```

### Help improve this

Although this is working for me, if you see anything that can be improved or a different method entirely, just pull and let me know what can be improved. This way I can do it properly the next time :)
