import React from 'react'
import { connect } from 'react-redux'
import { updateLocation } from '../actions/actions'
import { LS_COORDS_LAT, LS_COORDS_LON } from '../actions/contants'

class LocationRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            locationError: false
        }
        this.setTorontoLocation = this.setTorontoLocation.bind(this)
        this.setLsLocation = this.setLsLocation.bind(this)
    }
    componentDidMount() {
        this.requestLocation()
    }
    requestLocation() {
        const geoSuccess = position => {
            this.updateLocation(position['coords'])
        }
        const geoError = error => {
            this.setState({locationError: true})
        }
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        
    }
    updateLocation(coords) {
        localStorage.setItem(LS_COORDS_LAT, coords['latitude'])
        localStorage.setItem(LS_COORDS_LON, coords['longitude'])
        this.props.updateLocation({
            lon: coords['longitude'],
            lat: coords['latitude']
        })
    }
    lsLocationDetected() {
        return localStorage.getItem(LS_COORDS_LAT) && localStorage.getItem(LS_COORDS_LON)
    }
    setTorontoLocation() {
        this.props.updateLocation({
            lat: 43.6532,
            lon: -79.3832
        })
    }
    setLsLocation() {
        this.props.updateLocation({
            lat: localStorage.getItem(LS_COORDS_LAT),
            lon: localStorage.getItem(LS_COORDS_LON)
        })
    }
    render() {
        return (
            this.state.locationError ? 
            <div className="text-center">
                <h2>There's an error while retrieving your location. You might have denied access.</h2>
                {
                    this.lsLocationDetected() ?
                    <button className="btn btn-secondary mr-3 mb-2" onClick={this.setLsLocation}>Click here to use previously detected location</button>
                    : null
                }
                <button className="btn btn-secondary mb-2" onClick={this.setTorontoLocation}>Click here to get weather data of Toronto</button>
            </div>
            :
            <h1 className="text-center">Please allow location request.</h1>
        )
    }
}

export default connect(null, { updateLocation })(LocationRequest)
