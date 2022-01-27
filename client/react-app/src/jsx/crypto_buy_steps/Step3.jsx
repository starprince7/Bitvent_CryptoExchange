/* =========================================
    STEP 2 BUY - TO ENTER EMAIL VERIFICATION
   ========================================= */
import React from 'react';

function Step3({ currentStep, totalSteps, previousStep, goToStep, nextStep, complete }) {
    return (
        <form name="myform" className="currency_validate">
            <br />
    
            <div className='lead' onClick={previousStep}><i className="la la-arrow-left"></i></div>
            <br />
            <p>Step: { currentStep - 1 } of { totalSteps -1 } </p>
            <div className="form-group">
                <label className="mr-sm-2">Verify your Email Address</label>
                <p>Enter the verification code we sent to your email address.</p>
                <div className="input-group mb-3">
                    <input type="number" name="verification_code" className="form-control" placeholder="Verification code" />
                </div>
                
            </div>
              
            <button name="submit" className="btn btn-primary btn-block" onClick={ nextStep }>
                continue
                <i className="la la-arrow-right"></i>
            </button>
    
        </form>
      );
}

export default Step3;
