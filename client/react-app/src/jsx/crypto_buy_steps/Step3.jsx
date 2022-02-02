/* ================================================
    STEP 2 BUY - TO ENTER EMAIL VERIFICATION CODE
   ================================================ */
   import React, { useState, useRef } from 'react';
   import { connect } from 'react-redux'
   import { submitVerificationCode } from '../../redux/crypto_data/actions'

function Step3({ submitVerificationCode, customer, currentStep, totalSteps, previousStep, goToStep, nextStep, complete }) {
    const [code, setCode] = useState('')
    const btn_ref = useRef(null)

    const handle_form_submit = e => {
        e.preventDefault()
        btn_ref.current.textContent = 'Please wait...'
        btn_ref.current.disabled = true
        submitVerificationCode(code, (e, s) => {
            if (e) {
                btn_ref.current.textContent = 'Continue'
                btn_ref.current.disabled = false
                return
            }
            nextStep()
        })
    }

    return (
        <form onSubmit={ handle_form_submit } className="currency_validate">
            <br />
    
            <div className='lead' onClick={previousStep}><i className="la la-arrow-left"></i></div>
            <br />
            <p>Step: { currentStep - 1 } of { totalSteps -1 } </p>
            <div className="form-group">
                <label className="mr-sm-2">Verify your Email Address</label>
                <p>Enter the verification code sent to your e-mail address.</p>
                <div className="input-group mb-3">
                    <input type="number" onChange={(e) => setCode(e.target.value)} value={code} className="form-control" placeholder="Verification code" />
                </div>
                
            </div>
              
            <button ref={btn_ref} className="btn btn-primary btn-block">
                Continue
                <i className="la la-arrow-right"></i>
            </button>
    
        </form>
      );
}

const mapDispatchToProps = dispatch => {
    return {
        submitVerificationCode: (code, cb) => dispatch(submitVerificationCode(code, cb))
    }
}

const mapStateToProps = state => {
    return {
        customer: state.app_state.customer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
