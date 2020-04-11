const mongoose = require('mongoose');
const TaskCard = require('./TaskCard');

const CardStatusSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    task_cards:[TaskCard]
});

module.exports = mongoose.model('card_status', CardStatusSchema);