/* ==============================
    STEP 2 TO ENTER EMAIL ADDRESS
   ============================== */
   
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux'
import { createBuyTransaction } from '../../redux/crypto_data/actions'


function Step2({ currentStep, totalSteps, previousStep, goToStep, nextStep, complete, createBuyTransaction }) {
    const [email, setEmail] = useState('')
    const btn_ref = useRef(null)

    const handle_form_submit = (e) => {
        e.preventDefault()
        btn_ref.current.textContent = 'Processing...'
        createBuyTransaction(email, (e, customer) => {
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
            <div className="input-group mb-3">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter your email address" />
            </div>
            
        </div>
          
        <button ref={btn_ref} className="btn btn-primary btn-block">
            submit
            <i className="la la-arrow-right"></i>
        </button>

    </form>
  );
}

const mapDispatchToProps = dispatch => {
    return {
      createBuyTransaction: (email, cb) => dispatch(createBuyTransaction(email, cb))
    }
}

export default connect(null, mapDispatchToProps)(Step2);
