const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({

    header: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    date: {
        type: Number
    },
    images: [{
        type: String
    }

    ]
});

module.exports = mongoose.model('blog', BlogSchema);