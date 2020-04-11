const mongoose = require('mongoose');
const Schema = mongoose.Schema
const TaskCard = require('./TaskCard');

const TaskBoardSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    task_cards:[{
        type:Schema.Types.Object,ref:"TaskBoard"
    }]
});

module.exports = mongoose.model('task_board', TaskBoardSchema);