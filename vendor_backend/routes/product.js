var router = express.Router();
var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const odm = require('../tools/odm');

var ObjectId=require('mongodb').ObjectId;
// "/deleteProduct": according to email and product object ID delete product 
router.delete('/deleteProduct/:id',function(req,res){
    var email = req.query.email;
    console.log(email);
    var id=req.params.id;
    var o_id=new ObjectId(id);
    console.log(o_id);
    odm.vendors.findOneAndUpdate({'products._id': o_id, 'profile.access.email' : email}, {$unset: {products:[]}}, {upsert:false,multi:true}, function(err, data){
        if (err){
            res.status(500).send({
                message: "Could not delete product with productid=" + id
            });
        }
        else{
            if (!data) {
                res.status(404).send({
                message: `Cannot delete product with ID=${id}. Maybe productID/E-mail was not found!`
                });
            } 
            else {
                console.log(data.products);
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        }
        
    })
});

//according to email to return an product list
router.get('/GetProductList',function(req,res){
    var email = req.query.email;
    console.log(email);
    // var vendorid=req.params.vendorid;
    // var v_id=new ObjectId(vendorid);
    // console.log(v_id);
    odm.vendors.findOne({'profile.access.email' : email}, function(err,data){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(data.products);
            res.status(200).send(data.products);
            // res.status(200).json({
            //     answer: data.products, 
            //     name: data.products.name

            // });
        }
     })
});

module.exports = router;
