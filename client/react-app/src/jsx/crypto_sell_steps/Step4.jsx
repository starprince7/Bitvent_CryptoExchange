import React from 'react';

function Step4({ currentStep, totalSteps, previousStep, goToStep, nextStep, complete }) {
  return (
    <form method="post" name="myform" className="currency_validate">
        <br />

        <div className='lead' onClick={previousStep}><i className="la la-arrow-left"></i></div>
        <br />
        <p>Step: { currentStep - 1 } of { totalSteps -1 } </p>
        <div className="form-group">
            <label className="mr-sm-2">Billing details</label>
            <div className="input-group mb-3">
                <input type="text" name="name" className="form-control" placeholder="Full Name" />
            </div>
            <div className="input-group mb-3">
                <input type="text" name="phone_ni" className="form-control" placeholder="Phone Number" />
            </div>
            <div className="input-group mb-3">
                <select name='country' className="form-control">
                        <option data-display="Country" value="">Country</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="United states">United states</option>
                        <option value="United Kingdom">United Kingdom</option>
                </select>
            </div>
            
        </div>
          
        <button type="submit" name="submit" className="btn btn-primary btn-block">
            continue
            <i className="la la-arrow-right"></i>
        </button>

    </form>
  );
}

export default Step4;
