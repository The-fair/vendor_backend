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




/*
the requrired fields of vendorSchema for signing up:
     'profile.access.email',
     'pw',
     'profile.name.first',
     'businessEntity.entityName',
     'businessEntity.location.addr'
all info in vendor collection
     */

/*locaiton point schema in geojson
  coordinates: [-72.4564, 41.124654]
  1st lontitude, 2nd latitiude
*/

const reviewAndShareSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  customerID: {
    type:mongoose.ObjectId,
    required:[true,'customerID is required!']
  },
  customerName: {
    type:String,
    required:[true,'customerName is required!']
  },
  //customerVendorShareMarket: 0: customer to vender, 1: customer to market, 2:share
  customerVendorShareMarket: {
    type: Number,
    required:[true,'The customerVendorShareMarket is required!'],
    validate:{
      validator:function(v){
        return Number.isInteger(v)&&(v==0||v==1||v==2);
      },
      message:'customerVendorShareMarket must be Int: 0: customer to vender, 1: customer to market, 2:share!'
    }
  },
  vendorID: mongoose.ObjectId,
  vendorName: String,
  marketID: mongoose.ObjectId,
  marketName: String,
  postTime: {
    type:Date,
    required:[true,'postTime is required!'],
    default: Date.now
  },
  ratingScore: {
    type:Number,
    required:[true,'The ratingScore is required!'],
    min:[0.0, 'Rating score must be [0.0, 5.0]'],
    max:[5.0, 'Rating score must be [0.0, 5.0]']
  },
  likeCount: {
    type:Number,
    validate:{
      validator:function(v){
        return Number.isInteger(v)&&(v>=0);
      },
      message:'likeCount must be Int and >=0!'
    }
  },
  img:[{
    _id:mongoose.ObjectId,
    imgName:String,
    caption:String
  }],
  txt: {
    type:String,
    required:[true,'txt is required!'],
    minlength:[4,'The txt must contain more than 4 charaters!']
  },
  video:{
    _id: mongoose.ObjectId,
    videoName: String
  },
  comments:[{
      isVendor:{
        /*false: customer, also not vendor
          true: Vendor
        */
        type:Boolean,
        default:false
      },
      reviewerID: mongoose.ObjectId,
      reviewerName:String,
      txt:String
  }]
});


const vendorSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  pw: {
    /*
    At least 8 characters,
    At lease a lowercase letter,
    At lease a capital letter,
    A character can be a number, a letter or a special sign
    */
    type: String,
    required: [true, 'Password is required!'],
    minlength: [8,'At least 8 characters']
  },
  profile:{
    name: {
        first: {
          type:String,
          required: [true, 'First name or nickname is required!'],
          minlength:[3,'At least 3 characters']
        },
        last: {
          type:String,
          minlength:[3,'At least 3 characters']
        }
      },
    avatar:{
      _id: mongoose.ObjectId,
      avatarName: String
    },
    age: {
      type: Number,
      min: [14,'No less than 14!'],
      max:[120,'No more than 120!'],
      validate : {
        validator : Number.isInteger,
        message   : 'Age is not an integer value!'
      }
    },
    gender: {
      // 0: male, 1: female, 2: others
      type: Number,
      validate : {
        validator : function(v) {
          return Number.isInteger&&(v==0||v==1||v==2);
        },
        message   : 'Gender must be  0: male, 1: female, 2: others!'
      }
    },
    selfIntro: String,
    access:{
        phone: {
          type:String,
          minlength:[10,'Phone must have 10 numbers!'],
          maxlength:[10,'Phone must have 10 numbers!'],
          match:[/\d+/,'Phone must have 10 numbers!']
        },
        email: {
          type:String,
          requrired:[true, 'Email is required!'],
          match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Email must be sth like 123@gmail.com']
        }
      },
    ratingScore: {
      type:Number,
      min:[0.0, 'Rating score must be [0.0, 5.0]'],
      max:[5.0, 'Rating score must be [0.0, 5.0]']
    },
    adsImg:[{
        _id: mongoose.ObjectId,
        img: String,
        caption: String,
        isHomePage: Boolean
      }],
  },
  attTime:{
    /*
    nodejs -> check whether is Mon or Tue
    new Date("<YYYY-mm-ddTHH:MM:ss>") specifies the datetime in the client’s local timezone and returns the ISODate with the specified datetime in UTC
    */
    Mon:{
      type:[Date],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          if(arr[1]-arr[0]<=0) return false;

        },
        message:'Mon[start,end]  The end date must be later than start date!'
      }
    },
    Tues:{
      type:[Date],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          if(arr[1]-arr[0]<=0) return false;

        },
        message:'Tues[start,end]  The end date must be later than start date!'
      }
    },
    Wed:{
      type:[Date],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          if(arr[1]-arr[0]<=0) return false;

        },
        message:'Wed[start,end]  The end date must be later than start date!'
      }
    },
    Thurs:{
      type:[Date],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          if(arr[1]-arr[0]<=0) return false;

        },
        message:'Thurs[start,end]  The end date must be later than start date!'
      }
    },
    Fri:{
      type:[Date],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          if(arr[1]-arr[0]<=0) return false;

        },
        message:'Fri[start,end]  The end date must be later than start date!'
      }
    },
    Sat:{
      type:[Date],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          if(arr[1]-arr[0]<=0) return false;

        },
        message:'Sat[start,end]  The end date must be later than start date!'
      }
    },
    Sun:{
      type:[Date],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          if(arr[1]-arr[0]<=0) return false;
        },
        message:'Sun[start,end]  The end date must be later than start date!'
      }
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
      corLocation: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
          validate : {
            validator : function(arr) {
              if(arr.length != 2)return false;
              if(-180>arr[0] || arr[0]>180) return false;
              if(-90>arr[1] || arr[1]>90) return false;
            },
            message   : 'coordinates:[longitude,latitude], longitude must be [-180 (West) and 180 (East)], and latitude must be [(South)-90, 90(North)]'
          }
        }
      }
    },
  products:[{
    _id: mongoose.ObjectId,
    name: String,
    img: {
      _id:mongoose.ObjectId,
      imgName:String
    },
    description: String,
    price: {
      number: {
        type:Number,
        validate : {
          validator : function(v){
            return v>0;
          },
          message   : 'Price must be larger than 0!'
        }
      },
      unit: {
        type: String,
        validate:{
          validator:function(v){
            return v!='';
          },
          message:'THe unit of price can not be empty!'
        }
      }
    }
    //resAmount: Double
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
      corLocation: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
          validate : {
            validator : function(arr) {
              if(arr.length != 2)return false;
              if(-180>arr[0] || arr[0]>180) return false;
              if(-90>arr[1] || arr[1]>90) return false;
            },
            message   : 'coordinates:[longitude,latitude], longitude must be [-180 (West) and 180 (East)], and latitude must be [(South)-90, 90(North)]'
          }
        }
      }
    },
    time:{
      dateSpan:{
        type:[Date],
        validate:{
          validator:function(arr){
            if(arr.length!=2)return false;
            if(arr[1]-arr[0]<=0) return false;
          },
          message:'dateSpan[start,end] The end date must be later than start date!'
        }
      },
      hourSpan:{
        type:[Number],
        validate:{
          validator:function(arr){
            if(arr.length!=2)return false;
            //0-24
            if(0>arr[0]||arr[0]>23||
              0>arr[1]||arr[1]>23)return false;
            if(arr[1]-arr[0]<=0) return false;

          },
          message:'hourSpan[start,end], every element of hourSpan is between 0 to 23, end hour > start hour!'
        }
      }

    }
  }],
  businessEntity:{
    entityName: {
      type:String,
      required: [true, 'Your entityName is required!']
    },
    location:{
      addr:{
        streetAddr: {
          type: String,
          required: [true, 'Street address is required!']
        },
        city: {
          type: String,
          required: [true, 'City is required!']
        },
        state: {
          type: String,
          required: [true, 'State is required!']
        },
        zipCode: {
          type: String,
          required: [true, 'Zip code is required!']
        }
      },
      corLocation: {
        type: {
          type: String,
          enum: ['Point'],
          required: [true, 'corLocation Type must be String']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
          validate : {
            validator : function(arr) {
              if(arr.length != 2)return false;
              if(-180>arr[0] || arr[0]>180) return false;
              if(-90>arr[1] || arr[1]>90) return false;
            },
            message   : 'coordinates:[longitude,latitude], longitude must be [-180 (West) and 180 (East)], and latitude must be [(South)-90, 90(North)]'
          }
        }
      }
    },
    time:{
        span:String,
        start: Int32,
        end: Int32,
      }
  },
  Top10Reviews:[
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema}
  ]
});

