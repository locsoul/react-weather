import {
    UPDATE_WEATHER_DATA,
    UPDATE_FORECAST_DATA,
    UPDATE_FORECAST_LOADING_STATE,
    UPDATE_WEATHER_LOADING_STATE,
    UPDATE_LOCATION
} from "../actions/contants"

const initialState = {
    weather: null,
    forecast: null,
    loadingWeather: true,
    loadingForecast: true,
    location: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_WEATHER_DATA:
            return Object.assign({}, state, {
                weather: action.payload
            })

        case UPDATE_FORECAST_DATA:
            return Object.assign({}, state, {
                forecast: action.payload
            })

        case UPDATE_FORECAST_LOADING_STATE:
            return Object.assign({}, state, {
                loadingForecast: action.payload
            })

        case UPDATE_WEATHER_LOADING_STATE:
            return Object.assign({}, state, {
                loadingWeather: action.payload
            })

        case UPDATE_LOCATION:
            return Object.assign({}, state, {
                location: action.payload
            })

        default:
            return state
    }
}
