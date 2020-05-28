// this module defines all the db interaction, 
//no direct db operations should exist in upper level functions(vendor.js for example)
//init db connection and create a singleton instance.  see node.js module export in learning source to understand how singleton works

var mongoose = require('mongoose')  

function initDB(){
    var config = require('../config.json');
    var dbstring =config.db.connectionString

    , connectionString = dbstring
     , options = {};
	//connection pool size 5
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

//the mongoose schema should be defined  here and we may export it later

var vendorSchema = new mongoose.Sechme({
    pw: String,
    profile: {
        name :[{first :String, last: String}],
        age: Int16Array,
        gender: Int16Array,
        selfIntro:String,
        accsee:{email:String, phone: String},
        ratingScore: double,
    },
    location: {longitude:double, latitue:double},
    products:[{name: String, price:{number:double, unit:String} }],
    activities:{
        _id: mongoose.Types.ObjectId,
        time: Date,
        description: String,
        location:{longitude: double, latitude:double}
    }
});

var vendor= mongoose.Model('vendor',vendorSchema);


// the curd actions base on the schema above should be defined here

function saveVendor(){
    
}

module.exports.initDB = initDB;
module.exports.saveVendor = saveVendor;

