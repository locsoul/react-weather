import React from 'react'
import ForecastItem from './ForecastItem'
import renderer from 'react-test-renderer'

let Component

const testData = {
    icon_alt: "clear sky",
    cloudiness: "not clear",
}

beforeEach(() => {
    Component = renderer.create(
        <ForecastItem {...testData} />
    )
})

it('should match snapshot', () => {
    expect(Component.toJSON()).toMatchSnapshot()
    expect(Component.root.findByType('img').props.alt).toBe(testData['icon_alt'])
    expect(Component.root.findByType('span').props.children).toBe(testData['cloudiness'])
})