// import action types
import {
    SET_CRYPTO
} from './actionTypes'

// initialize state
const initialState = {
    crypto: [],
};

const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CRYPTO: return {
            ...state,
            crypto: [...state.crypto, action.payload]
        }
        default:
            return state
    }
}

export default cryptoReducer;