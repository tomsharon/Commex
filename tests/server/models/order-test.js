var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Item = mongoose.model('Item');

describe('Order model', function() {
  var testUser;
  User.create({
    email: 'test@gmail.com',
    password: 'testpass',
    salt: 'test',
    isAdmin: false,
    name: 'Test User',
    streetName: '123 Fake Street',
    city: 'Fake City',
    zipCode: 10069,
    state: 'Fake State'
  })
    .then(function(user){
      testUser = user;
    }, function(err){
      console.error(err);
    })

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


  beforeEach('Establish DB connection', function(done){
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done)
  });

  afterEach('Clear test database', function(done){
    clearDB(done);
  })

  // Item is a constructor function
  it('should exist', function(){
    expect(Order).to.be.a('function');
  })

  describe('create a new order', function(){

    beforeEach('Creates an order', function(){
      var testOrder;
      //
      // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
      // orderNumber: { type: Number, required: true },
      // dateOrdered: { type: Date, default: Date.now, required: true },
      // itemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
      // totalSpent: { type: Number, required: true }

      Order.create({
        userId: testUser._id,
        orderNumber: 1234,
        itemIds: [testItem._id],
        totalSpent: 1234
      })
        .then(function(createdOrder) {
          testOrder = createdOrder;
        }, function(err){
          console.error(err);
        })
      })


      it('should successfully create an order', function(){
        Order.find()
          .then(function(arrOfOrders){
            expect(arrOfOrders).to.have.length(1);
          }, function(err){
            console.error(err)
          })
      })

      //test hooks when written

    })
  })
