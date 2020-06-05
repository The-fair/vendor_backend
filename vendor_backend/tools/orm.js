// this module defines all the db interaction, 
//no direct db operations should exist in upper level functions(vendor.js for example)
//init db connection and create a singleton instance.  see node.js module export in learning source to understand how singleton works


require('dotenv/config')

var mongoose = require('mongoose')  
  , connectionString = process.env.DB_CONNECTION
  , options = {};
	
options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  },
  useUnifiedTopology: true,
  useNewUrlParser: true
};

function initDB(){

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
var Schema = mongoose.Schema

var vendorSchema = new Schema({
    pw: String,
    profile: {
        name :[{First_name :String, Last_name: String}],
        age: Number,
        gender: Number,
        selfIntro:String,
        access:{email:String, phone: String},
        ratingScore: Number,
    },
    location: {longitude:Number, latitue:Number},
    products:[{name: String, price:{number:Number, unit:String} }],
    activities:{
        _id: mongoose.Types.ObjectId,
        time: Date,
        description: String,
        location:{longitude: Number, latitude:Number}
    }
});

var vendors= mongoose.model('vendors',vendorSchema);


// the curd actions base on the schema above should be defined here


module.exports.initDB = initDB;
module.exports.vendors = vendors;

