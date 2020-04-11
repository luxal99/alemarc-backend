const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardStatus = require('./CardStatus');

const TaskCardSchema = mongoose.Schema({
    header:{
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    due_date:{
        type:Date
    },
    image_list:[{
        type:String
    }],

    status:{type:Schema.Types.Object,ref:"CardStaus"}
});

module.exports = mongoose.model('task_card', TaskCardSchema);