import { combineReducers } from 'redux'
import StateReducer from './app_state/stateReducer'
import cryptoReducer from './crypto_data/cryptoReducer'

const rootReducer = combineReducers({
    dashboard_state: StateReducer,
    app_state: cryptoReducer
})

export default rootReducer;