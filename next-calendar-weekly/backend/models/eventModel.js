//schema for the events
const mongoose = require('mongoose');
const { type } = require('os');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//my event schema to laod to the mongodb
const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    description: String,
    timezone: String,
    start_date: String,
    end_date: String,
    start_time: String,
    end_time: String,
    background: String,
    },
    { timestamps: true, _id: true},
)
module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
