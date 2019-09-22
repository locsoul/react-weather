import React from 'react'
import ReactDOM from 'react-dom'
import store from './reducers/index'
import { Provider, connect } from 'react-redux'
import Dashboard from './components/Dashboard'
import LocationRequest from './components/LocationRequest'

import './common.css'

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid py-4 bg-white">
                {
                    this.props.location ? 
                    <Dashboard /> :
                    <LocationRequest />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        location: state.app.location
    }
}

const MainApp = connect(mapStateToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <MainApp />
    </Provider>, 
    document.getElementById('app')
)
