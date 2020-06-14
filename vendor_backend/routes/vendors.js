var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const odm = require('../tools/odm');
//parse and validate the http request received here
//call the savevendor function provided by odm.js 


const addvendorSchema = Joi.object({
    firstname : Joi.string().required(),
    lastname: Joi.string().required(),
    pw : Joi.string().min(8).required(),
    entityName :Joi.string().min(3).required(),
    email: Joi.string().email(),
    streetAddr : Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().min(4).required(),
    city: Joi.string().required()
});//.with('name','pw','longtitue','latitude','access').xor('eamil','phone');

//nerver ever ever never never ever never ever ever trust the request send by client 
router.post('/newvendor',function(req, res){
    //console.log(req);
    const result = addvendorSchema.validate(req.body);
    console.log(result);
    if(result.error){
        res.status(400).send({problem:"request format problem"});
        return;
    }

    console.log("pass joi validate");
    const doc = new odm.vendors({
        _id: new mongoose.Types.ObjectId(),
        pw: req.body.pw,
        profile:{
          name: {
          first: req.body.firstname,
          last:  req.body.lastname
        },
        access:{
               email: req.body.email
             },
           },
           businessEntity:{
             entityName: req.body.entityName,
             location:{
               addr:{
                 streetAddr: req.body.streetAddr,
                 city: req.body.city,
                 state: req.body.state,
                 zipCode: req.body.zipCode,
               }
             }
           }
    });
    //console.log(record);
    var checkavailable=odm.vendors.count({'profile.access.email':req.body.email},function(err,count){
        if(err){
            console.log("meet error when check email availablity ");
            return;
        }
        if(count>0){
            res.status(200).json( {problem:"email already registed"});

        }
        else{
            doc.save()
            .then(data => {
                res.send("save successfully");
            })
            .catch(err =>{
                console.log(err);
                res.status(400).json({ problem: "mongoose save error" ,message: err});
            });
        }
    });
  
});

router.get('/getVendorList',function(req,res){
  odm.vendors.find({},function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(result);
        }
  });
});

router.get('/getVendorByEmail',function(req,res){
     var email = req.query.email;
     console.log(email);
     odm.vendors.findOne({'profile.access.email' : email}, function(err,doc){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(doc);
            res.status(200).json({
                firstname : doc.profile.firstname,
                midname : doc.profile.midname,
                lastname : doc.profile.lastname, 
                age : doc.profile.age, 
                password : doc.pw, 
                entity_name : doc.businessEntity.entityName, 
                address : doc.businessEntity.addr, 
                email : doc.profile.access.email
            });
        }
     })
});

module.exports = router;