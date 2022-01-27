import React from 'react';
import { ViewFlow, Step } from 'react-view-flow'
import Step1 from '../crypto_sell_steps/Step1';
import Step2 from '../crypto_sell_steps/Step2';
import Step3 from '../crypto_sell_steps/Step3';
import Step4 from '../crypto_sell_steps/Step4';

function SellCrypto() {
    
    return (
        <ViewFlow
            initialStep="4"
        >
            <Step id="1">
                <Step1 />
            </Step>
            <Step id="2">
                <Step2 />
            </Step>
            <Step id="3">
                <Step3 />
            </Step>
            <Step id="4">
                <Step4 />
            </Step>
        </ViewFlow>
    );
}

export default SellCrypto;
