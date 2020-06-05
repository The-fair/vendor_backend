// project generate process "don't run it again, just pull it from github"
// just give you guys a sense of what we are using and doing



npm install express-generator -g

express vendor_backend —view=pug 

cd vendor_backend

#安装依赖
npm install 

#Run on windows
SET DEBUG= vendor_backend:* & npm start

#Run on linux/Mac 
DEBUG=vendor_backend:* npm start


------------config.json---------------------------------
all the config detail will be written in the json file (only db config for now, but will be many else in the future)

the code will parse the config json and init the service with it



-------------------package structure-----------------------=

node_modules  : denpendency installed by npm 
public and view : baiscally just ignore them, they are just for web application. We are now just http api.

app.js : service entrance, init the service register the routers to express framework, error handling, etc 

routers: each api service function are defined here and register to router

tools: get called by api service function. Many implemented detail should be in here. (like orm.js standlize the interaction
with mongodb and logger.js will be our logger etc)




......

--------------------learning recourse that you need to understand the project----------
sources 
Express 框架介绍 （node是runtime不是框架）
https://expressjs.com/en/4x/api.html
https://www.youtube.com/watch?v=G8uL0lFFoN0
https://www.jianshu.com/p/c5baef64563a

build restful api with nodejs express and mongodb
https://www.youtube.com/watch?v=vjf774RKrLc

关于nodejs module的关系
https://www.cnblogs.com/libin-1/p/7127481.html

https://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pattern.html
(strongly suggest to read this at least！！！)

Node 1hour tutorial
https://www.youtube.com/watch?v=TlB_eWDSMt4&t=1173s

mongoose
https://mongoosejs.com/docs/models.html

backend request validation module-------joi
https://github.com/hapijs/joi




-------------things to be done-------------------------------------

1. how do we save log? 
2. How do we monitor the statistics？ like amount of queries, amount of exceptions throws, how many time each process take... etc
3. How do we supervise the online service. ( for now i think of using third party demoad process supervisor )
4. mongodb transaction and roll back???
5. async db query
6. mongodb replica 
