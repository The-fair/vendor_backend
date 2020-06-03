var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Joi = require('@hapi/Joi');
var orm = require('../tools/orm')
//parse and validate the http request received here
//call the savevendor function provided by orm.js 


const addvendorSchema = Joi.object({
    'name' : Joi.string().required(),
    pw : Joi.string().min(8).required(),
    longtitude: Joi.number().min(-180).max(180).required(),
    latitude: Joi.number().min(0).max(90).required(),
    access: Joi.string(),
    email: Joi.string().email(),//validate(['email','phone'])  
    phone: Joi.string().min(10),
});//.with('name','pw','longtitue','latitude','access').xor('eamil','phone');

//nerver ever ever never never ever never ever ever trust the request send by client 
router.post('/newvendor',function(req, res){
    //console.log(req);
    const result = addvendorSchema.validate(req.body);
    console.log(result);
    if(result.error){
        res.status(400).send(req.body);
        return;
    }

    console.log("pass joi validate");
    const model = new orm.vendor({
        pw: req.body.pw,
        profile :{
            name: {firstname: req.body.name, lastname: "some default strange name"},
            access:{
                email: req.body.email,
                phone: req.body.phone      
            }
        },
        location:{
            longtitue: req.body.longtitue,
            latitude: req.body.latitude,
        },
        product:[],
    });

    model.save()
    .then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.json({ problem: "mongoose save error" ,message: err});
    });
});

module.exports = router;