const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const creatureSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  habitat: { type: String, required: true },
}, {
  timestamps: true,
});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;
