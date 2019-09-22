import React from 'react'
import { WEATHER_SYMBOL_LINK } from '../config'

class ForecastItem extends React.Component {
    render() {
        const symbol_link = WEATHER_SYMBOL_LINK.replace('{icon}', this.props.icon)
        return (
            <div className="row border-top mx-0 align-items-center">
                <div className="col-3">{this.props.time}</div>
                <div className="col-9">
                    <div>
                        <img src={symbol_link} alt={this.props.icon_alt} />
                        <div className="w-25 d-inline-block">{this.props.current_temp} °{this.props.temp_unit}</div>
                        <span className="ml-5">{this.props.cloudiness}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForecastItem