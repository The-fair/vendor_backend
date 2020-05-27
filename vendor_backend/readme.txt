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

(most important part to be completed later with a example of backend api service)

......

--------------------learning recourse that you need to understand the project----------
sources 
Express 框架介绍 （node是runtime不是框架）
https://expressjs.com/en/4x/api.html
https://www.youtube.com/watch?v=G8uL0lFFoN0

关于nodejs module的关系
https://www.cnblogs.com/libin-1/p/7127481.html

https://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pattern.html

Node 1hour tutorial
https://www.youtube.com/watch?v=TlB_eWDSMt4&t=1173s

mongoose
https://mongoosejs.com/docs/models.html


-------------things to be done-------------------------------------

1. how do we save log? 
2. How do we monitor the statistics？ like amount of queries, amount of exceptions throws, how many time each process take... etc
3. How do we supervise the online service. ( for now i think of using third party demoad process supervisor )
