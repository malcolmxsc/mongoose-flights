const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {
    type: Number,
    min: 0
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId
  }
  
});

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  arrival: {
    type: Date
  }
});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest','United']
  },

  airport: {
    type: String,
    enum: ['AUS', 'DFW','DEN','LAX','SAN'],
    default: "DEN"
  },

  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,

  },

  departs: {
    type: Date,
    default: () => new Date(+new Date() + 365*24*60*60*1000)

  },
  destinations: {
    type: [destinationSchema]
  },
  
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);