/**
 * mongodb.操作
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/runoob';
var address="runoob";
var assert = require('assert');

//add一条数据
var add = function(client,collections,selector,fn){
    console.log("mongodb","collections"+collections+",selector"+selector);
    var db = client.db(address);
    var collection = db.collection(collections);
    collection.insertMany([selector],function(err,result){
        assert.equal(err,null);
        fn(result);
    });
}
//delete
var deletes = function(client,collections,selector,fn){
    console.log("mongodb","collections"+collections+",selector"+selector);
    var db = client.db(address);
    var collection = db.collection(collections);
    collection.deleteOne(selector,function(err,result){
        try{assert.equal(err,null)}catch(e){
            console.log(e);
        }
        fn(result);
    });

};
//find
var find = function(client,collections,selector,fn){
    console.log("mongodb","collections"+collections+",selector"+selector);
    var db = client.db(address);
    var collection = db.collection(collections);
    collection.find(selector).toArray(function(err,docs){
        if (err){
            console.log(err);
            return;
        }
        fn(docs);
    });

}

//update
var updates = function(client,collections,req,inquiry,fn){
    console.log("mongodb","collections"+collections+",selector"+req);
    var db = client.db(address);
    var collection = db.collection(collections);
    console.log(req);
    collection.updateOne(inquiry,{$set:req},function(err,result){
        if (err){
            console.log(err);
            return;
        }
        fn(result);
    });

}

//方法都赋值到操作对象上，便于调用
var methodType = {
    login:find,
    show:find,
    add:add,
    getpower:find,
    update:updates,
    delete:deletes,
    updatepass:updates,
    adduser:add,
    usershow:find,
    getcategory:find,
    getcourse:find,
    find:find,
    state:find,
    top:find,
    AddDirectory:find,
    updateDirectory:updates,
    deleteDirectory:deletes,
    showlist:find,
    showdir:find
};
//主逻辑
exports.normalMongodb = function(req,collections,selector,fn){
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, client) {
        // assert.equal(null, err);
        if (err){
            console.log(err);
            return;
        }
        console.log("action req====="+req);
        methodType[req](client,collections,selector,fn);
    });
};
exports.updateMongodb= function(collections,req,inquiry,fn){
    console.log("updateMongodb");
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, client) {
        // assert.equal(null, err);
        if (err){
            console.log(err);
            return;
        }
        console.log("Connected correctly to server");
        updates(client,collections,req,inquiry,fn);
    });
};
