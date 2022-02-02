const mongoose = require('mongoose')
const schema = mongoose.Schema

const customerSchema = new schema({
    name: String,
    email: String,
    phone: String,
    country: String,
    home_address: String,
    wallet_address: String,
    verification_code: Number,
    isVerified: { type: Boolean, default: false },
    buy_transactions: [
        {
            amount: { type: Number },
            currency: { type: String },
            buyer_gets: { type: Number },
            seller_gets: { type: Number },
            current_price: { type: Number },
            date: { type: Date, default: Date.now }
        }
    ],
    sell_transactions: [
        {
            amount: { type: Number },
            currency: { type: String },
            buyer_gets: { type: Number },
            seller_gets: { type: Number },
            current_price: { type: Number },
            date: { type: Date, default: Date.now }
        }
    ],
    date: { type: Date, default: new Date()}
})

const Customer_Transactions = mongoose.model('Customer_Transaction', customerSchema)

module.exports = Customer_Transactions
