import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk'
import AppReducer from './app'

const rootReducer = combineReducers({
    app: AppReducer,
});

// support redux dev tool in dev mode
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
