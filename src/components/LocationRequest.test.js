import React from "react";
import { Provider } from "react-redux"
import renderer from 'react-test-renderer'
import configureStore from "redux-mock-store"
import LocationRequest from "./LocationRequest"

const initialState = {}
const mockStore = configureStore()

let store
let Component

const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
            success({
                coords: {
                    latitude: -72,
                    longitude: 46
                }
            })
        )
    )
}

beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    Component = renderer.create(
        <Provider store={store}>
            <LocationRequest />
        </Provider>
    );
});

global.navigator.geolocation = mockGeolocation

it('should match snapshot', () => {
    expect(Component.toJSON()).toMatchSnapshot()
    expect(Component.root.findByType('h1').props.children).toBe("Please allow location request.")
})
