import React from 'react'
import { connect } from 'react-redux'

class LocationsContainerView extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            overlay: false
        }
    }

    // when Firebase returns the data, we set it in the state
    componentWillReceiveProps (props) {

        this.setState({
            locations: props.locations
        });
    }

    // Add location to database
    pushLocation () {

        var nameInput = document.getElementById('name'),
            postcodeInput = document.getElementById('postCode'),
            streetInput = document.getElementById('street');

        if((nameInput.value !== '') && (postcodeInput.value !== '') && (streetInput.value !== '')) {
            var newLocation = {
                name: nameInput.value,
                postCode: postcodeInput.value,
                street: streetInput.value
            }

            firebase.database().ref('/locations').push(newLocation, function () {
                nameInput.value = null;
                postcodeInput.value = null;
                streetInput.value = null;
            });
        }

        return false;
    }

    // toggle the overlay to edit the location
    toggleUpdateLocationOverlay (ref, location) {

        // showing the overlay and setting a reference to the location key
        this.setState({
            overlay: true,
            currentLocation: ref
        });

        setTimeout(() => {
            document.getElementById('edit-name').value = location.name;
            document.getElementById('edit-postCode').value = location.postCode;
            document.getElementById('edit-street').value = location.street;
        }, 250)
    }

    // remove location in database
    updateLocation () {

        var newData = {
            name: document.getElementById('edit-name').value,
            postCode: document.getElementById('edit-postCode').value,
            street: document.getElementById('edit-street').value
        }

        if((newData.name !== '') && (newData.postCode !== '') && (newData.street !== '')) {
            var updatedLocation = {};
                updatedLocation['/locations/' + this.state.currentLocation] = newData;

            firebase.database().ref().update(updatedLocation);

            // hiding the overlay
            this.setState({
                overlay: false
            });
        }
    }

    // clicking on the big 'x' on the overlay will close the overlay
    cancelUpdateLocation () {
        this.setState({
            overlay: false
        });
    }

    // remove location from database
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
                    <button type="button"
                            className="button positive"
                            onClick={() => this.toggleUpdateLocationOverlay(item, locations[item])}>
                        Edit
                    </button>
                </td>
                <td>
                    {Object.keys(locations).length > 5 ?
                        <button type="button"
                                className="button negative"
                                onClick={() => this.removeLocation(item)}>
                            Remove
                        </button>
                        : null}
                </td>
            </tr>
        }.bind(this));

        return (
            <div>
                <main className="main">
                    <h1 className="title">
                        Firebase v3 React Redux
                    </h1>
                    <section className="block">
                        <h2 className="sub-title">Create a location</h2>
                        <p>All fields are required</p>
                        <form>
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
                            <button type="button"
                                    className="button positive"
                                    onClick={() => this.pushLocation()}>
                                Create
                            </button>
                        </form>
                    </section>
                    <section className="block">
                        <h2 className="sub-title">Location list</h2>
                        <table className="table">
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
                                        Edit
                                    </th>
                                    <th>
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {locationTableContent}
                            </tbody>
                        </table>
                    </section>
                </main>
                {this.state.overlay === true ?
                    <section className="overlay">
                        <div className="container">
                            <h2 className="sub-title">Edit the location</h2>
                            <p>All fields are required</p>
                            <form>
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
                                <button type="button"
                                        className="button positive"
                                        onClick={() => this.updateLocation()}>
                                    Update
                                </button>
                            </form>
                        </div>
                        <button type="button"
                                className="button close"
                                onClick={() => this.cancelUpdateLocation()}>
                            x
                        </button>
                    </section>
                : null }
            </div>
        )
    }
}

// using mapStateToProps to get the store into the page
var mapStateToProps = (state) => {

    return {
        locations: state.locations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
