import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';            // to access mongodb database and establish connection and update data 

import Issue from './models/Issue';
import { runInNewContext } from 'vm';

const app = express();     // Create express server
//app.get('/', (req, res) => res.send("Hello World!")); // register a route (default route). Listening for get requests.
const router = express.Router();

app.use(cors());        // attach to express
app.use(bodyParser.json());     // attach to express

mongoose.connect("mongodb://localhost:27017/issues");       // mongodb database     

const connection = mongoose.connection; // connection to mongodb

connection.once('open', () => {
    console.log("MongoDB Connection extablished successfully")
}); // listening to opening to mongodb database


// ENDPOINT CONFIGURATIONS (CRUD OPERATIONS)
// First endpoint (GET)
router.route('/issues').get((req, res) => {     // get request to database
    Issue.find((err, issues) => {               
        if (err) 
            console.log(err);
        else    
            res.json(issues);               // if get request successful, send issues response containing data (issues)
    })
});

// Second endpoint (GET SINGLE ITEM)
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

// Third endpoint (POST) - Adding new issues to database
router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);        // Create new issue (piece of data)
    issue.save()
        .then(issue => {            // Save to database (using asynchronous promises)
            res.status(200).json({'issue': 'Added successfully'});       // Send response code of 200
        })
        .catch(err => {
            res.status(400).send("Failed to create new record");        // If fails, throw response code 400
        });
    });

// Fourth endpoint (PUT) - Update records
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {                 // Retrieve data first
        if (!issue)
            return next(new Error("Could not load document!"));     // If no issue presented, throw error
        else {
            issue.title = req.body.title;                           // Else update all the data
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send("UPDATE FAILED");
            });
        }
    });
});

// Fifth endpoint (DELETE) - Delete an issue by the id
router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {     // Find the issue in the database by id and remove
        if (err)            // If there is an error, send it as a response
            res.json(err);
        else                // Else, send removed successful response
            res.json("Removed Successfully");
    });
});



app.use('/', router);       // attach to express

app.listen(4000, () => console.log("Express Server running on Port 4000"));     // attach to port 4000 w/ call back function
