// this module defines all the db interaction, 
//no direct db operations should exist in upper level functions(vendor.js for example)
//init db connection and create a singleton instance.  see node.js module export in learning source to understand how singleton works

/*
require('dotenv/config')
require('mongoose-long')(mongoose);



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

const vendorSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    pw: String,
    profile:{
      name: {
          first: String,
          middle: String,
          last: String
        },
      avatar:{
        _id: mongoose.ObjectId,
        avatarName: String
      },
      age: Int32,
      gender: Int32,
      selfIntro: String,
      access:{
          phone: String,
          email: String
        },
      ratingScore: Double,
      adsImg:[{
          _id: mongoose.ObjectId,
          img: String,
          caption: String,
          isHomePage: Boolean
        }],
    },
    attTime:{
      Mon:{
        start: Date,
        end: Date
      },
      Tues:{
        start: Date,
        end: Date
      },
      Wed:{
        start: Date,
        end: Date
      },
      Thurs:{
        start: Date,
        end: Date
      },
      Fri:{
        start: Date,
        end: Date
      },
      Sat:{
        start: Date,
        end: Date
      },
      Sun:{
        start: Date,
        end: Date
      }
    },
    location: {
        addr:{
          streetAddr: String,
          city: String,
          state: String,
          zipCode: String
        },
        longitude: Double,
        latitude: Double
      },
    products:[{
      _id: mongoose.ObjectId,
      name: String,
      img: String,
      description: String,
      price: {
        number: Double,
        unit: String
      },
      resAmount: Double
    }],
    activities:[{
      _id: mongoose.ObjectId,
      desciption: String,
      imgs:[{
        _id:mongoose.ObjectId,
        imgName:String
      }],
      video: {
        _id:mongoose.ObjectId,
        videoName: String
      },
      location: {
        addr:{
          streetAddr: String,
          city: String,
          state: String,
          zipCode: String
        },
        longitude: Double,
        latitude: Double
      },
      time:{
        startDate: Date,
        endDate: Date,
        startHour: Int32,
        endHour: Int32
      }
    }],
    businessEntity:{
      entityName: String,
        location:{
          addr:{
            streetAddr: String,
            city: String,
            state: String,
            zipCode: String
          },
          longitude: Double,
          latitude: Double
        },
        time:{
          span:String,
          start: Int32,
          end: Int32,
        }
      },
    Top10Reviews:[
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      },
      {
        _id: mongoose.ObjectId,
        customerID: mongoose.ObjectId,
        customerName: String,
        customerVendorShareMarket: Int32,
        vendorID: mongoose.ObjectId,
        vendorName: String,
        marketID: mongoose.ObjectId,
        marketName: String,
        postTime: Date,
        scores: Double,
        //?
        likeCount: Int64,
        img:[{
          _id:mongoose.ObjectId,
          imgName:String,
          caption:String
        }],
        txt: String,
        video:{
          _id: mongoose.ObjectId,
          videoName: String
        }
      }
    ]
  });

var vendors= mongoose.model('vendor',vendorSchema);


// the curd actions base on the schema above should be defined here


module.exports.initDB = initDB;
module.exports.vendors = vendors;

*/