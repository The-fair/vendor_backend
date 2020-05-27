// this module defines all the db interaction, 
//no direct db operations should exist in upper level functions(vendor.js for example)
//init db connection and create a singleton instance.  see node.js module export in learning source

function initDB(){
    var config = require('../config.json');
    var dbstring =config.db.connectionString

    var mongoose = require('mongoose')  
    , connectionString = dbstring
     , options = {};
	
    options = {  
     server: {
     auto_reconnect: true,
     poolSize: 5
    }
    };

    mongoose.connect(connectionString, options, function(err, res) {  
    if(err) {
        console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
    } else {
        console.log('[mongoose log] Successfully connected to: ' + connectionString);
     }
    });


    var db = mongoose.connection;
    //to do: exit and kill the process if db connection fails
    db.on('error', console.error.bind(console, 'mongoose connection error:'));

    db.once('open', function callback () {
    // yeah!!!
	console.log('mongoose open success');
    });
}




module.exports.initDB = initDB;
