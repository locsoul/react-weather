import React from 'react'
import renderer from 'react-test-renderer'
import Dashboard from './Dashboard'
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"

const initialState = {
    app: {
        weather: {
            humidity:'78',
            humidity_unit:'%',
            wind_state:'Moderate breeze',
            wind_speed:'6.7',
            wind_unit:'m/s',
            wind_dir:'East-northeast',
            cloudiness:'clear sky',
            pressure:'1019',
            pressure_unit:'hPa',
            tzDiff:-14400,
            sunrise: new Date('2019-09-21T15:02:38.000Z'),
            sunset: new Date('2019-09-22T03:17:26.000Z'),
            lastUpdated: new Date('2019-09-22T01:31:03.000Z'),
            cords_lon:'-72.21',
            cords_lat:'42.75',
            icon:'01d',
            city:'Toronto',
            country:'CA',
            value:'clear sky',
            current_temp:'25.11',
            temp_unit:'C'
        }
    }
}
const mockStore = configureStore()

let store
let Component

beforeEach(() => {
    store = mockStore(initialState)
    store.dispatch = jest.fn()

    Component = renderer.create(
        <Provider store={store}>
            <Dashboard />
        </Provider>
    )
})

it('should match snapshot', () => {
    expect(Component.toJSON()).toMatchSnapshot()
})
