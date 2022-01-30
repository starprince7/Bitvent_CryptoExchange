import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux'
import QrCode from '../../images/QR-code/QR-placeholder.png'
import BTC from '../../images/QR-code/exchange/btc.jpeg'
import BNB from '../../images/QR-code/exchange/bnb.jpeg'
import USDT_ERC20 from '../../images/QR-code/exchange/usdt-erc20.jpeg'
import USDT_TRC20 from '../../images/QR-code/exchange/usdt-trc20.jpeg'
import LTC from '../../images/QR-code/exchange/ltc.jpeg'
import SOL from '../../images/QR-code/exchange/sol.jpeg'
import ETH from '../../images/QR-code/exchange/eth.jpeg'
import XRP from '../../images/QR-code/exchange/xrp.jpeg'
import DOGE from '../../images/QR-code/exchange/doge.jpeg'

function Step4(props) {
    // Destructure Properties from "Props"
    const {
        customer,
        currency,
        amount,
        seller_gets,
        currentStep,
        totalSteps,
        previousStep,
        goToStep,
        nextStep,
        complete
    } = props

    const [address, setAddress] = useState('2iyti33o8i2rljwohfou29ufhwobeou19790u')
    const [qr_image, setQrImage] = useState(QrCode)
    const [network, setNetwork] = useState('')

    // SET IMAGE AND ADDRESS.
    useEffect(() => {
        if (currency === 'BTC') {
            setAddress('bc1qgjqezz2edxjpjw8ylrquje0ehqwxrldm9wf5v2')
            setQrImage(BTC)
        }
        if (currency === 'ETH') {
            setAddress('0x40E897f7658016593cFFd131E806BA4c8b8a2dFd')
            setQrImage(ETH)
        }
        if (currency === 'BNB') {
            setAddress('bnb1vv9pl90leycldlytwsthp9a6pyr465n6rasdfe')
            setQrImage(BNB)
        }
        if (currency === 'ADA') {
            setAddress('')
            setQrImage()
        }
        if (currency === 'LTC') {
            setAddress('ltc1q8ctk3jppdykz7xvvz9n592zz3qrldpgqfsfdz7')
            setQrImage(LTC)
        }
        if (currency === 'SOL') {
            setAddress('3cEmc6QGQHK2M9Wa4ys1MK9ewLLF1oTej4PrEBxc8ruF')
            setQrImage(SOL)
        }
        if (currency === 'XRP') {
            setAddress('r9ZPxtX9mNRuBct7c1czbME2K8qscNrqob')
            setQrImage(XRP)
        }
        if (currency === 'DOGE') {
            setAddress('DCSQTtZ6zTJAdhMwckAJGAkDaio7BrCfmn')
            setQrImage(DOGE)
        }
        if (currency === 'USDT') {
            setAddress('Select Network!')
            setQrImage(QrCode)
            if (currency === 'USDT' && network === 'ERC20') {
                setAddress('0x40E897f7658016593cFFd131E806BA4c8b8a2dFd')
                setQrImage(USDT_ERC20)
            }
            else if (currency === 'USDT' && network === 'TRC20') {
                setAddress('TMwuNvj6nvHTBcJ8Dei5hGXsnQsDSr537K')
                setQrImage(USDT_TRC20)
            }
        }
        if (currency === 'SHIB') {
            setAddress('')
            setQrImage()
        }
        if (currency === 'MATIC') {
            setAddress('')
            setQrImage()
        }
    }, [currency, network])

  return (
    <form  className="currency_validate">
        <br />

        <div className='lead' onClick={previousStep}><i className="la la-arrow-left"></i></div>
        <br />
        <p>Step: { currentStep - 1 } of { totalSteps -1 } </p>

        <div className="form-group">
            <label htmlFor="">Deposit Crypto</label>
            <p className="">To pay, please send the exact amount of {currency} to the given address.</p>

            {/* QR-image */}
            <div className="text-center mb-2">
                <img src={ qr_image } alt="Qr code" width={180} className="img-thumbnail img-fluid" />
            </div>
            {/* ----------------------------------- SHOW BLOCKCHAIN NETWORK-SELECT ONLY IF 'USDT' IS SELECTED ------------------------------------------ */}
                { currency === 'USDT' && (
                    <select id="currency_select" value={ network }  className="form-control text-center mb-4 mx-auto" style={{width: '180px', fontWeight: '600'}} onChange={(e) => setNetwork(e.target.value)}>
                        <option value="">Select</option>
                        <option value="ERC20">ERC20</option>
                        <option value="TRC20">TRC20</option>
                    </select>
                ) }
            <div className="d-flex justify-content-between align-items-center">
                {/* <p className="mb-0">Price is valid for { counter }s</p> */}
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">You send</p>
                <h6 className="mb-0">{ amount } { currency } </h6>
            </div>
            <div className="d-flex justify-content-between mt-2 align-items-center">
                <p className="mb-0">You get</p>
                <h6 className="mb-0">
                    <CurrencyFormat
                        renderText={(value) => (
                            <span>{ value }</span>
                        )}
                        value={ seller_gets ? seller_gets : 0 }
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                        displayType={"text"}
                        prefix='$'
                    /> </h6>
            </div>
        </div>

        <div className="my-4 text-center">
            <span style={{fontSize: '12px', color: 'silver'}}>Copy address</span>
            <input type="text" value={ address } className='p-1 mt-1 text-center form-control' />
        </div>

          
        <button type="submit" name="submit" className="btn btn-primary btn-block">
            Confirm Deposit
            {/* <i className="la la-arrow-right"></i> */}
        </button>

    </form>
  );
}

const mapStateToProps = state => {
    return {
        customer: state.app_state.customer,
        seller_gets: state.app_state.seller_gets,
        currency: state.app_state.currency,
        amount: state.app_state.amount,
    }
}
   
   export default connect(mapStateToProps)(Step4);
