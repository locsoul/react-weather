import React from 'react'
import { parseForecastData } from '../utils'
import ForecastItem from './ForecastItem'

class Forecast extends React.Component {
    renderForecastData() {
        let current_date = null
        
        return Object.entries(this.props.data).map(([key, date_data]) => {
            const res = parseForecastData(date_data)
            let date_render = null
            if (current_date !== res.date) {
                current_date = res.date
                date_render = <h4 key={"h-"+key} className="bg-light p-2 m-0">{current_date}</h4>
            }
            return [
                date_render,
                <ForecastItem key={"fi" + key} {...res} />
            ]
        })
    }

    render() {
        return (<div>
            <h1 className="mb-4">5 days weather forecast</h1>
            {
                !this.props.data ?
                (
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )
                : this.renderForecastData() 
            }
        </div>
        )
    }
}

export default Forecast