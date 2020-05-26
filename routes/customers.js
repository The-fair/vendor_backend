var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var mongoDB = 'mongodb://127.0.0.1/fair_customer_db';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});


// get the default connection
var db = mongoose.connection;

var Schema = mongoose.Schema;

/*
var testerModelSchema = new Schema({
    tester_id: String
});
*/

// create collection
//var testerModel = mongoose.model('testerModel', testerModelSchema);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// GET Method
router.get("/customers", function(req, res, next){

    //res.send("CUSTOMER ROUTE");

    db.db.collection("Costumer", function(err, collection){
        collection.find({}).toArray(function(err, data){
            //console.log(data); // it will print your collection data
            res.send(data);
        })
    });

    /*
    var tester_instance = new testerModel({ tester_id: 'testid_1'});

    tester_instance.save(function (err) {
        if (err) return handleError(err);
        res.send('added');
        mongoose.connection.close();
    });
    */
    /*
    var query = testerModel.find();

    query.exec(function (err, tester) {
        if (err) return handleError(err);

        res.send("wow");
        // athletes contains an ordered list of 5 athletes who play Tennis
    });
    */



    
});

module.exports = router;