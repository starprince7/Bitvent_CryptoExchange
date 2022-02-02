import React, { useState, useRef, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux'
import { fetchCrypto, setAmount, setCurrency, setCurrentPrice, setSellerGets } from '../../redux/crypto_data/actions'

function Step1(props) {
    const {
        previousStep,
        goToStep,
        nextStep,
        complete,
        crypto,
        fetchCrypto,
        _amount,
        _setAmount,
        currency,
        current_price,
        seller_gets,
        setCurrency,
        setSellerGets,
        setCurrentPrice,
    } = props

    const selectTagRef = useRef(null)
    // Component State
    const [counter, setCounter] = useState(30)
    const [selected_value, setSelectedValue] = useState('')
    const [amount, setAmount] = useState(0.03)
    const [coin_name, setCoinName] = useState('')
    const [coin_price, setCoinPrice] = useState(null)
    const [option_tag, setOptionTag] = useState('<option selected>Please wait...</option>')
    const [purchased_amount, setPurchasedAmount] = useState(null)


    useEffect(() => {
        // calculate the amount of "Money" that will be sent to a seller.
        const seller_gets = amount * coin_price
        setPurchasedAmount(seller_gets)

    }, [amount, coin_price])

    useEffect(() => {
        // Set d value of the select-tag to d state
        // To be displayed at summary below d form.
        setSelectedValue(selectTagRef.current.value)

        // Know the current selected currency of select-tag
        // so the appropriate currency-price can be displayed.
        window.addEventListener('load', () => {
            setTimeout(() => {
                const select_value = document.getElementById('currency_select').value
                setCoinName(select_value)
                console.log("Show me what is currently selected by the selected Tag <<<>>> ", select_value)
            }, 3000)
        })

        // Set Price for a selected coin currency.
        if (coin_name === 'BTC') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'BTC')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'ETH') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'ETH')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'USDT') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'USDT')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'LTC') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'LTC')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'BNB') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'BNB')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'SOL') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'SOL')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'DOGE') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'DOGE')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'XRP') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'XRP')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'SHIB') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'SHIB')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'ADA') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'ADA')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
        if (coin_name === 'MATIC') {
            const BTC = crypto?.find(coin => coin.USD.FROMSYMBOL === 'MATIC')
            console.log(BTC)
            setCoinPrice(BTC.USD.PRICE)
        }
    }, [coin_name])


    useEffect(() => {
        const optionList = crypto && crypto.map((coin, index) => (
            <option key={index} value={coin.USD.FROMSYMBOL}>{ coin.USD.FROMSYMBOL  }</option>
        ))
        setOptionTag(optionList)
    }, [crypto])

    const handle_sell_form_submission = (e) => {
        e.preventDefault()
        _setAmount(amount)
        setCurrency(coin_name)
        // Set amount to send to a 'SELLER'
        setSellerGets(purchased_amount)
        setCurrentPrice(coin_price)
        nextStep()
    }

    return (
        <form onSubmit={handle_sell_form_submission} className="currency_validate">
            <br />
            <div className="form-group">
                <div className="d-flex justify-content-between">
                    <label className="mr-sm-2">Currency</label>
                    <label className="mr-sm-2">Amount of {crypto && selected_value}</label>
                </div>
                {/* Select-Tag Group Start */}
                <div className="input-group mb-3">
                    <select ref={ selectTagRef } id="currency_select" value={coin_name } name='currency' className="form-control"
                        onChange={(e) => setCoinName(e.target.value)}>
                        { option_tag }
                    </select>
                    <input type="number" name="usd_amount" className="form-control text-right" value={ amount }
                        placeholder='0.03'
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                {/* Select-Tag Group -End- */}
            </div>

            <div className="form-group">
                <div className="d-flex justify-content-between mt-5 align-items-center">
                    <h6 className="mb-0">Summary</h6>
                    {/* <p className="mb-0">Price is valid for { counter }s</p> */}
                </div>
                <div className="d-flex justify-content-between mt-2 align-items-center">
                    <p className="mb-0">{ crypto && selected_value } price</p>
                    <h6 className="mb-0">${ coin_price || current_price }</h6>
                </div>
                <div className="d-flex justify-content-between mt-2 align-items-center">
                    <p className="mb-0">You get</p>
                    <h6 className="mb-0">
                        <CurrencyFormat
                            renderText={(value) => (
                                <span>{ value }</span>
                            )}
                            value={ coin_name && purchased_amount }
                            decimalScale={2}
                            fixedDecimalScale={true}
                            thousandSeparator={true}
                            displayType={"text"}
                            prefix='$'
                        /> </h6>
                </div>
            </div>
            <button  name="submit" className="btn btn-primary btn-block">
                Sell
                <i className="la la-arrow-right"></i>
            </button>

    </form>
  );
}

const mapStateToProps = (state) => {
    return {
        _amount: state.app_state.amount,
        crypto: state.app_state.crypto,
        currency: state.app_state.currency,
        seller_gets: state.app_state.seller_gets,
        current_price: state.app_state.current_price,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCrypto: () => dispatch(fetchCrypto()),
        _setAmount: (amount) => dispatch(setAmount(amount)),
        setSellerGets: (fiat) => dispatch(setSellerGets(fiat)),
        setCurrency: (currency) => dispatch(setCurrency(currency)),
        setCurrentPrice: (price) => dispatch(setCurrentPrice(price)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
