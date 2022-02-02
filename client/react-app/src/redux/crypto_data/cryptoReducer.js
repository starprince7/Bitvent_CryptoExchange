// import action types
import {
    SET_ERROR,
    SET_CRYPTO,
    SET_CUSTOMER,
    SET_AMOUNT,
    SET_CURRENCY,
    SET_SELLER_GETS,
    SET_BUYER_GETS,
    SET_CURRENT_PRICE,
    SET_WALLET_ADDRESS
} from './actionTypes'

// initialize state
const initialState = {
    crypto: [],
    amount: null,
    currency: null,
    current_price: null,
    wallet_address: null,
    seller_gets: null,
    buyer_gets: null,
    customer: null,
    error: null
};

const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR: return {
            ...state,
            error: [...state.crypto, action.payload]
        }
        case SET_CRYPTO: return {
            ...state,
            crypto: action.payload
        }
        case SET_AMOUNT: return {
            ...state,
            amount: action.payload
        }
        case SET_CURRENCY: return {
            ...state,
            currency: action.payload
        }
        case SET_CURRENT_PRICE: return {
            ...state,
            current_price: action.payload
        }
        case SET_SELLER_GETS: return {
            ...state,
            seller_gets: action.payload
        }
        case SET_BUYER_GETS: return {
            ...state,
             buyer_gets: action.payload
        }
        case SET_WALLET_ADDRESS: return {
            ...state,
             wallet_address: action.payload
        }
        case SET_CUSTOMER: return {
            ...state,
            customer: action.payload
        }
        default:
            return state
    }
}

export default cryptoReducer;