const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
thoughts: [
    {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Thought'
    }
]

});


const User = mongoose.model('User', userSchema);


const handleError = (err) => console.error(err);


module.exports = User;
