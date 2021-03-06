// IMPORTS
const express = require('express');
require('dotenv').config();
const app = express();
const rateLimit = require('express-rate-limit');
const path = require('path');

// Använd en variabel till portnumret
const port = process.env.PORT || 3001;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minut
    max: 500 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);


// Enable JSON formatting
app.use(express.json());


// STATIC ROUTES
app.use(express.static(__dirname + '/../build'));

// ROUTE MODULES IMPORT
const chartsRoute = require('./routes/charts');
const gamesRoute = require('./routes/games');
const hamstersRoute = require('./routes/hamsters');
const picsRoute = require('./routes/pics');
const statsRoute = require('./routes/stats');

// ROUTES
app.use('/charts', chartsRoute);
app.use('/games', gamesRoute);
app.use('/hamsters', hamstersRoute);
app.use('/pics', picsRoute)
app.use('/stats', statsRoute);

// GLOBAL FRONTEND REDIRECT TO CATCH FRONTEND ROUTES
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/../build/index.html'))
})

app.use((req,res,next) => {
    // Serve public folder
    if(req.url === '/charts' || req.url === '/games' || req.url === '/hamsters' || req.url === '/pics' || req.url === '/stats'){
        // Check API key
        if(req.headers['authorization'] === process.env.API_KEY){
            console.log('API Key verified.');
            next();

        }else{
            // Reject if no match
            res.status(401).send({
                msg: 'API Key mismatch.'
            })
        }

    }else{
        next();
    }
})





// Start up server
app.listen(port, () => {
    console.log('Server is listening on port ' + port +'...');
})