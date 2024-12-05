require('dotenv').config();
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });

// Task 1: Import the Natural library.
// Task 2: Initialize the Express server.
// Task 3: Create a POST /sentiment endpoint.
// Task 4: Extract the sentence parameter from the request body.
// Task 5: Process the response from Natural by adding a sentiment of 'positive', 'negative' or 'neutral' based on the scores returned.
    // ~ If score is < 0, the sentiment should be negative.
    // ~ If the score is between 0 and 0.33, it should neutral.
    // ~ Otherwise, the sentiment should be positive.
// Task 6: Implement success return state.
// Task 7: Implement error return state.

// Task 1: import the natural library
const natural = require("natural");

// Task 2: initialize the express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

// Define the sentiment analysis route
// Task 3: create the POST /sentiment analysis
app.post('/sentiment', async (req, res) => {

    // Task 4: extract the sentence parameter
    const { sentence } = req.query;


    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    // Perform sentiment analysis
    try {
        const analysisResult = analyzer.getSentiment(sentence.split(' '));

        let sentiment = "neutral";

        /// Task 5: Process the response from Natural by adding a sentiment of 'positive', 'negative' or 'neutral' based on the scores returned.
            // ~ If score is < 0, the sentiment should be negative.
            // ~ If the score is between 0 and 0.33, it should neutral.
            // ~ Otherwise, the sentiment should be positive.
        if (analysisResult < 0) {
            sentiment = "negative";
        } else if (analysisResult > 0.33) {
            sentiment = "positive";
        }

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);

        // Task 6: send a status code of 200 with both sentiment score and the sentiment txt in the format { sentimentScore: analysisResult, sentiment: sentiment }
        res.status(200).json({ sentimentScore: analysisResult, sentiment: sentiment });

    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);
        // Task 7: if there is an error, return a HTTP code of 500 and the json {'message': 'Error performing sentiment analysis'}
        res.status(500).json({ message: 'Error performing sentiment analysis' });    }
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
