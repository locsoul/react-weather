import axios from 'axios'
import convert from 'xml-js';
import { API_ENDPOINT_WEATHER, API_ENDPOINT_FORECAST } from '../config';
import { parseWeatherData, replaceCoordsInLink } from '../utils';
import { 
    UPDATE_WEATHER_DATA,
    UPDATE_FORECAST_DATA,
    UPDATE_WEATHER_LOADING_STATE,
    UPDATE_FORECAST_LOADING_STATE,
    UPDATE_LOCATION,
} from "./contants";

export const loadWeatherData = (coords) => {
    return dispatch => {
        dispatch ({
            type: UPDATE_WEATHER_LOADING_STATE,
            payload: true
        })
        axios.get(replaceCoordsInLink(API_ENDPOINT_WEATHER, coords)).then((res) => {
            const json = convert.xml2js(res.data, {compact:true})
            const parsed_data = parseWeatherData(json['current'])

            // this is to match with requirements saying 'stores the data in a client-side "store"'
            // not sure the mentioned "store" is redux store or local storage
            localStorage.setItem('weather_data', JSON.stringify(parsed_data))

            dispatch ({
                type: UPDATE_WEATHER_DATA,
                payload: parsed_data
            })
        }).finally(() => {
            dispatch ({
                type: UPDATE_WEATHER_LOADING_STATE,
                payload: false
            })
        })
    }
}

export const loadForecastData = coords => {
    return dispatch => {
        dispatch ({
            type: UPDATE_FORECAST_LOADING_STATE,
            payload: true
        })
        axios.get(replaceCoordsInLink(API_ENDPOINT_FORECAST, coords)).then((res) => {
            const json = convert.xml2js(res.data, {compact:true})

            // this is to match with requirements saying 'stores the data in a client-side "store"'
            // not sure the mentioned "store" is redux store or local storage
            localStorage.setItem('forecast_data', JSON.stringify(json))

            dispatch ({
                type: UPDATE_FORECAST_DATA,
                payload: json['weatherdata']['forecast']['time']
            })
        }).finally(() => {
            dispatch ({
                type: UPDATE_FORECAST_LOADING_STATE,
                payload: false
            })
        })
    }
}

export const updateLocation = (coords) => ({
    type: UPDATE_LOCATION,
    payload: coords
})
