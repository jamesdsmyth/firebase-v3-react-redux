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
        }, function () {
            document.getElementById('name').value = null;
            document.getElementById('postCode').value = null;
            document.getElementById('street').value = null;
        });
    }

    updateLocation (ref) {
        var newData = {
            name: document.getElementById('edit-name').value,
            postCode: document.getElementById('edit-postCode').value,
            street: document.getElementById('edit-street').value
        }

        var updatedLocation = {};
            updatedLocation['/locations/' + ref] = newData;

        firebase.database().ref().update(updatedLocation);
    }

    removeLocation (ref) {
        firebase.database().ref('/locations/' + ref).remove();
    }

    render () {

        // saving the state locations as a variable to make it easier to reference later on
        var locations = this.state.locations || {}

        // to demonstrate that we have got the firebase data we will construct a table.
        // here we are iterating through each object and creating a table row.
        // notice 'Object.keys(locations || {})' - the empty brackets are there as a fall back for when we have
        // no data to iterate through. This will prevent React from throwing an error. Once Firebase has returned the data,
        // the render will occur again with the 'locations' variable populated.
        var locationTableContent = Object.keys(locations).map(function (item, i) {
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
                <td>
                    <button type="button" onClick={() => this.updateLocation(item)}>
                        Edit location
                    </button>
                </td>
                <td>
                    {Object.keys(locations).length > 5 ?
                        <button type="button" onClick={() => this.removeLocation(item)}>
                            Remove location
                        </button>
                        : null}

                </td>
            </tr>
        }.bind(this));

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
                    <button type="submit" onClick={() => this.pushLocation()}>
                        Create location
                    </button>
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
                                <th>
                                    Edit location
                                </th>
                                <th>
                                    Remove location
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {locationTableContent}
                        </tbody>
                    </table>
                </section>
                <section className="overlay">
                    <h2>Edit the location</h2>
                    <label htmlFor="edit-name">
                        Name:
                    </label>
                    <input type="text" id="edit-name" />
                    <label htmlFor="edit-postCode">
                        Postcode:
                    </label>
                    <input type="text" id="edit-postCode" />
                    <label htmlFor="edit-street">
                        Street:
                    </label>
                    <input type="text" id="edit-street" />
                    <button type="button" onClick={() => this.updateLocation()}>
                        Edit location
                    </button>
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
