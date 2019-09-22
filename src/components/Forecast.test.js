import React from 'react'
import Forecast from './Forecast'
import renderer from 'react-test-renderer'

let Component

beforeEach(() => {
    Component = renderer.create(
        <Forecast />
    );
})

it('should match snapshot', () => {
    expect(Component.toJSON()).toMatchSnapshot()
})
