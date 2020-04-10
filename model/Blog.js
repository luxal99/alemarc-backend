const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({

    header: {
        type: String,
        required: true
    },
    text_en: {
        type: String,
        required: true
    },
    text_sr: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    date: {
        type: Date

    },
    cover:{
        type:String
    },
    images: [{
        type: String
    }

    ],
    technologies: [{
        type: String
    }

    ]
});

module.exports = mongoose.model('blog', BlogSchema);