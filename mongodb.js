// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId

const {MongoClient, ObjectId} = require('mongodb');
// const id = new ObjectId()
//  console.log(id)
// console.log(id.getTimestamp())
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("unable to connect to database");
    }
    const db = client.db(databaseName);
//Create
    //  db.collection("users").insertOne(
    //   {
    //     _id:id,
    //     name: "Vikram",
    //     age: "23",
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert user");
    //     }
    //     console.log(result);
    //   }
    // );
    // db.collection('users').insertMany([
    //     {
    //         name:'neha',
    //         age:22
    //     },
    //     {
    //         name:'rahul',
    //         age:24
    //     }
    // ],(error, result)=>{
    //     if(error){
    //         return console.log(error)
    //     }

    //     console.log(result.insertedIds)
    // })
//Read 
// db.collection('users').findOne({ _id:new ObjectId("60fe7f68f7484a6053c36bfb") },(error, user)=>{
//   if(error){
//     return console.log('unable to fetch')
//   }
//   console.log(user)
// })
//Update
// db.collection('users').updateOne({_id: new ObjectId('60fe7f68f7484a6053c36bfb')},{
//   $set:{
//     name:'Aman Kale'
//   }
// }).then((result)=>{
//   console.log(result)
// }).catch((error)=>{
// console.log(error)
// })
// db.collection('users').updateMany({},{
//   $set:{
//    age:23 
//   }
// }).then((result)=>{
// console.log(result)
// }).catch((error)=>{
// console.log(error)
// })
// db.collection('users').deleteMany({
//   age:23
// }).then((result)=>{
//   console.log(result)
// }).catch((error)=>{
// console.log(error)
// })

// db.collection('users').deleteOne({
//   _id:ObjectId("60fe7f68f7484a6053c36bfb")
// }).then((result)=>{
//   console.log(result)
// }).catch((error)=>{
//   console.log(error)
// })
  });
