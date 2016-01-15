// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');

var Item = mongoose.model('Item');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

//supertest makes HTTP requests
var supertest = require('supertest');
var app = require('../../../server/app');

describe("Category Routes", function() {
	var testAgent = supertest.agent(app);
  var testItem;

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe("all item routes", function() {
		var itemToCreate = {
			itemName: "Created Item",
			category: "Energy",
			price: 100,
			unit: "Test",
			inventory: 50,
			shortDescription: "Test Created Item"
		}
		beforeEach('Create Item', function(done){
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
					done()
				})

		})

    //gets all items
		it('GETS all from /api/items/', function (done) {
			testAgent.get("/api/items")
				.expect(200)
				.end(function(err, res){
					expect(res.body).to.have.length(1);
					done();
				})
		});

    it('POSTS - /api/items/', function (done) {
      testAgent.post("/api/items")
        .send(itemToCreate)
        .expect(201)
        .end(function(err, res){
					expect(res.body.itemName).to.be.equal(itemToCreate.itemName)
					done();
				});
    });

		it("GETS a single item - /api/items/:itemId", function(done) {
			testAgent.get("/api/items/" + testItem._id)
				.expect(200)
				.end(done)
		})

    it("PUTS an update - /api/items/:itemId", function(done){
			testItem.itemName = 'Updated Item'
      testAgent.put("/api/items/" + testItem._id)
        .send(testItem)
        .expect(200)
				.end(done);
    })

		it("DELETES an item - /api/items/:itemId", function(done) {
			testAgent.delete("/api/items/" + testItem._id)
				.expect(200)
				.end(done)
		})
	})
})
