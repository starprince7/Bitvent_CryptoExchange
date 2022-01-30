const mongoose = require('mongoose')
const schema = mongoose.Schema

const customerSchema = new schema({
    email: String,
    wallet_address: String,
    verification_code: Number,
    isVerified: { type: Boolean, default: false },
    buy_transactions: [
        {
            currency: { type: String },
            amount: { type: Number },
            buyer_gets: { type: Number },
            seller_gets: { type: Number },
            date: { type: Date, default: Date.now }
        }
    ],
    sell_transactions: [
        {
            amount: { type: Number },
            currency: { type: String },
            buyer_gets: { type: Number },
            seller_gets: { type: Number },
            date: { type: Date, default: Date.now }
        }
    ],
    date: { type: Date, default: new Date()}
})

const Customer_Transactions = mongoose.model('Customer_Transaction', customerSchema)

module.exports = Customer_Transactions
