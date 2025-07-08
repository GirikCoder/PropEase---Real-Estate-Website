const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  area: { type: String, required: true },
  rooms: { type: Number, required: true },
  parking: { type: Boolean, required: true },
  floor: { type: String, enum: ['Ground', 'First', 'Top', 'Entire House'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema); 