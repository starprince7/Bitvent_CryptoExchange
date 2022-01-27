/* ==============================
    STEP 2 TO ENTER EMAIL ADDRESS
   ============================== */
   
import React from 'react';


function Step2({ currentStep, totalSteps, previousStep, goToStep, nextStep, complete }) {
  return (
    <form name="myform" className="currency_validate">
        <br />

        <div className='lead' onClick={previousStep}><i className="la la-arrow-left"></i></div>
        <br />
        <p>Step: { currentStep - 1 } of { totalSteps -1 } </p>
        <div className="form-group">
            <label className="mr-sm-2">Email Address</label>
            <div className="input-group mb-3">
                <input type="email" name="email" className="form-control" placeholder="Enter your email address" />
            </div>
            
        </div>
          
        <button name="submit" className="btn btn-primary btn-block" onClick={ nextStep }>
            submit
            <i className="la la-arrow-right"></i>
        </button>

    </form>
  );
}

export default Step2;
