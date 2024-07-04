import { error } from 'console';
import Event from '../models/eventModel.js';
import mongoose from 'mongoose';

//get all events
const getEvents = async (req, res) => {
    const events = await Event.find({}).sort({ createdAt: -1 }); //what is this
    res.status(200).json(events);
}

//get a single event
const getEvent = async (req, res) => {
   const { query: { id }} = req;

   if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('Event not found');
   }

   const event = await Event.findById(id);
   
   if(!event) {
       return res.status(404).send('Event not found');  
   }

   res.status(200).json(event);
}

//create a new event
const createEvent = async (req, res) => {
    const { title, start, end, description, timezone, start_date, end_date, start_time, end_time, background } = req.body;

    if(!title || !start || !end ) {
        return res.status(400).json({error: 'All fields are required'});
    }

    //add to the database
    try {
        const event = await Event.create(
            {
                ...req.body,
            });
            res.status(200).json({result: event, status: "Success"});
    } catch(error) {
        res.status(400).json({error: `An error occurred ${error.message}` });
    }
}

//delete an event
const deleteEvent = async (req, res) => {

    const { id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Event not found');
    }

    const event = await Event.findByIdAndDelete({_id: id});

    if(!event) {
        return res.status(404).json({error: 'Event not found'});
    }

    res.status(200).json(event);
}

//update an event
const updateEvent = async (req, res) => {

    const { id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such Event" });
    }

    const event = await Event.findByIdAndUpdate(
        {_id: id},
        {
            ...req.body,
        },
    );

    if(!event) {
        return res.status(404).json({error: 'Event not found'});
    }

    res.status(200).json(event);
}