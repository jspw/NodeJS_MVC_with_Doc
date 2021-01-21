const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db

const mongoConnect = (callback) => {

  MongoClient.connect('mongodb+srv://test:test123@cluster0.xu3te.mongodb.net/testdb?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
      console.log("Mongodb Connected!");
      _db = client.db();
      callback();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database Found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;