//todo: required
const marketSchema= new mongoose.Schema({
  _id: mongoose.ObjectId,
  name:{
    type:String,
  },
  location:{
    addr:{
      streetAddr: {
        type: String,
        required: [true, 'Street address is required!']
      },
      city: {
        type: String,
        required: [true, 'City is required!']
      },
      state: {
        type: String,
        required: [true, 'State is required!']
      },
      zipCode: {
        type: String,
        required: [true, 'Zip code is required!']
      }
    },
    corLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: [true, 'corLocation Type must be String']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
        validate : {
          validator : function(arr) {
            if(arr.length != 2)return false;
            if(-180>arr[0] || arr[0]>180) return false;
            if(-90>arr[1] || arr[1]>90) return false;
          },
          message   : 'coordinates:[longitude,latitude], longitude must be [-180 (West) and 180 (East)], and latitude must be [(South)-90, 90(North)]'
        }
      }
    }
  },
  time:{
    openDay:String,
    hourSpan:{
      type:[Number],
      validate:{
        validator:function(arr){
          if(arr.length!=2)return false;
          //0-24
          if(0>arr[0]||arr[0]>23||
            0>arr[1]||arr[1]>23)return false;
          if(arr[1]-arr[0]<=0) return false;

        },
        message:'hourSpan[start,end], every element of hourSpan is between 0 to 23, end hour > start hour!'
      }
    }
  },
  phone: {
    type:String,
    minlength:[10,'Phone must have 10 numbers!'],
    maxlength:[10,'Phone must have 10 numbers!'],
    match:[/\d+/,'Phone must have 10 numbers!']
  },
  link:{
    type:String,
    match:[/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,'The link is not legal!']
  },
  vendors:[
    {_id:mongoose.ObjectId}
  ],
  ratingScore:{
    type:Number,
    min:[0.0, 'Rating score must be [0.0, 5.0]'],
    max:[5.0, 'Rating score must be [0.0, 5.0]']
  },
  imgs:[{
    _id:mongoose.ObjectId,
    imgName: String,
    caption: String
  }],
  Top10Reviews:[
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema},
    {type:reviewAndShareSchema}
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
const reviewAndShareModel= mongoose.model('reviewAndShare',reviewAndShareSchema,'reviewAndShare');
// for vendor register page
let vendorRegister = new vendorModel({
  _id: new mongoose.Types.ObjectId(),
  pw: '12345678',
  profile:{
    name: {
      first: 'John',
    },
    access:{
      email: 'test@gmail.com',
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
      },
      corLocation:{
        type:'Point',
        coordinates:[-76.109682,43.021445]
      }
    }
  }
});

// insert all info of a vendor except the Top10Reviews

