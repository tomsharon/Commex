var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');
var User = mongoose.model('User');
var Review = mongoose.model('Review')

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
    beforeEach('Creates an review', function(){
      var testReview;
      Review.create({
        reviewRating: 3,
        reviewDescription: 'Awesome stuff',
        reviewAuthor: 1234
        })
        .then(function(createdItem) {
          testReview = createdReview;
        }, function(err){
          console.error(err);
        })
      })

      it('should successfully create a review', function(){
        Review.find()
          .then(function(arrOfReviews){
            expect(arrOfReviews).to.have.length(1);
          }, function(err){
            console.error(err)
          })
      })

      //test hooks when written

    })
})
