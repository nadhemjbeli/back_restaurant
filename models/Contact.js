const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    nomPrenom: {
        type: String,
    },
    email: {
        type: String,
    },
    message:
    {
        type: String,
    },

});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;