let vendorAll = new vendorModel({
  _id: new mongoose.Types.ObjectId(),
  pw: '12345678',
  profile:{
    name: {
        first: 'Red',
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
    ratingScore: 4.5,
    adsImg:[{
        _id: new mongoose.Types.ObjectId(),
        img: 'img1',
        caption: 'the caption of img1',
        isHomePage: false
      }],
  },
  attTime:{
    //("<YYYY-mm-ddTHH:MM:ss>") specifies the datetime in the client’s local timezone and returns the ISODate with the specified datetime in UTC
    Mon:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000'],
    Tues:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000'],
    Wed:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000'],
    Thurs:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000'],
    Fri:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000'],
    Sat:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000'],
    Sun:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000']
  },
  attMarket:[{
    _id: mongoose.Types.ObjectId('5e7d1e05048e729a78ddc6a4'),
    marketName: 'M1'
  }],
  location: {
      addr:{
        streetAddr: '410 small road',
        city: 'Syracuse',
        state: 'NY',
        zipCode: '13210'
      },
      corLocation:{
        type:'Point',
        coordinates:[-76.109682,43.021445]
      }
  },
  products:[{
    _id: new mongoose.Types.ObjectId(),
    name: 'apple',
    img: {
      _id: new mongoose.Types.ObjectId(),
      imgName:'img apple'
    },
    description: 'a sweet apple...',
    price: {
      number: '1.2',
      unit: '/each'
    }
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
        corLocation:{
          type:'Point',
          coordinates:[-76.109682,43.021445]
        }
    },
    time:{
      dateSpan:['2020-06-22T08:30:00.000','2020-06-22T18:30:00.000'],
      hourSpan:[8,14]
    }
  }],
  businessEntity:{
    entityName: 'Green Farm',
    location:{
      addr:{
        streetAddr: '410 small road',
        city: 'Syracuse',
        state: 'NY',
        zipCode: '13210'
      },
      corLocation:{
        type:'Point',
        coordinates:[-76.109682,43.021445]
      }
    }
  }
});
let marketTest= new marketModel({
  _id: new mongoose.Types.ObjectId(),
  name:'testMarket1',
  location: {
      addr:{
        streetAddr: '410 small road',
        city: 'Syracuse',
        state: 'NY',
        zipCode: '13210'
      },
      corLocation:{
        type:'Point',
        coordinates:[-76.109682,43.021445]
      }
  },
  time:{
    openDay:'Sat.',
    hourSpan:[8,20]
  },
  phone: '3153955776',
  link:'https://12.34.566.78?test.html',
  vendors:[
    {_id:mongoose.Types.ObjectId('5e7d1e05048e729a78ddc6a4')}
  ],
  ratingScore:0.4,
  imgs:[{
    _id:new mongoose.Types.ObjectId(),
    imgName:'reviewImg...',
    caption:'a caption for Img...'
  }],
  /*
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
  */
});

// customer to vendor
let reviewAndShareTest = new reviewAndShareModel({
  _id:  new mongoose.Types.ObjectId(),
  customerID: mongoose.Types.ObjectId('5e6d2cf2019a4f0094b6d74f'),
  customerName: 'Chen Luo',
  customerVendorShareMarket: 0,
  vendorID: mongoose.Types.ObjectId('5e6eef7d3d0c888538f0f4af'),
  vendorName: 'Jogn Happy',
  //marketID: mongoose.ObjectId,
  //marketName: String,
  //postTime: Date.now(),
  ratingScore: 0.3,
  likeCount: 2,
  img:[{
    _id:new mongoose.Types.ObjectId(),
    imgName:'url img',
    caption:'a charming img...'
  }],
  txt: 'a fresh apple...',
  video:{
    _id: new mongoose.Types.ObjectId(),
    videoName: 'url video'
  },
  comments:[{
      isVendor:false,
      reviewerID: mongoose.Types.ObjectId('5e6d2cf2019a4f0094b6d74f'),
      reviewerName: 'Chen Luo',
      txt:'a piece of comment...'
  }]
});

// update vendor document with his Top10reviews
/*
vendorRegister.save(function(err,vendorRegister){
  if(err)return console.error(err);
  console.log('Insert the document successfully...')
  console.log(vendorRegister);
});



vendorAll.save(function(err,vendorAll){
  if(err)return console.error(err);
  console.log('Insert the vendor document successfully...')
  console.log(vendorAll);
});
*/
/*
reviewAndShareTest.save(function(err,reviewAndShareTest){
  if(err)return console.error(err);
  console.log('Insert the reviewAndShare document successfully...')
  console.log(reviewAndShareTest);
});

vendorModel.findOne({'profile.access.email' : 'abd@gmail.com'},function (err, vendor){
  if(err) return console.error(err);
  console.log(vendor.profile.avatar.avatarName);
});

/*
marketTest.save(function(err,marketTest){
  if(err)return console.error(err);
  console.log('Insert the market document successfully...')
  console.log(marketTest);
});
*/
module.exports = {
  initDB: initDB,
  vendors:vendorModel,
  marketModel:marketModel,
  officInfoModel: officInfoModel,
  recomModel:recomModel,
  reviewAndShareModel: reviewAndShareModel
}
