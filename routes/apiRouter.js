const express = require('express')
const random = require('simple-random-number-generator')
const API_Controller = require('../controllers/apiController')
apiRouter = express.Router()

/* =========================================================================================== 

API /CREATE TRANSACTION 

Data: { email, currency, amount, wallet_address }

Check for Email in DB & Verification status:

1st CASE:
1. IF NO EMAIL IN DATABASE GENERATE A RANDOM 4 DIGIT CODE CREATE A NEW ACCOUNT WITH THE CODE.
2. ONSUCCESS SEND "RANDOM 4 DIGIT CODE" TO ACCOUNT'S EMAIL
RETURN ID.

2nd CASE::
Email exist & verification is "false" in Database.
1. GENERATE "RANDOM 4 DIGIT CODE" & SEND CODE TO ACCOUNT'S EMAIL.
RETURN ID.

3rd CASE:::
Email exist & is verified!
PUSH [AMOUNT & CURRENCY] INTO TRANSACTIONs.
RETURN ID.

============================================================================================== */
apiRouter.post('/create_buy_transaction', API_Controller.create_buy_transaction)
apiRouter.post('/create_sell_transaction', API_Controller.create_sell_transaction)

/* ===========================================================================================
API /EMAIL-VERIFICATION

1. Collects:
    VERIFICATION CODE & COMPARE WITH CODE SAVED IN DB
2. IF CODE MATCHES:
    TOGGLE ISVERIFIED TO TRUE "isVerified = true"
    RETURN ID
============================================================================================== */
apiRouter.post('/email-verification', API_Controller.verify_email)

module.exports = apiRouter
