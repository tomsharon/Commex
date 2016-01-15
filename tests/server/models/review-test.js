var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');
var User = mongoose.model('User');
var Review = mongoose.model('Review');
var Item = mongoose.model('Item');

describe('Review model', function() {

  beforeEach('Establish DB connection', function(done){
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done)
  });

  afterEach('Clear test database', function(done){
    clearDB(done);
  })

  // Item is a constructor function
  it('should exist', function(){
    expect(Review).to.be.a('function');
  })

  describe('create a new review', function(){
    beforeEach('Creates an review', function(done){

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

      var testReview;
      Review.create({
        reviewRating: 3,
        reviewDescription: 'Awesome stuff',
        reviewAuthor: testUser._id,
        reviewProduct: testItem._id
        })
        .then(function(createdItem) {
          testReview = createdReview;
          done()
        }, function(err){
          console.error(err);
        })
      })
      //test hooks when written
    })
    it('should successfully create a review', function(){
      Review.find()
        .then(function(arrOfReviews){
          expect(arrOfReviews).to.have.length(1);
        }, function(err){
          console.error(err)
        })
    })
})
