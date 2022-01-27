import Price from 'crypto-price'
import {
    SET_CRYPTO
} from './actionTypes'

function setCrypto (data) {
    return {
        type: SET_CRYPTO,
        payload: data
    }
}

export const fetchCrypto = () => {
    return (dispatch) => {
        let crypto = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'LTC', 'SOL', 'SHIB', 'MATIC', 'DOGE']
        let crypto_coins = []

        crypto.forEach( async (coin) => {
            try {
                const coin_price = await Price.getCryptoPrice('USD', coin)
                // dispatch coin_price object "{ }" here.
                dispatch(setCrypto(coin_price))
                
            } catch (e) {
                console.log(`Error Fetching Crypto Prices for ${coin}`, e)
            }
        })

    }
}