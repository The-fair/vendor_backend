// this module is to init the entire service, called by app.js when start the service

function init(){
    // only 1 init process for now 
    const orm = require('./orm')
    orm.init();

}

moduel.exports.init = init
