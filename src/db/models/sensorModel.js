const { Schema, model } = require('mongoose');

const sensorSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  data: {
    type: [Number],
    required: true,
  },
});

module.exports = model('sensor', sensorSchema, 'sensor');
