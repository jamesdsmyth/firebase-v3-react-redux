import React from 'react'
import { connect } from 'react-redux'

class LocationsContainerView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillReceiveProps (props) {
        this.setState({
            locations: props.locations
        });
    }

    render () {

        var bbb = this.state.locations;
        console.log('RENDERING');
        console.log(this.state);
        return (
            <div>
                <h1>
                    Blahhhhh
                </h1>
            </div>
        )
    }
}

var mapStateToProps = (state) => {

    console.log(state)
    return {
        locations: state.locations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
