export const WEATHER_SYMBOL_LINK = "//openweathermap.org/img/wn/{icon}.png"
export const WEATHER_BIG_SYMBOL_LINK = "//openweathermap.org/img/wn/{icon}@2x.png"
export const DEFAULT_LOCALE = 'en-US'

export const API_KEY = '270ad84b00dc757f1cee01c5b7df92a5'
export const API_ENDPOINT_PREFIX = '//api.openweathermap.org/data/2.5/'
export const API_ENDPOINT_WEATHER = API_ENDPOINT_PREFIX + 'weather?lat={lat}&lon={lon}&mode=xml&units=metric&appid=' + API_KEY
export const API_ENDPOINT_FORECAST = API_ENDPOINT_PREFIX + 'forecast?lat={lat}&lon={lon}&mode=xml&units=metric&appid=' + API_KEY
