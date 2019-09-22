import React from "react";
import Forecast from "./Forecast";
import { connect } from 'react-redux'
import { loadWeatherData, loadForecastData } from "../actions/actions";
import { WEATHER_BIG_SYMBOL_LINK } from "../config";
import { getDateWithTimezone } from "../utils";
import { DATE_FORMAT_TIME } from "../actions/contants";

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.refreshData = this.refreshData.bind(this)
        this.refreshBtnClicked = false
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        this.props.loadWeatherData(this.props.location)
        this.props.loadForecastData(this.props.location)
    }
    refreshData() {
        this.loadData()
        this.refreshBtnClicked = true
    }
    renderDetailedTable(data) {
        return (
            <table className="table table-striped table-bordered" key="detailed-table">
                <tbody>
                    <tr>
                        <th>Wind</th>
                        <td>
                            {data.wind_state}, {data.wind_speed}
                            {data.wind_unit}, {data.wind_dir}
                        </td>
                    </tr>
                    <tr>
                        <th>Cloudiness</th>
                        <td>{data.cloudiness}</td>
                    </tr>
                    <tr>
                        <th>Pressure</th>
                        <td>
                            {data.pressure} {data.pressure_unit}
                        </td>
                    </tr>
                    <tr>
                        <th>Humidity</th>
                        <td>{data.humidity}{data.humidity_unit}</td>
                    </tr>
                    <tr>
                        <th>Sunrise</th>
                        <td>{getDateWithTimezone(data.sunrise, this.props.weatherData.tzDiff, DATE_FORMAT_TIME)}</td>
                    </tr>
                    <tr>
                        <th>Sunset</th>
                        <td>{getDateWithTimezone(data.sunset, this.props.weatherData.tzDiff, DATE_FORMAT_TIME)}</td>
                    </tr>
                    <tr>
                        <th>Geo coords</th>
                        <td>
                            {data.cords_lon} {data.cords_lat}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    renderWidget() {
        const symbol_link = WEATHER_BIG_SYMBOL_LINK.replace('{icon}', this.props.weatherData.icon)
        return (
            <div>
                <div className="row align-items-center">
                    <div className="main_icon"><img src={symbol_link} alt={this.props.weatherData.icon_alt} title={this.props.weatherData.icon_alt} /></div>
                    <div>
                        <div className="d-inline-block main_temperature">{this.props.weatherData.current_temp} °{this.props.weatherData.temp_unit}</div>
                        <div><strong>{this.props.weatherData.cloudiness}</strong></div>
                    </div>
                </div>
                <p>Last updated on { getDateWithTimezone(this.props.weatherData.lastUpdated, this.props.weatherData.tzDiff) }</p>
            </div>
        )
    }
    renderCurrentWeather(data) {
        if (!data) 
            return [
                <div key="widget">
                    <h1>
                        Current Weather
                    </h1>
                </div>,
                <div className="spinner-border text-secondary" role="status" key="w-loading">
                    <span className="sr-only">Loading...</span>
                </div>
            ]
            
        const isLoading = this.props.loadingWeather || this.props.loadingForecast
        return [
            <div key="widget">
                <h1>
                    Current Weather in {data.city}, {data.country}
                </h1>
                { this.renderWidget() }
            </div>,
            this.renderDetailedTable(data),
            <div className="text-center mb-5" key="reload-btn">
                <button className="btn btn-primary" onClick={this.refreshData} disabled={isLoading ? 'disabled':''}>
                    {
                        isLoading ? 'Refreshing...' : 'Refresh data'
                    }
                </button>
                {
                    isLoading || !this.refreshBtnClicked ? '' : <div className="mt-3 fadeout">Latest weather data loaded!</div>
                }
            </div>
        ]
    }
    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 px-4">
                    { this.renderCurrentWeather(this.props.weatherData) }
                </div>
                <div className="col-12 col-md-7 px-4">
                    <Forecast data={this.props.forecastData} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.app.weather,
        forecastData: state.app.forecast,
        loadingWeather: state.app.loadingWeather,
        loadingForecast: state.app.loadingForecast,
        location: state.app.location
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadWeatherData: (coords) => dispatch(loadWeatherData(coords)),
        loadForecastData: (coords) => dispatch(loadForecastData(coords)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
