/* ==============================
    STEP 2 TO ENTER EMAIL ADDRESS
   ============================== */
   
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux'
import { createSellTransaction } from '../../redux/crypto_data/actions'


function Step2({ currentStep, totalSteps, previousStep, goToStep, nextStep, complete, createSellTransaction, customer }) {
  const [email, setEmail] = useState('')
  const btn_ref = useRef(null)
  
  const handle_form_submit = (e) => {
    e.preventDefault()
    btn_ref.current.textContent = 'Processing...'
    createSellTransaction(email, (e, customer) => {
      if (e) return
      if (customer.isVerified === true) {
        goToStep(4)
      } else {
        nextStep()
      }
  })
  }

  return (
    <form onSubmit={handle_form_submit} className="currency_validate">
        <br />

        <div className='lead' onClick={previousStep}><i className="la la-arrow-left"></i></div>
        <br />
        <p>Step: { currentStep - 1 } of { totalSteps -1 } </p>
        <div className="form-group">
            <label className="mr-sm-2">Email Address</label>
            <p>Enter your email address to follow up your order.</p>
            <div className="input-group mb-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your email address"
            required />
          </div>
        </div>
          
        <button name="submit" ref={btn_ref} className="btn btn-primary btn-block">
            submit
            <i className="la la-arrow-right"></i>
        </button>

    </form>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    createSellTransaction: (email, cb) => dispatch(createSellTransaction(email, cb))
  }
}

const mapStateToProps = state => {
  return {
    customer: state.app_state.customer
  }
}
   

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
   