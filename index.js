require('./styles/styles.scss');

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import LocationsContainerView from './containers/LocationsContainer.jsx'
import Store from './reducers/CombinedReducers.jsx'
import FirebaseRef from './data/FirebaseRef.jsx'

// calling the FirebaseRef() to interact with the database and retrieve the data we request
FirebaseRef();

render ((
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={LocationsContainerView} />
        </Router>
    </Provider>
), document.getElementById('firebase-app'));
