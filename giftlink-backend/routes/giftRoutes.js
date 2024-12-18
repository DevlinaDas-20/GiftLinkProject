const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// Get all gifts
router.get('/', async (req, res, next) => {
    // Task 1: Connect to MongoDB and store connection to db constant
    // Task 2: use the collection() method to retrieve the gift collection
    // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
    // Task 4: return the gifts using the res.json method
    logger.info('/ called');
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();
        console.log('db',db)
        // Task 2: use the collection() method to retrieve the gift collection       
        const collection = db.collection("gifts");
        console.log('collection',collection)
        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        const gifts = await collection.find({}).toArray();
        // Task 4: return the gifts using the res.json method
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        next(e);
    }
});

// Get a single gift by ID
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send("Gift not found");
        }

        res.json(gift);
    } catch (e) {
        next(e);
    }
});


// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;