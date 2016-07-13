import React from 'react'
import { connect } from 'react-redux'

class LocationsContainerView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillReceiveProps (props) {
        console.log('recieving props');
        this.setState({
            locations: props.locations
        });
    }

    pushLocation () {
        firebase.database().ref('/locations').push({
            name: document.getElementById('name').value,
            postCode: document.getElementById('postCode').value,
            street: document.getElementById('street').value
        });
    }

    render () {

        // saving the state locations as a variable to make it easier to reference later on
        var locations = this.state.locations;

        // to demonstrate that we have got the firebase data we will construct a table.
        // here we are iterating through each object and creating a table row.
        // notice 'Object.keys(locations || {})' - the empty brackets are there as a fall back for when we have
        // no data to iterate through. This will prevent React from throwing an error. Once Firebase has returned the data,
        // the render will occur again with the 'locations' variable populated.
        var locationTableContent = Object.keys(locations || {}).map(function (item, i) {
            return <tr key={i}>
                <td>
                    {locations[item].name}
                </td>
                <td>
                    {locations[item].postCode}
                </td>
                <td>
                    {locations[item].street}
                </td>
            </tr>
        });

        return (
            <main>
                <h1>Firebase v3 React Redux</h1>
                <section>
                    <h2>Create a location</h2>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input type="text" id="name" />
                    <label htmlFor="postCode">
                        Postcode:
                    </label>
                    <input type="text" id="postCode" />
                    <label htmlFor="street">
                        Street:
                    </label>
                    <input type="text" id="street" />
                    <button type="submit" onClick={() => this.pushLocation()}>Create location</button>
                </section>
                <section>
                    <h2>Location list</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Postcode
                                </th>
                                <th>
                                    Street
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {locationTableContent}
                        </tbody>
                    </table>
                </section>
            </main>
        )
    }
}

var mapStateToProps = (state) => {

    return {
        locations: state.locations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
