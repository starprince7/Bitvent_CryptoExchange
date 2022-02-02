import axios from 'axios'
import Price from 'crypto-price'
import {
    SET_ERROR,
    SET_CRYPTO,
    SET_AMOUNT,
    SET_CURRENCY,
    SET_CUSTOMER,
    SET_BUYER_GETS,
    SET_SELLER_GETS,
    SET_CURRENT_PRICE,
    SET_WALLET_ADDRESS,
} from './actionTypes'

function setError(error) {
    return {
        type: SET_ERROR,
        payload: error
    }
}

function setCrypto (data) {
    return {
        type: SET_CRYPTO,
        payload: data
    }
}

function setCustomer(customer) {
    return {
        type: SET_CUSTOMER,
        payload: customer
    }
}

export const setCurrency = (currency) => {
    return {
        type: SET_CURRENCY,
        payload: currency
    }
}

export const setAmount = (amount) => {
    return {
        type: SET_AMOUNT,
        payload: amount
    }
}

export const setCurrentPrice = (price) => {
    return {
        type: SET_CURRENT_PRICE,
        payload: price
    }
}

export const setSellerGets = (fiat) => {
    return {
        type: SET_SELLER_GETS,
        payload: fiat
    }
}

export const setBuyerGets = (crypto) => {
    return {
        type: SET_BUYER_GETS,
        payload: crypto
    }
}

export const setWalletAddress = (address) => {
    return {
        type: SET_WALLET_ADDRESS,
        payload: address
    }
}

// Submit Verification code.
export const submitVerificationCode = (code, cb) => {
    console.log('Actions File COde came', code)
    return async (dispatch, getState) => {
        console.log('State Object From ActionCreator <<>>>', getState())
        
        const { customer } = getState().app_state
        const email = customer.email

        let options = { email, verification_code: code }

        console.log(options)
        
        try {
            const res = await axios.post('/api/email-verification', options)
            if (res.data.error) {
                dispatch(setError(res.data.error))
                cb(res.data.error, null)
            }
            if (res.data.customer) {
                dispatch(setCustomer(res.data.customer))
                cb(null, res.data.customer)
            }
        } catch (e) {
            cb(e, null)
            console.log("ERROR SUBMITTING VERIFICATION CODE", e)
        }
    }
}

export const submitVerificationCode2 = (code, cb) => {
    console.log('Actions File COde came', code)
    return function(dispatch, getState) {
        console.log('Actions File COde came', code)
        console.log('State Object From ActionCreator <<>>>', getState())
        
        const { customer } = getState().app_state
        const email = customer.email

        let options = { email, verification_code: code }

        console.log(options)
        
        
        axios.post('/api/email-verification', options)
        .then(res => {
            if (res.data.error) {
                dispatch(setError(res.data.error))
                cb(res.data.error, null)
            }
            dispatch(setCustomer(res.data.customer))
            cb(null, res.data.customer)
        })
        .catch(e => {
            cb(e, null)
            console.log("ERROR SUBMITTING VERIFICATION CODE", e)
        })
    }
}

export const createSellTransaction = (email, cb) => {
    return async (dispatch, getState) => {
        const { currency, amount, seller_gets, current_price } = getState().app_state

        let options = {
            email,
            amount,
            currency,
            seller_gets,
            current_price
        }

        try {
            const res = await axios.post('/api/create_sell_transaction', options)
            res && console.log('Create_transaction Response!', res)
            if (res.data.error) {
                dispatch(setError(res.data.error))
                cb(res.data.error, null)
            }
            if (res.data.customer) {
                dispatch(setCustomer(res.data.customer))
                cb(null, res.data.customer)
            }
        } catch (e) {
            cb(e, null)
            console.log('ERROR COULD NOT CREATE SELL TRANSACTION', e)
        }
    }
}

export const createBuyTransaction = (email, cb) => {
    return async (dispatch, getState) => {
        const { currency, amount, buyer_gets, current_price, wallet_address } = getState().app_state

        let options = {
            email,
            amount,
            currency,
            buyer_gets,
            current_price,
            wallet_address
        }

        try {
            const res = await axios.post('/api/create_buy_transaction', options)
            res && console.log('Create_transaction Response!', res)
            if (res.data.error) {
                dispatch(setError(res.data.error))
                cb(res.data.error, null)
            }
            if (res.data.customer) {
                dispatch(setCustomer(res.data.customer))
                cb(null, res.data.customer)
            }
        } catch (e) {
            cb(e, null)
            console.log('ERROR COULD NOT CREATE SELL TRANSACTION', e)
        }
    }
}

export const fetchCrypto2 = () => {
    return (dispatch) => {
        let crypto = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'LTC', 'SOL', 'SHIB', 'MATIC', 'DOGE', 'USDT']
        let crypto_coins = []

        crypto.forEach( async (coin) => {
            try {
                const coin_price = await Price.getCryptoPrice('USD', coin)
                // dispatch coin_price object "{ }" here.
                coin_price && dispatch(setCrypto(coin_price))
                
            } catch (e) {
                console.log(`Error Fetching Crypto Prices for ${coin}`, e)
            }
        })

    }
}

// PROTO-TYPE NEW TEST
export const fetchCrypto = () => {
    return async (dispatch) => {
        let url =
        'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,USDT,LTC,SOL,ADA,XRP,ADA,DOGE&tsyms=USD&api_key=0ec893e5046f6864fcb47ad553dde60a5a6d050cd69397b0fba034cf9fe95a21'

        try {
            const res = await axios.get(url)
            res && console.log('API Crypto Compare Stats <<>>>', res.data.RAW)
            const { ADA, BNB, BTC, ETH, LTC, SOL, USDT, XRP, DOGE } = res.data.RAW
            let crypto_data = [BTC, ETH, USDT, BNB, ADA, LTC, SOL, XRP, DOGE]
            
            dispatch(setCrypto(crypto_data))
        } catch (e) {
            console.log('ERR Fetching crypto data & prices...', e)
        }
    }
}
