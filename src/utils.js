import _get from 'lodash.get'
import { DEFAULT_LOCALE } from './config'
import { DATE_FORMAT_DATE, DATE_FORMAT_TIME } from './actions/contants'

const getTemparatureSymbol = (unit) => {
    if (unit) return unit[0].toUpperCase()
    return null
}

/**
 * Utility to format a Date with given timezone and format
 * 
 * @param {Date} date 
 * @param {int} millisecondDiff 
 * @param {string} format (DATE_FORMAT_DATE, DATE_FORMAT_TIME)
 */
export const getDateWithTimezone = (date, millisecondDiff, format) => {
    const newDate = new Date(date.getTime() + millisecondDiff * 1000)
    switch (format) {
        case DATE_FORMAT_DATE:
            return newDate.toLocaleDateString(DEFAULT_LOCALE)
        case DATE_FORMAT_TIME:
            return newDate.toLocaleTimeString(DEFAULT_LOCALE)
        default:
            return newDate.toLocaleString(DEFAULT_LOCALE)
    }
}

/**
 * Replace lat/lon values from given link based on given coords
 * 
 * @param {*} link 
 * @param {*} coords 
 */
export const replaceCoordsInLink = (link, coords) => {
    return link.replace('{lat}', coords['lat']).replace('{lon}', coords['lon'])
}

/**
 * Parses weather data from JSON
 * Uses lodash.get for attribute error handling
 * 
 * @param {*} data 
 */
export const parseWeatherData = (data) => {
    let res = {}
    res.humidity = _get(data, 'humidity._attributes.value', 'n/a')
    res.humidity_unit = _get(data, 'humidity._attributes.unit', '')

    res.wind_state = _get(data, 'wind.speed._attributes.name', 'n/a')
    res.wind_speed = _get(data, 'wind.speed._attributes.value', '')
    res.wind_unit = _get(data, 'wind.speed._attributes.unit', '')
    res.wind_dir = _get(data, 'wind.direction._attributes.name', 'n/a')

    res.cloudiness = _get(data, 'clouds._attributes.name', 'n/a')
    res.pressure = _get(data, 'pressure._attributes.value', 'n/a')
    res.pressure_unit = _get(data, 'pressure._attributes.unit', '')

    res.tzDiff = parseInt(_get(data, 'city.timezone._text', 0))
    res.sunrise = new Date(_get(data, 'city.sun._attributes.rise'))
    res.sunset = new Date(_get(data, 'city.sun._attributes.set'))
    res.lastUpdated = new Date(_get(data, 'lastupdate._attributes.value'))

    res.cords_lon = _get(data, 'city.coord._attributes.lon', 'n/a')
    res.cords_lat = _get(data, 'city.coord._attributes.lat', 'n/a')

    res.icon = _get(data, 'weather._attributes.icon', null)
    res.city = _get(data, 'city._attributes.name', null)
    res.country = _get(data, 'city.country._text', null)
    res.value = _get(data, 'weather._attributes.value', null)
    res.current_temp = _get(data, 'temperature._attributes.value', null)
    res.temp_unit = getTemparatureSymbol(_get(data, 'temperature._attributes.unit', null))

    return res
}

/**
 * Parse forecast data from JSON
 * Uses lodash.get for attribute error handling
 * 
 * @param {*} data 
 */
export const parseForecastData = (data) => {
    let res = {}

    const datetime = _get(data, '_attributes.from')
    const date = new Date(datetime)

    res.date = date.toLocaleDateString(DEFAULT_LOCALE)
    res.time = date.toLocaleTimeString(DEFAULT_LOCALE)

    res.icon = _get(data, 'symbol._attributes.var')
    res.icon_alt = _get(data, 'symbol._attributes.name')

    res.current_temp = _get(data, 'temperature._attributes.value', null)
    res.temp_unit = getTemparatureSymbol(_get(data, 'temperature._attributes.unit', null))

    res.cloudiness = _get(data, 'clouds._attributes.value', 'n/a')

    return res
}
