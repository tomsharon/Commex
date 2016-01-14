var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Item = mongoose.model('Item');

describe('Item model', function() {
  beforeEach('Establish DB connection', function(done){
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done)
  });

  afterEach('Clear test database', function(done){
    clearDB(done);
  })

  // Item is a constructor function
  it('should exist', function(){
    expect(Item).to.be.a('function');
  })

  describe('create an item', function(){

    beforeEach('Creates a new item', function(){
      var testItem;

      Item.create({
        itemName: "DummyItem",
        category: "Energy",
        price: 10,
        unit: "kw",
        inventory: 100,
        shortDescription: "That good good"
        })
        .then(function(createdItem) {
          testItem = createdItem;
        }, function(err){
          console.error(err);
        })
      })


      it('should successfully create an item', function(){
        Item.find()
          .then(function(arrOfItems){
            expect(arrOfItems).to.have.length(1);
          }, function(err){
            console.error(err)
          })
      })

      //test hooks when written

  })
})
