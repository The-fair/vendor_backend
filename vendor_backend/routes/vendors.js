var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Joi = require('@hapi/Joi');
var orm = require('../tools/orm')
//parse and validate the http request received here
//call the savevendor function provided by orm.js 


const addvendorSchema = Joi.object({
    name: Joi.string().min(3).required(),
    pw : Joi.string().min(8).required(),
    longtitue: Joi.number().min(-180).max(180).required(),
    latitude: Joi.number().min(0).max(90).required(),
    access: Joi.string(),
    email: Joi.string().email(),//validate(['email','phone'])  
    phone: Joi.string().min(10),
});//.with('name','pw','longtitue','latitude','access').xor('eamil','phone');

//nerver ever ever never never ever never ever ever trust the request send by client 
router.post('/newvendor',function(req, res){
    const result = Joi.validate(req.body, addvendorSchema);
    console.log(result);
    if(result.error){
        res.status(400).send(result.error).details[0].message;
        return;
    }
    const model = new orm.vendor({
        name: req.body.name,
        pw: req.body.pw,
        longtitue: req.body.longtitue,
        latitude: req.body.latitude,
        accsee: req.body.access,
        email: req.body.email,
        phone: req.body.phone
    });

    model.save()
    .exec()
    .then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.json({ message: err});
    });
});

module.exports = router;