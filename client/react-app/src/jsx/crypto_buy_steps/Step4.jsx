import React, { useState, useRef } from 'react';
import { connect } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from 'axios'
import StripePaymentIcon from './../../images/stripe-icon/stripe_secure_icon.png'

function Step4(props) {
    const {
        currentStep,
        totalSteps,
        previousStep,
        goToStep,
        nextStep,
        complete,
        customer,
        amount
    } = props

    const [name, setName] = useState(!customer ? '' : customer.name)
    const [email, setEmail] = useState(!customer ? '' : customer.email)
    const [phone, setPhone] = useState(!customer ? '' : customer.phone)
    const [country, setCountry] = useState(!customer ? '' : customer.country)
    const btn_ref = useRef(null)

    const stripe = useStripe()
    const elements = useElements()

    // PayStack Config
    const billingDetails = {
        name: name,
        email: email,
        phone: phone,
        // amount: (amount * 100),
        address: {
            country: country
        },
    }
    

    const handle_form_submit = async (e) => {
        e.preventDefault()
        btn_ref.current.textContent = 'Processing...'

        let options = {
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails,
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod(options)

        error && console.log('Stripe Error Msg', error)
        paymentMethod && console.log('Stripe success Msg', paymentMethod )

        if (error) {
            btn_ref.current.textContent = 'Pay'
            btn_ref.current.disabled = false
            alert(error.message)
            return
        }

        const { id } = paymentMethod
        const price = amount * 100
        // Make post req to server
        
        let Charge_options = {
            id: amount,
            amount: price,
            name,
            email,
            phone,
            country
        }

        try{
            const res = await axios.post('/api/charge', Charge_options)
            const { data } = res
            data && console.log("New Res >>>", res.data)

            try{ 
                const Confirmation = await stripe.confirmCardPayment(data, {
                  payment_method: id,
                });

                if (Confirmation) {
                    console.log('Card confirmation', Confirmation.paymentIntent.status)
                    btn_ref.current.textContent = 'Pay'
                    btn_ref.current.disabled = false
                    alert('Confirmed, payment successful!')
                }
            }
            catch (e) {
                console.log('ERR in confirming card payment', e)
            }
        }
        catch (e) {
            console.log('ERR Posting to server end point /api/charge', e)
        }

    }

  return (
    <form onSubmit={handle_form_submit} className="currency_validate">
        <br />

        <div className='lead' onClick={previousStep}><i className="la la-arrow-left"></i></div>
        <br />
        <p>Step: { currentStep - 1 } of { totalSteps -1 } </p>
        <div className="form-group">
            <label className="mr-sm-2">Billing details</label>
            <div className="input-group mb-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Full Name" />
            </div>
            <div className="input-group mb-3">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="E-mail" />
            </div>
            <div className="input-group mb-3">
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Phone Number" />
            </div>
            <div className="input-group mb-3">
                <select name='country' value={country} className="form-control" onChange={e => setCountry(e.target.value)}>
                        <option data-display="Country" value="">Country</option>
                        <option value="NG">Nigeria</option>
                        <option value="United states">United states</option>
                        <option value="United Kingdom">United Kingdom</option>
                </select>
            </div>
            
        </div>
        
            <label htmlFor="">Card details</label>
          <div className="card-container p-3 mt-1 mb-2 border rounded">
              <CardElement />
        </div>
        <div className="image-container text-center mb-5">
            <img src={StripePaymentIcon} alt="Stripe icon" width={190} />
        </div>
          
        <button type="submit" ref={btn_ref} className="btn btn-primary btn-block">
            <strong>
                Pay<span className='mx-2'>
                <CurrencyFormat
                    renderText={(value) => (
                        <>{ value }</>
                    )}
                    value={ amount ? amount : 0 }
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    displayType={"text"}
                    prefix='$'
                />
                </span>
            </strong>
        </button>

    </form>
  );
}

const mapStateToProps = state => {
    return {
        customer: state.app_state.customer,
        amount: state.app_state.amount,
    }
}

export default connect(mapStateToProps)(Step4);
