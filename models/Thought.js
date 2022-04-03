// Define Mongoose
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({

}); 

const thoughtSchema = new mongoose.Schema({
reations: [reactionSchema]


});


const Thought = mongoose.model('Thought', thoughtSchema);


const handleError = (err) => console.error(err);


module.exports = Thought;




  // Add individual properties and their types
  // Setting required to true will disallow null values
//   item: { type: String, required: true },
//   stockCount: Number,
//   price: Number,
//   inStock: Boolean,
//   // Use built in date method to get current date
//   lastAccessed: { type: Date, default: Date.now },