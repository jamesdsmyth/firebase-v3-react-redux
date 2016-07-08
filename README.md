# Firebase v3 with React using Redux as its store.

A walkthrough of how I managed to get Firebase v3 to play nice with React and Redux. This is a simple approach that involves dispatching an action once the data from Firebase has been received. This in turn passes the Firebase data to the Redux store which will then update the view automatically do to React'sway of dealing with life cycles.

*Setting up Firebase*

Adding the below code to the base of your `<body>` above any other JavaScript references in your `index.html` will initialise the call to the Firebase database. Just for ease for the demo, I have setup some dummy data in the database.

```html
<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
    <script>
    ```
    ```javascript
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD_JN46w3-L8UR6pEMVDLtGU4IdA8CnJaM",
        authDomain: "fir-react-redux-example.firebaseapp.com",
        databaseURL: "https://fir-react-redux-example.firebaseio.com",
        storageBucket: "",
    };
    ```
    ```javascript
    firebase.initializeApp(config);
    ```
```html
</script>
```

*Getting the data from Firebase*

After setting up the `Redux store` you need to dispatch an action that passes the `snapshot.val()` to the `action creator` and in turn dispatches the object to the reducers. Please note I am using ES6 arrow functions which means you need to be using a transpiler such as [Babel](https://babeljs.io/).

```javascript
import { createStore, combineReducers } from 'redux'

var Reducer = combineReducers({
    beers: BeerReducer,
    beerTypes: BeerTypesReducer,
    beerStyles: BeerStylesReducer,
    locations: LocationsReducer,
    shortLocations: ShortLocationsReducer,
    boroughs: BoroughsReducer,
    countries: CountriesReducer
});

var Store = createStore(Reducer);

firebase.database().ref('/').once('value').then((snapshot) => {
    Store.dispatch(actions.populateLocations(snapshot.val()));
});

function populateLocations (data) {
    return {
        type: 'ALL_LOCATIONS',
        data: data
    }
}
```

```javascript
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

export default LocationsReducer
```
