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
require('mongoose-long')(mongoose);
const Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');
const Int64 = mongoose.Schema.Types.Long;


function initDB(){
    console.log(connectionString);
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
  attMarket:[{
    _id: mongoose.ObjectId,
    marketName: String
  }],
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

const marketSchema= new mongoose.Schema({
  _id: mongoose.ObjectId,
  name:String,
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
    openDay:String,
    start:Int32,
    end:Int32
  },
  phone:String,
  link:String,
  vendors:[
    {_id:mongoose.ObjectId}
  ],
  ratingScores:Double,
  imgs:[{
    _id:mongoose.ObjectId,
    imgName: String
  }],
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

const recommchema = new mongoose.Schema({
  _id:mongoose.ObjectId,
  markets:[
    {id:mongoose.ObjectId}
  ],
  vendors:[
    {id:mongoose.ObjectId}
  ]
});

const officInfoSchema = new mongoose.Schema({
  _id:mongoose.ObjectId,
  info: String
});


const vendorModel = mongoose.model('vendor', vendorSchema, 'vendor');
const recomModel = mongoose.model('recommendation',recommchema,'recommendation');
const officInfoModel= mongoose.model('officInfo',officInfoSchema,'officInfo');
const marketModel= mongoose.model('market',marketSchema,'market');
/*
// for vendor register page
let vendorRegister = new vendorModel({
  _id: new mongoose.Types.ObjectId(),
  pw: '123456',
  profile:{
    name: {
    first: 'John',
    last: 'Green'
  },
  access:{
         email: 'test@gmail.com'
       },
     },
     businessEntity:{
       entityName: 'Green Farm',
       location:{
         addr:{
           streetAddr: '410 small road',
           city: 'Syracuse',
           state: 'NY',
           zipCode: '13210'
         }
       }
     }
});

// insert all info of a vendor except the Top10Reviews
let vendorAll = new vendorModel({
  _id: new mongoose.Types.ObjectId(),
  pw: '123456',
  profile:{
    name: {
        first: 'Red',
        middle: 'D',
        last: 'Apple'
      },
    avatar:{
      _id: new mongoose.Types.ObjectId(),
      avatarName: 'Red avatar'
    },
    age: 25,
    gender: 0,
    selfIntro: 'farmer...',
    access:{
        phone: '3153955775',
        email: 'test1@gmail.com'
      },
    ratingScore: 0.0,
    adsImg:[{
        _id: new mongoose.Types.ObjectId(),
        img: 'img1',
        caption: 'the caption of img1',
        isHomePage: false
      }],
  },
  attTime:{
    Mon:{
      start: '2020-06-07',
      end: '2020-06-07'
    },
    Tues:{
      start: '2020-06-07',
      end: '2020-06-07'
    },
    Wed:{
      start: '2020-06-07',
      end: '2020-06-07'
    },
    Thurs:{
      start: '2020-06-07',
      end: '2020-06-07'
    },
    Fri:{
      start: '2020-06-07',
      end: '2020-06-07'
    },
    Sat:{
      start: '2020-06-07',
      end: '2020-06-07'
    },
    Sun:{
      start: '2020-06-07',
      end: '2020-06-07'
    }
  },
  location: {
      addr:{
        streetAddr: '410 small road',
        city: 'Syracuse',
        state: 'NY',
        zipCode: '13210'
      },
      longitude: -76.114941,
      latitude:  43.022235
  },
  products:[{
    _id: new mongoose.Types.ObjectId(),
    name: 'apple',
    img: 'img apple',
    description: 'a sweet apple...',
    price: {
      number: '1.2',
      unit: '/each'
    },
    resAmount: 50
  }],
  activities:[{
    _id: new mongoose.Types.ObjectId(),
    desciption: 'act 1',
    imgs:[{
      _id:new mongoose.Types.ObjectId(),
      imgName:'actImg1'
    }],
    video: {
      _id:new mongoose.Types.ObjectId(),
      videoName: 'actVideo1'
    },
    location: {
        addr:{
          streetAddr: '410 small road',
          city: 'Syracuse',
          state: 'NY',
          zipCode: '13210'
        },
        longitude: -76.114941,
        latitude:  43.022235
      },
    time:{
      startDate: '2020-06-07',
      endDate: '2020-06-07',
      startHour: 8,
      endHour: 14
    }
  }],
  businessEntity:{
    entityName: 'Apple park',
    location: {
        addr:{
          streetAddr: '410 small road',
          city: 'Syracuse',
          state: 'NY',
          zipCode: '13210'
        },
        longitude: -76.114941,
        latitude:  43.022235
    },
    time:{
        span:'every day',
        start: 8,
        end: 15,
    }
  }


});

vendorRegister.save(function(err,vendorRegister){
  if(err)return console.error(err);
  console.log('Insert the document successfully...')
  console.log(vendorRegister);
});

vendorAll.save(function(err,vendorAll){
  if(err)return console.error(err);
  console.log('Insert the document successfully...')
  console.log(vendorAll);
});

vendorModel.find(function (err, vendors){
  if(err) return console.error(err);
  console.log(vendors)
});
*/
module.exports = {
  initDB: initDB,
  vendors:vendorModel,
  marketModel:marketModel,
  officInfoModel: officInfoModel,
  recomModel:recomModel

}
