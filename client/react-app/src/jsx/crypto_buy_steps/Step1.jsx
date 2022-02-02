import React, { useState, useRef, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux'
import { fetchCrypto, setBuyerGets, setAmount, setCurrentPrice, setWalletAddress, setCurrency } from '../../redux/crypto_data/actions'

function Step1(props) {

    const {
        goToStep,
        nextStep,
        complete,
        previousStep,
        crypto,
        fetchCrypto,
        _setAmount,
        setCurrency,
        setBuyerGets,
        setCurrentPrice,
        setWalletAddress,
    } = props

    const selectTagRef = useRef(null)
    // Component State
    const [counter, setCounter] = useState(30)
    const [selected_value, setSelectedValue] = useState('')
    const [amount, setAmount] = useState(300)
    const [coin_name, setCoinName] = useState('')
    const [coin_price, setCoinPrice] = useState(null)
    const [option_tag, setOptionTag] = useState('<option selected>Please wait...</option>')
    const [purchased_amount, setPurchasedAmount] = useState(null)
    const [wallet_address, _setWalletAddress] = useState('')


    useEffect(() => {
        // calculate the amount of crypto that will be sent to a buyer
        const buyer_gets = amount / coin_price
        setPurchasedAmount(buyer_gets)

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

        /*  setBuyerGets, setAmount, setCurrentPrice, setWalletAddress, setCurrency  */

    const handle_form_submit = e => {
        e.preventDefault()
        _setAmount(amount)
        setCurrency(coin_name)
        setWalletAddress(wallet_address)
        // Set amount of crypto to send to a "BUYER"
        setBuyerGets(purchased_amount)
        setCurrentPrice(coin_price)
        nextStep()
    }

    return (
        <form onSubmit={handle_form_submit} className="currency_validate">
            <br />
            <div className="form-group">
                <div className="d-flex justify-content-between">
                    <label className="mr-sm-2">Currency</label>
                    <label className="mr-sm-2">Amount ($)</label>
                </div>
                {/* Select-Tag Group Start */}
                <div className="input-group mb-3">
                    <select ref={ selectTagRef } id="currency_select" name='currency' className="form-control"
                        onChange={(e) => setCoinName(e.target.value)}>
                        { option_tag }
                    </select>
                    <input type="number" name="usd_amount" className="form-control text-right" value={amount}
                        placeholder='0.00 USD'
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                {/* Select-Tag Group -End- */}
            </div>

            <div className="form-group">
                <label className="mr-sm-2">Wallet Address</label>
                <div className="input-group mb-3">
                    <input type="text" value={wallet_address}
                        onChange={e => _setWalletAddress(e.target.value)}
                        className="form-control" placeholder="Paste address here"
                        required   
                    />
                </div>
                <div className="d-flex justify-content-between mt-5 align-items-center">
                    <h6 className="mb-0">Summary</h6>
                    {/* <p className="mb-0">Price is valid for { counter }s</p> */}
                </div>
                <div className="d-flex justify-content-between mt-2 align-items-center">
                    <p className="mb-0">{ crypto && selected_value } price</p>
                    <h6 className="mb-0">${ coin_price }</h6>
                </div>
                <div className="d-flex justify-content-between mt-2 align-items-center">
                    <p className="mb-0">You get</p>
                    <h6 className="mb-0">
                        <CurrencyFormat
                            renderText={(value) => (
                                <span>{ value }</span>
                            )}
                            value={ coin_name && purchased_amount}
                            decimalScale={5}
                            fixedDecimalScale={true}
                            thousandSeparator={true}
                            displayType={"text"}
                        /> {crypto && selected_value}</h6>
                </div>
            </div>
            <button  name="submit" className="btn btn-primary btn-block">
                Buy
                <i className="la la-arrow-right"></i>
            </button>

    </form>
  );
}

const mapStateToProps = (state) => {
    return {
        crypto: state.app_state.crypto
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCrypto: () => dispatch(fetchCrypto()),
        _setAmount: (amount) => dispatch(setAmount(amount)),
        setBuyerGets: (crypto) => dispatch(setBuyerGets(crypto)),
        setCurrency: (currency) => dispatch(setCurrency(currency)),
        setCurrentPrice: (price) => dispatch(setCurrentPrice(price)),
        setWalletAddress: (address) => dispatch(setWalletAddress(address)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
