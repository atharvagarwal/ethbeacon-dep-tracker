const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const depositSchema = new Schema({
    blockNumber: {
        type: Number,
        required: true
    },
    blockTimestamp: {
        type: Date,
        required: true
    },
    fee: {
        type: String,  // Fee can be a string in case of large or precise numbers (e.g., in ETH)
        required: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },
    pubkey: {
        type: String,
        required: true
    },
    network:{
        type:String,
        required: true
    }
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;