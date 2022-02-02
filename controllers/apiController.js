const Customer_Transactions = require('../model/customerSchema')
const { sendEmailVerificationCode } = require('../utils/mailer')
const Strip = require('stripe')
const stripe = new Strip(process.env.STRIPE_SECRET_KEY)


module.exports.create_buy_transaction = async (req, res) => {
    console.log('Req for /create_buy_transaction')
    const { email, currency, amount, wallet_address, buyer_gets } = req.body
    // Check for customer?
    const customer = await Customer_Transactions.findOne({ email })
    // 1ST CASE:
    if (!customer) {
        // Generate Random 4 digits code.
        const generated_code = Number((Math.floor(Math.random() * 10000) + 10000).toString().substring(1));
        // create a new Transaction / Account
        const transaction = await Customer_Transactions.create({
            email,
            wallet_address,
            buy_transactions: [ { currency, amount, buyer_gets } ],
            verification_code: generated_code
        })
        // send verification code to e-mail
        transaction && sendEmailVerificationCode(transaction, (err, success) => {
            if (err) {
                console.log('ERROR SENDING VERIFICATION CODE >>>', err)
                res.json({ error: 'ERROR SENDING VERIFICATION CODE' })
                return
            }
            console.log('MESSAGE SENT!!!')
            res.json({ customer: transaction })
        })

    }
    // 2ND CASE
    else if (customer) {
        if (customer.isVerified === false) {
            // Generate Random 4 digits code.
            var generated_code = Number((Math.floor(Math.random() * 10000) + 10000).toString().substring(1));
            customer.verification_code = generated_code
            customer.buy_transactions.push({ amount, currency, buyer_gets })
            await customer.save()
            // send verification code to e-mail
            sendEmailVerificationCode(customer, (err, success) => {
                if (err) {
                    console.log('ERROR SENDING VERIFICATION CODE >>>', err)
                    res.json({ error: 'ERROR SENDING VERIFICATION CODE' })
                    return
                }
                console.log('MESSAGE SENT!!!')
                res.json({ customer })
            })
        }
        // 3RD CASE::
        // HERE CUSTOMER'S EMAIL IS VERIFIED AND ALREADY IN THE DB.
        // ---> Proceed with the buy transaction request.
        else {
            customer.buy_transactions.push({ amount, currency, buyer_gets })
            await customer.save()
            res.json({ customer })
        }
    }
}

module.exports.create_sell_transaction = async (req, res) => {
    console.log('Req for /create_sell_transaction')
    console.log(req.body)
    const { email, currency, amount, wallet_address, seller_gets } = req.body
    if(!email) return res.json({ error: 'Please provide your an email address!'})
    // Check for customer?
    const customer = await Customer_Transactions.findOne({ email })
    // 1ST CASE:
    if (!customer) {
        // Generate Random 4 digits code.
        const generated_code = Number((Math.floor(Math.random() * 10000) + 10000).toString().substring(1));
        // create a new Transaction / Account
        const transaction = await Customer_Transactions.create({
            email,
            wallet_address,
            sell_transactions: [{currency, amount, seller_gets}],
            verification_code: generated_code
        })
        console.log('Transaction created!!!', transaction)
        // send verification code to e-mail
        transaction && sendEmailVerificationCode(transaction, (err, success) => {
            if (err) {
                console.log('ERROR SENDING VERIFICATION CODE >>>', err)
                res.json({ error: 'ERROR SENDING VERIFICATION CODE' })
                res.end()
            }
            console.log('MESSAGE SENT!!!')
            res.json({ customer: transaction })
        })

    }
    // 2ND CASE
    else if (customer) {
        if (customer.isVerified === false) {
            // Generate Random 4 digits code.
            var generated_code = Number((Math.floor(Math.random() * 10000) + 10000).toString().substring(1));
            customer.verification_code = generated_code
            customer.sell_transactions.push({ amount, currency, seller_gets })
            await customer.save()
            // send verification code to e-mail
            sendEmailVerificationCode(customer, (err, success) => {
                if (err) {
                    console.log('ERROR SENDING VERIFICATION CODE >>>', err)
                    res.json({ error: 'ERROR SENDING VERIFICATION CODE' })
                    res.end()
                }
                console.log('MESSAGE SENT!!!')
                res.json({ customer })
            })
        }
        // 3RD CASE::
        // HERE CUSTOMER'S EMAIL IS VERIFIED AND ALREADY IN THE DB.
        // ---> Proceed with the buy transaction request.
        else {
            customer.sell_transactions.push({ amount, currency, seller_gets })
            await customer.save()
            res.json({ customer })
        }
    }
}

module.exports.verify_email = async (req, res) => {
    console.log('Req for /email-verification')
    console.log(req.body)
    const { email, verification_code } = req.body
    if (!verification_code) {
        res.json({ error: 'Please enter a verification code'})   
    }
    else {
        try { 
            const customer = await Customer_Transactions.findOne({ email })
            if (customer) {
                // CHECK IF VERIFICATION CODE MATCHES
                if (verification_code == customer.verification_code) {
                    // HERE VERIFICATION CODE IS A MATCH!
                    // TOGGLE "isVerified" to "true".
                    customer.isVerified = true
                    customer.verification_code = 0
                    await customer.save()
                    res.json({ customer })
                } else {
                    res.json({ error: 'Incorrect verification code'})
                }
            }
        }
        catch (e) {
            console.log('CANNOT FIND', e)
        }
    }

}

module.exports.create_payment_intent = async (req, res) => {
    console.log("Req Came for /api/charge")
    console.log(req.body)
    const { amount, id, name, phone, country, email } = req.body
    
    try { 
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'USD'
        })
        console.log('Transaction Success Msg: >>> ', paymentIntent)
        if (paymentIntent) {
            const customer = await Customer_Transactions.findOne({ email })
            if (!customer.name) {
                customer.name = name
                customer.phone = phone
                customer.country = country
                await customer.save()
            }
        }
        res && res.json(paymentIntent.client_secret)
    }
    catch (err) {
        console.log('Error making Payment! >>>', err.code)
        res.send(err.raw)
    }
}